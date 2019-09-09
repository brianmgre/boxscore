import React, { Component } from "react";
import { getSports } from "./api";
import CustomGrid from "./customGrid";
import { helper } from "./helper";
import CustomTable from "./table";

class GameOver extends Component {
  state = {
    finalScore: null
  };

  componentDidMount() {
    const { league } = this.props;
    getSports(league)
      .then(res => {
        this.setState({
          finalScore: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { finalScore } = this.state;
    console.log(this.state);
    const { league } = this.props;
    if (!finalScore) {
      return <h1>loading...</h1>;
    } else {
      return (
        <div>
          <CustomGrid gameInfo={finalScore} gameStatus={"completed"} />
          <CustomTable
            tableHead={league === "mlb" ? helper.innings : helper.quarters}
            tableData={finalScore}
            gameStatus={"completed"}
          />
        </div>
      );
    }
  }
}

export default GameOver;
