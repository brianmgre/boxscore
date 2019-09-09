import React, { Component } from "react";
import { getSports } from "./api";
import CustomTable from "./table";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import CustomGrid from "./customGrid";

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
    const { league } = this.props;

    if (gameInfo === null || gameInfo.length === 0) {
      return <h1>loading....</h1>;
    } else {
      return (
        <div>
          <CustomGrid gameInfo={gameInfo} gameStatus={"pre"} />
        </div>
      );
    }
  }
}

export default PreGame;
