import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {

	componentDidMount(){
		axios.get('/test').then(_=>{
			console.log('got response!')
		})
	}

	render(){
		return (
			<div className='App'>
				<h1>Hello World!</h1>
			</div>
		)
	}
}