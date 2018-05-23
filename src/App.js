import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.crestUrl} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
        {props.name}
        </div>
        <div>{props.shortName}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return (
  	<div>
			{props.cards.map(card => <Card key={card.shortName} {...card} />)}
  	</div>
  )
}

class Form extends React.Component {
	state = {teamNo: ''}
	handleSubmit = (event) => {
 		event.preventDefault();
    axios.defaults.headers.common['X-Auth-Token'] = 'ca28d53231cb4d4d84e63426333a7978';
    axios.get(`https://api.football-data.org/v1/teams/${this.state.teamNo}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({teamNo: ''});
      });
 	};
 	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input type="text"
        value={this.state.teamNo}
        onChange={(event) => this.setState({teamNo: event.target.value})}
        placeholder="Team Number" required />
        <button type="submit">Add team</button>
      </form>
    );
  }
}

class App extends React.Component {
	state = {
    teams : []
  };
  
  addNewTeam = (teamInfo) => {
  	this.setState(prevState => ({
    	teams: prevState.teams.concat(teamInfo)
    }));
  };
  
	render() {
  	return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Working with Data</h1>
      </header>
      <div>
        <Form onSubmit={this.addNewTeam}/>
        <CardList cards={this.state.teams} />
      </div>
    </div>
    );
  }
}

export default App;
