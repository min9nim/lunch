import React from 'react';
import { Link } from "react-router-dom";
import "./ListTable.scss";

const ListTable = (props) => {
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
                            props.list.length > 0
                            ?
                            props.list.map((row, i) => 
                                <tr key={row.seq} seq={row.seq} onClick={props.edit}>
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

export default ListTable;