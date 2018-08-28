import React from "react";
import "./Leaderboard.css";
import { Link } from "react-router-dom";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import ScoreRow from "../ScoreRow";
import UserRow from "../UserRow";
import _ from 'lodash';


const Leaderboard = props => (
    <div>
                <div className='container'>
          <header>
              <div className="wrapper">
                <h1>Leaderboard</h1>         
              </div>
          </header>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th></th>
                        <th scope="col">Username</th>
                        <th scope="col">
                          <span onClick={this.sortByRound}>Rounds Completed&nbsp;
                            <i className="fa fa-angle-up" style={{fontSize : "24px"}}></i>
                          </span>
                        </th>
                        <th scope="col">
                          <span onClick={this.sortByScore}>Score&nbsp;
                            <i className="fa fa-angle-down" style={{fontSize : "24px"}}></i>
                          </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="LeaderTable">
                    {this.state.items.map((item, index) => {
                        return (
                            <tr key={props.item.id}>
                                <td>{index + 1}</td>
                                <td><img src={props.item.avatar} style={{borderRadius : "50%", height : "50px", width : "auto"}}></img></td>
                                <td>{props.item.user}</td>
                                <td>{props.item.round}</td>
                                <td>{props.item.score}</td>
                            </tr>
                        )                
                    })}
                </tbody>
            </table>
        </div>
    {/* <Container>
        <Row>
            <Col size="sm-12">
                <h1>Leaderboard</h1>
            </Col>
            <Col size="sm-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Rounds Completed</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.userArray.map((user, index) => {
                            return (
                                <ScoreRow 
                                key={index}
                                user={user} />
                            )                
                        })}
                    </tbody>
                </table>
            </Col>
        </Row>
        <Row>
            <Col size="sm-12">
                <h2 className="center">Honorable Mentions</h2>
            </Col>
            <Col size="sm-12">
                <table className="table table-striped" id="top50table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Rounds Completed</th>
                        <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.map((user, index) => {
                            return (
                                <UserRow 
                                key={index}
                                user={user} />
                            )                
                        })}
                    </tbody>
                </table>
            </Col>
        </Row>

    </Container> */}
    </div>

);


export default Leaderboard;