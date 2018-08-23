import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import Score from "./pages/Score";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Game} />
        <Route exact path="/score" component={Score} />
        <Route exact path="/game" component={Game} />
        <Route path="/login" component={LoginPage}/>
        {/* <Route component={NoMatch} /> */}
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
