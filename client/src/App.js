import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Score from "./pages/Score";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
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
      </Wrapper>
    </div>
  </Router>
);

export default App;
