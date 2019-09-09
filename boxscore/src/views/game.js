import React, { Component } from "react";
import { getSports } from "../components/api.js";
import LiveGame from "../components/liveGame";
import PreGame from "../components/preGame";
import GameOver from "../components/gameOver";

class Game extends Component {
  state = {
    gameOn: false,
    gameStatus: "pre"
  };

  toggleGame = () => {
    const { gameStatus } = this.state;

    this.setState({
      gameOn: !this.state.gameOn,
      gameStatus: gameStatus == "pre" ? "live" : "pre"
    });
  };

  setGameStatus = status => {
    this.setState({
      gameStatus: status,
      gameOn: false
    });
  };

  render() {
    const { gameOn, gameStatus } = this.state;
    const { league } = this.props;

    if (gameStatus === "pre") {
      return (
        <div className="App">
          <PreGame league={league} />
          <button onClick={this.toggleGame}>game</button>
        </div>
      );
    } else if (gameStatus === "live") {
      return (
        <div className="App">
          <LiveGame
            gameStatus={this.setGameStatus}
            toggleGame={this.toggleGame}
            league={league}
          />
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
