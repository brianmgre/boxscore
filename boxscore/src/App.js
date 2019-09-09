import React, { Component } from "react";
import "./App.css";
import Game from "./views/game";

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Game league={"mlb"} />
        <Game league={"nba"} />
      </div>
    );
  }
}

export default App;
