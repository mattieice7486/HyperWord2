import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Search from "./pages/Search";
import Leaderboard from "./pages/Leaderboard";
import Score from "./pages/Score";
import Game from "./pages/MollyGame";
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
        <Route exact path="/" component={About} />
        <Route exact path="/about" component={About} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/game" component={Game} />
        {/* <Route component={NoMatch} /> */}
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
