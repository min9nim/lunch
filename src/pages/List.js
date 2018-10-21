import React, { Component } from 'react';
//import ListTable from "./component/ListTable";
import ListDiv from "./component/ListDiv";
import app from '../com/app.js';
import './List.scss';


function setTimeoutP(timeout){
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class List extends Component {
    constructor(props){
        console.log("List 생성자 호출");
        super(props);

        app.view.List = this;
        app.state.view.selected = undefined;
    }

    async edit(e){
        //debugger;
        app.state.view.selected = e.target.parentNode.getAttribute("seq");
        if(app.state.view.selected === null){
            return;
        }
        e.target.parentNode.style.backgroundColor = "#eaeaea";
        await setTimeoutP(100);    // 1초 대기
        this.props.history.push("/write");
    }
    
    render() {
        console.log("length : " + app.state.data.length);
        return (
            <ListDiv list={app.state.data} edit={this.edit.bind(this)}/>
        );
    }
}

export default List;
