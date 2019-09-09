import React, { Component } from "react";
import { getSports } from "./api";
import CustomGrid from "./customGrid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  preGameContainer: {}
};

class PreGame extends Component {
  state = {
    gameInfo: null
  };

  componentDidMount() {
    const { league } = this.props;

    getSports(league)
      .then(res => {
        this.setState({
          gameInfo: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { gameInfo } = this.state;
    const { league, classes, toggleGame } = this.props;

    if (gameInfo === null || gameInfo.length === 0) {
      return <h1>loading....</h1>;
    } else {
      return (
        <div className={classes.preGameContainer}>
          <CustomGrid
            gameInfo={gameInfo}
            gameStatus={"pre"}
            toggleGame={toggleGame}
            gameBtn={"Launch Game"}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(PreGame);
