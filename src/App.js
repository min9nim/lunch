import React, { Component } from 'react';
import List from "./List";
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container">
            <div className="container">
                <h4>오늘 점심 뭐 먹을까</h4>
            </div>
            <div className="container">
                <List/>
            </div>
        </div>

    );
  }
}

export default App;
