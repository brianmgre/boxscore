import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import { helper } from "./helper";

const styles = {
  gridContainer: {
    width: "100%"
  },

  gridItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "2rem"
  },

  paperContainer: {
    width: "36%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    fontWeight: "bold"
  },

  gridImage: {
    width: "43%"
  },

  btn: {
    marginTop: 10,
    background: "white",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer"
    }
  }
};

const CustomGrid = props => {
  const { gameInfo, gameStatus, classes, toggleGame, gameBtn } = props;

  console.log(gameInfo);
  return (
    <Grid item xs={12} className={classes.gridContainer}>
      <Grid container justify="center">
        {gameInfo.map(value => (
          <Grid key={value} item className={classes.gridItems}>
            <Paper className={classes.paperContainer} id="awayTeam">
              <img
                className={classes.gridImage}
                src={helper[value.away_team.abbreviation]}
                alt={value.away_team.abbreviation}
              />
              {value.away_team.last_name}
            </Paper>
            {gameStatus === "completed" && (
              <Paper className={classes.paperContainer}>
                <h1>Final</h1>
                <h1>
                  {gameStatus === "completed"
                    ? value.away_period_scores.reduce((a, b) => a + b, 0)
                    : null}{" "}
                  -{" "}
                  {gameStatus === "completed"
                    ? value.home_period_scores.reduce((a, b) => a + b, 0)
                    : null}
                </h1>
              </Paper>
            )}

            {gameStatus === "pre" && (
              <Paper className={classes.paperContainer}>
                <p>{value.event_information.site.name}</p>
                <p>
                  {moment(value.event_information.start_date_time).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
                {value.event_information.temperature !== 0 ? (
                  <p>Temperature: {value.event_information.temperature}°</p>
                ) : null}
                <button onClick={toggleGame} className={classes.btn}>
                  {gameBtn}{" "}
                </button>
              </Paper>
            )}

            {gameStatus === "live" && (
              <Paper className={classes.paperContainer}>
                <h1>{value.event_information.status}</h1>
                <button onClick={toggleGame} className={classes.btn}>
                  {gameBtn}
                </button>
              </Paper>
            )}
            <Paper className={classes.paperContainer} id="homeTeam">
              <img
                className={classes.gridImage}
                src={helper[value.home_team.abbreviation]}
                alt={value.away_team.abbreviation}
              />
              {value.home_team.last_name}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CustomGrid);
