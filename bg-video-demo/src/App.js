import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import video from './bg-video.mp4';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="video_container">
          <video className="video" src={video} autoPlay loop/>
        </div>
      </div>
    );
  }
}

export default App;
