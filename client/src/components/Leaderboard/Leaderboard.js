import React from "react";
import "./Leaderboard.css";
import { Link } from "react-router-dom";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";

const Leaderboard = props => (
    <div>
    <Container>
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
                        <tr>
                            <th><span></span></th>
                            <th><span></span></th>
                            <th><span></span></th>
                            <th><span>
                                {/* {props.state.score} */}
                            </span></th>
                        </tr>
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
                        <th><span></span></th>
                        <th><span></span></th>
                        <th><span></span></th>
                        <th><span></span></th>
                    </tbody>
                </table>
            </Col>
        </Row>

    </Container>
    </div>

);


export default Leaderboard;
