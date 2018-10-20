import React from "react";
import { Link } from "react-router-dom";
import "./ListDiv.scss";


export default function ListDiv(props) {
    return (
        <div className="list-div">
            <div className="header">
                <div className="flex-container">
                    <div className="col1">#</div>
                    <div className="col2">메뉴</div>
                    <div className="col3">식당명</div>
                    <div className="col4">위치</div>
                    <div className="col5">최종방문</div>
                    <div className="col6">비고</div>
                </div>

            </div>
            <div className="body">
            {
                props.list.map((row, i) => 
                    <div key={row.seq} className="flex-container" seq={row.seq} onClick={props.edit}>
                        <div className="col1">{i+1}</div>
                        <div className="col2">{row.menu}</div>
                        <div className="col3">{row.restaurant}</div>
                        <div className="col4">{row.location}</div>
                        <div className="col5">{
                                        row.lastVisited &&
                                        (row.lastVisited.substr(2,2) + "/" + row.lastVisited.substr(4,2) + "/" + row.lastVisited.substr(6,2))
                                    }</div>
                        <div className="col6">{row.etc}</div>
                    </div>
                )
            }
            </div>
            <div className="btn">
                <Link to="/write"><button type="button" className="btn btn-success">등록</button></Link>
            </div>
            
        </div>
    );
}