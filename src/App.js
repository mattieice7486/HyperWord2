import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Search from "./pages/Search";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        {/* <Route exact path="/discover" component={Discover} /> */}
        {/* <Route exact path="/search" component={Search} /> */}
        {/* <Route exact path="/newaccount" component={CreateAccount} /> */}
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/game" component={Game} />
        {/* <Route component={NoMatch} /> */}
      </Wrapper>
      {/* <Footer /> */}
    </div>
  </Router>
);

export default App;
