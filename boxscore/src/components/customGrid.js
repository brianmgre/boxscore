import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const CustomGrid = props => {
  const { gameInfo, gameStatus } = props;
  return (
    <Grid item xs={12}>
      <Grid container justify="center">
        {gameInfo.map(value => (
          <Grid key={value} item>
            <Paper>
              {value.away_team.last_name}
              {gameStatus === "completed"
                ? value.away_period_scores.reduce((a, b) => a + b, 0)
                : null}
            </Paper>
            {gameStatus === "completed" ? (
              <Paper>
                <h1>Final</h1>
              </Paper>
            ) : (
              <Paper>
                <p>{value.event_information.site.name}</p>
                <p>{value.event_information.site.state}</p>
                <p>
                  {moment(value.event_information.start_date_time).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
                <p>Temperature: {value.event_information.temperature}°</p>
              </Paper>
            )}
            <Paper>
              {value.home_team.last_name}
              {gameStatus === "completed"
                ? value.home_period_scores.reduce((a, b) => a + b, 0)
                : null}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CustomGrid;
