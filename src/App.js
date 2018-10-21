import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import List from "./pages/List";
import Write from "./pages/Write";
import app from './com/app.js';
import "./App.scss"


class App extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {

        const renderWrite = ({history, match}) => {
            return <Write history={history} match={match} selected={app.state.data.find(r => r.seq === app.state.view.selected)}/> ;
        }
          
        const renderList = ({history, match}) => {
            return <List history={history} match={match} /> ;
        }
          
        return (
            <div className="container-fluid app">
                <div className="container-fluid header">
                    <h4>오늘 점심 뭐 먹을까</h4>
                </div>
                <div className="container-fluid body">
                    <Switch>{/*Switch는 매칭되는 첫번재꺼만 보여주고 아래꺼는 버림*/}
                        <Route path="/list" render={renderList} />
                        <Route path="/write" render={renderWrite} />          
                        <Route path="/" render={renderList} />
                    </Switch>            
                </div>
            </div>
        );
    }
}

export default App;
