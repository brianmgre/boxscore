import React, { Component } from "react";
import LiveGame from "../components/liveGame";
import PreGame from "../components/preGame";
import GameOver from "../components/gameOver";

class Game extends Component {
  state = {
    gameStatus: "pre"
  };

  setGameStatus = status => {
    this.setState({
      gameStatus: status
    });
  };

  render() {
    const { gameStatus } = this.state;
    const { league } = this.props;

    if (gameStatus === "pre") {
      return (
        <div className="App">
          <PreGame league={league} setGameStatus={this.setGameStatus} />
        </div>
      );
    } else if (gameStatus === "live") {
      return (
        <div className="App">
          <LiveGame setGameStatus={this.setGameStatus} league={league} />
        </div>
      );
    } else if (gameStatus === "completed") {
      return (
        <div className="App">
          <GameOver league={league} />
        </div>
      );
    }
  }
}

export default Game;
