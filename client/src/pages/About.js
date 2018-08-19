import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
//import { url } from "inspector";

const About = () => (
  <div>
    <Hero backgroundImage= "./purplebground.jpeg">
      <h1>HyperWord</h1>
      <h2>Create an Account</h2>
    </Hero>
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-12">
          <h1>Welcome To HyperWord!</h1>
        </Col>
      </Row>
 
    </Container>
  </div>
);

export default About;
