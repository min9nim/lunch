import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Write.scss';

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: "",
            restaurant: "",
            location: "",
            etc : "",
        }
    }


    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="menu">메뉴</label>
                    <input type="text" className="form-control" id="menu" placeholder="메뉴" value={this.menu}/>
                </div>
                <div className="form-group">
                    <label htmlFor="restaurant">식당이름</label>
                    <input type="text" className="form-control" id="restaurant" placeholder="식당이름" value={this.restaurant}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">위치</label>
                    <input type="text" className="form-control" id="location" placeholder="위치" value={this.location}/>
                </div>
                <div className="form-group">
                    <label htmlFor="etc">비고</label>
                    <input type="text" className="form-control" id="etc" placeholder="비고" value={this.etc}/>
                </div>
                <Link to="/list"><button type="button" className="btn btn-success">목록</button></Link>
                <button type="button" className="btn btn-success">저장</button>
            </div>
        );
    }
}

