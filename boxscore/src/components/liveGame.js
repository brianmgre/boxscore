import React, { Component } from "react";
import { getSports } from "./api";
import CustomTable from "./table";
import { helper } from "./helper";
import CustomGrid from "./customGrid";
import withStyles from "@material-ui/core/styles/withStyles";

let gameLength;
const styles = {
  liveGameFooter: {
    marginBottom: "30px"
  }
};

class LiveGame extends Component {
  state = {
    gameData: null,
    error: false
  };

  componentDidMount() {
    const { league } = this.props;

    const tick = () => {
      this.setGameLength();
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

  //sets length of headers for table based on league
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

  // moves to the final view when the game is over
  //comment out to see game view
  componentDidUpdate(prevProps, prevState) {
    const { gameData } = this.state;
    const { setGameStatus, league } = this.props;
    if (gameData[0].event_information.status === "completed") {
      setGameStatus("completed");
    }
  }

  render() {
    const { classes, setGameStatus } = this.props;
    const { gameData, error } = this.state;
    if (gameData === null || gameData.length === 0) {
      return <h1>loading....</h1>;
    } else {
      return (
        <React.Fragment>
          <CustomTable tableHead={gameLength} tableData={gameData} />
          <div className={classes.liveGameFooter}>
            <CustomGrid
              gameInfo={gameData}
              gameStatus={"live"}
              setGameStatus={setGameStatus}
              gameBtn={"Leave Game"}
            />
          </div>
          {error && <p>'Error receiving data'</p>}
        </React.Fragment>
      );
    }
  }
}

export default withStyles(styles)(LiveGame);
