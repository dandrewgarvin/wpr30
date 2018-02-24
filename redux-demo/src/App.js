import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from 'react-redux'
import {testFunc} from './ducks/Reducer'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.selected ? <h1>{this.props.test}</h1> : <h1>{this.props.test2}</h1>}
        <button onClick={_=>this.props.testFunc({test: 'code ninja', test2: 'wtf'})}>update value</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

const updateActions = {
  testFunc
}

export default connect(mapStateToProps, updateActions)(App);
