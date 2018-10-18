import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
        app.state.view.selected = e.target.parentNode.getAttribute("seq");
        this.props.history.push("/write");  
    }


    render() {
        console.log("length : " + app.state.data.length);
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">메뉴</th>
                            <th scope="col">식당명</th>
                            <th scope="col">위치</th>
                            <th scope="col">최종방문</th>
                            <th scope="col">비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.length > 0
                            ?
                            this.state.data.map((row, i) => 
                                <tr key={row.seq} seq={row.seq} onClick={this.edit.bind(this)}>
                                    <th scope="row">{i+1}</th>
                                    <td>{row.menu}</td>
                                    <td>{row.restaurant}</td>
                                    <td>{row.location}</td>
                                    <td>{
                                        row.lastVisited &&
                                        (row.lastVisited.substr(0,4) + "/" + row.lastVisited.substr(4,2) + "/" + row.lastVisited.substr(6,2))
                                    }</td>
                                    <td>{row.etc}</td>
                                </tr>                            
                                )
                            :
                            <tr>
                                <td rowSpan="6">No data</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <Link to="/write"><button type="button" className="btn btn-success">등록</button></Link>
            </div>
        );
    }
}

export default List;
