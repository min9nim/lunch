import React, { Component } from 'react';
import { Link } from "react-router-dom";
import app from '../lunch.js';

import './Write.scss';

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.props.selected || {
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
        if(this.props.selected){
            let asis = app.state.data.find(r => r.seq === this.props.selected.seq);
            Object.assign(asis, this.state);
        }else{
            app.state.data.push(Object.assign({}, this.state, {seq: app.state.data.length}));
        }
        this.props.history.push("/list");
    }

    remove(){
        if(window.confirm("삭제합니다")){
            let idx = app.state.data.indexOf(this.props.selected);
            app.state.data.splice(idx, 1);
            this.props.history.push("/list");    
        }
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

                {
                    this.props.selected
                    ?
                    <React.Fragment>
                        <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>수정</button>
                        <button type="button" className="btn btn-success" onClick={this.remove.bind(this)}>삭제</button>
                    </React.Fragment>
                    :
                    <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>저장</button>
                }
                
            </div>
        );
    }
}

