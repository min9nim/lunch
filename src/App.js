import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import List from "./pages/List";
import Write from "./pages/Write";
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
                <Switch>{/*Switch는 매칭되는 첫번재꺼만 보여주고 아래꺼는 버림*/}
                    <Route path="/list" component={List} />
                    <Route path="/write" component={Write} />          
                    <Route path="/" component={List} />
                </Switch>            
            </div>
        </div>
    );
  }
}

export default App;
