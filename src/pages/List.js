import React, { Component } from 'react';
import ListTable from "./component/ListTable";
import ListDiv from "./component/ListDiv";
import './List.scss';

import app from '../lunch.js';


class List extends Component {
    constructor(props){
        console.log("List 생성자 호출");
        super(props);

        this.state = {
            data : app.state.data,
        }
        app.view.List = this;
        app.state.view.selected = undefined;
    }


    edit(e){
        //debugger;
        app.state.view.selected = e.target.parentNode.getAttribute("seq");
        this.props.history.push("/write");  
    }


    render() {
        console.log("length : " + app.state.data.length);
        return (
            <ListDiv list={this.state.data} edit={this.edit.bind(this)}/>
        );
    }
}

export default List;
