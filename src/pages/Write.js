import React, { Component } from 'react';
import { Link } from "react-router-dom";
import app from '../lunch.js';

import './Write.scss';

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            menu: "",
            restaurant: "",
            location: "",
            etc : "",
        }
    }


    handleChange(e) {
        const state = {};
        state[e.target.id] = e.target.value ;
        this.setState(state);
    }
        

    save(){
        app.state.data.push(Object.assign({}, this.state, {seq: app.state.data.length}));

        /**
         * 18/10/17
         * 아래 문장은 나중에 mobX 에서 reaction 으로 빠져야
         *  */ 
        //app.view.List && app.view.List.setState({data : app.state.data});

        this.props.history.push("/list");
    }


    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="menu">메뉴</label>
                    <input type="text" className="form-control" id="menu" placeholder="메뉴" value={this.state.menu} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="restaurant">식당이름</label>
                    <input type="text" className="form-control" id="restaurant" placeholder="식당이름" value={this.state.restaurant} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">위치</label>
                    <input type="text" className="form-control" id="location" placeholder="위치" value={this.state.location} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="etc">비고</label>
                    <input type="text" className="form-control" id="etc" placeholder="비고" value={this.state.etc} onChange={this.handleChange}/>
                </div>
                <Link to="/list"><button type="button" className="btn btn-success">목록</button></Link>
                <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>저장</button>
            </div>
        );
    }
}

