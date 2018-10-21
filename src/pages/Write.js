import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import app from '../com/app.js';

import './Write.scss';

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.props.selected || {
            menu: "",
            restaurant: "",
            location: "",
            lastVisited: moment().format("YYYYMMDD"),
            etc : "",
        }

    }


    handleChange(e) {
        const state = {};
        state[e.target.id] = e.target.value ;
        this.setState(state);
    }
        

    async save(){
        if(this.state.menu === ""){
            alert("메뉴을 입력하세요");
            return;
        }


        let response = await fetch(
            "/api/add",
            {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify(this.state),
            }
        );

        try{
            let res = await response.json();
            //console.log(JSON.stringify(res, null, 2));
            app.state.data.push(Object.assign({}, this.state, {seq: res.output.seq}));
            this.props.history.push("/list");

        }catch{
            console.log("등록 오류");
        }

    }

    async edit(){
        if(this.state.menu === ""){
            alert("메뉴을 입력하세요");
            return;
        }

        let response = await fetch(
            "/api/edit",
            {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify(this.state),
            }
        );

        try{
            let res = await response.json();
            console.log(JSON.stringify(res, null, 2));

            
            let asis = app.state.data.find(r => r.seq === this.props.selected.seq);
            Object.assign(asis, this.state);

            this.props.history.push("/list");

        }catch{
            console.log("수정 오류");
        }

    }    

    async remove(){
        if(!window.confirm("삭제합니다")){
            return;
        }

        let response = await fetch(
            "/api/remove",
            {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({seq: this.state.seq}),
            }
        );

        try{
            let res = await response.json();
            console.log(JSON.stringify(res, null, 2));

            let idx = app.state.data.indexOf(this.props.selected);
            app.state.data.splice(idx, 1);
            this.props.history.push("/list");    

        }catch{
            console.log("등록 오류");
        }
    }

    componentDidMount(){
        this.ipt_menu.focus();
    }


    render() {
        return (
            <div className="form">
                <div className="form-group">
                    <label htmlFor="menu">메뉴</label>
                    <input type="text" className="form-control" id="menu" ref={el => this.ipt_menu = el} placeholder="메뉴" value={this.state.menu} onChange={this.handleChange}/>
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
                    <label htmlFor="location">최종방문</label>
                    <input type="text" className="form-control" id="lastVisited" placeholder="최종방문일" value={this.state.lastVisited} onChange={this.handleChange}/>
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
                        <button type="button" className="btn btn-success" onClick={this.edit.bind(this)}>저장</button>
                        <button type="button" className="btn btn-success" onClick={this.remove.bind(this)}>삭제</button>
                    </React.Fragment>
                    :
                    <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>저장</button>
                }
                
            </div>
        );
    }
}

