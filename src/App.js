import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Search from "./pages/Search";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game.js";
import CreateAccount from "./pages/CreateAccount"
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        {/* <Route exact path="/newaccount" component={CreateAccount} /> */}
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/createaccount" component={CreateAccount} />
        {/* <Route component={NoMatch} /> */}
      </Wrapper>
    </div>
  </Router>
);

export default App;