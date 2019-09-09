import React, { Component } from "react";
import { getSports } from "./api";
import CustomTable from "./table";
import { helper } from "./helper";

let gameLength;

class LiveGame extends Component {
  state = {
    gameData: null,
    error: false
  };

  componentDidMount() {
    const { league } = this.props;
    this.setGameLength();
    const tick = () => {
      getSports(league)
        .then(res => {
          this.setState({
            gameData: res.data
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: true
          });
        });
    };
    tick();
    this.timer = window.setInterval(tick, 15000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  setGameLength() {
    const { league } = this.props;
    if (league === "mlb") {
      gameLength = helper.innings;
    } else if (league === "nhl") {
      gameLength = helper.periods;
    } else {
      gameLength = helper.quarters;
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { gameData } = this.state;
  //   const { gameStatus, league } = this.props;
  //   // if (gameData[0].event_information.status === "completed") {
  //   //   gameStatus("completed");
  //   // }

  // }

  render() {
    const { classes, league, toggleGame } = this.props;
    const { gameData, error } = this.state;
    if (gameData === null || gameData.length === 0) {
      return <h1>loading....</h1>;
    } else {
      return (
        <React.Fragment>
          <CustomTable tableHead={gameLength} tableData={gameData} />
          <div>
            <p>{gameData[0].away_team.last_name}</p>
            <p>{gameData[0].event_information.status}</p>
            <p>{gameData[0].home_team.last_name}</p>
          </div>
          <button onClick={toggleGame}>Turn off</button>
          {error && <p>'Error receiving data'</p>}
        </React.Fragment>
      );
    }
  }
}

export default LiveGame;
