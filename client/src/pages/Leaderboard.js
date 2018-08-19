import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Alert from "../components/Alert";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

const Leaderboard = () => (
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
                    <tbody id="waitlistSection">
                    </tbody>
                </table>
            </Col>
        </Row>


    </Container>
    </div>
);

export default Leaderboard;
