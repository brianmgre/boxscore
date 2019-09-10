import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  tableContainer: {
    width: "100%"
  },

  customTable: {
    minWidth: 400,
    padding: 0
  },

  customRow: {
    paddingRight: 16,
    fontSize: "1.6rem",
    backgroundColor: "#EFEFEF",
    fontWeight: "bold"
  },

  gameCells: {
    paddingRight: 16,
    fontSize: "1.6rem",
    backgroundColor: "#FAFAFA"
  }
};

const CustomTable = props => {
  const { classes, tableHead, tableData } = props;

  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.customTable}>
        <TableHead>
          <TableRow>
            {tableHead.map((prop, key) => {
              return (
                <TableCell key={key + 10} className={classes.gameCells}>
                  {prop}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <React.Fragment key={key + 100}>
                <TableRow>
                  <TableCell className={classes.customRow}>
                    {tableData[0].away_team.abbreviation}
                  </TableCell>
                  {prop.away_period_scores.map((prop, key) => {
                    return (
                      <TableCell key={key + 203} className={classes.gameCells}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  {tableData[0].league === "MLB" ? (
                    <React.Fragment>
                      <TableCell className={classes.customRow}>
                        {reduceScores(tableData[0].away_period_scores)}
                      </TableCell>
                      <TableCell className={classes.customRow}>
                        {tableData[0].away_batter_totals.hits}
                      </TableCell>
                      <TableCell className={classes.customRow}>
                        {tableData[0].away_errors}
                      </TableCell>
                    </React.Fragment>
                  ) : (
                    <TableCell className={classes.customRow}>
                      {reduceScores(tableData[0].away_period_scores)}
                    </TableCell>
                  )}
                </TableRow>
                <TableRow key={prop}>
                  <TableCell className={classes.customRow}>
                    {tableData[0].home_team.abbreviation}
                  </TableCell>
                  {prop.home_period_scores.map((prop, key) => {
                    return (
                      <TableCell key={key + 303} className={classes.gameCells}>
                        {prop}
                      </TableCell>
                    );
                  })}

                  {tableData[0].league === "MLB" ? (
                    <React.Fragment>
                      <TableCell className={classes.customRow}>
                        {reduceScores(tableData[0].home_period_scores)}
                      </TableCell>
                      <TableCell className={classes.customRow}>
                        {tableData[0].home_batter_totals.hits}
                      </TableCell>
                      <TableCell className={classes.customRow}>
                        {tableData[0].home_errors}
                      </TableCell>
                    </React.Fragment>
                  ) : (
                    <TableCell className={classes.customRow}>
                      {reduceScores(tableData[0].home_period_scores)}
                    </TableCell>
                  )}
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

function reduceScores(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export default withStyles(styles)(CustomTable);
