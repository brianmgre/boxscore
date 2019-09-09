import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import { Icon, TableFooter, TablePagination } from "@material-ui/core";

const CustomTable = props => {
  const { classes, tableHead, tableData, tableHeaderColor, gameStatus } = props;
  console.log("props", tableData);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((prop, key) => {
              return <TableCell key={key + 10}>{prop}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <React.Fragment key={key + 100}>
                <TableRow>
                  <TableCell>{tableData[0].away_team.abbreviation}</TableCell>
                  {prop.away_period_scores.map((prop, key) => {
                    console.log(tableData[0]);
                    return <TableCell key={key + 203}>{prop}</TableCell>;
                  })}
                  {tableData[0].league === "MLB" ? (
                    <React.Fragment>
                      <TableCell>
                        {tableData[0].away_period_scores.reduce(
                          (a, b) => a + b,
                          0
                        )}
                      </TableCell>
                      <TableCell>
                        {tableData[0].away_batter_totals.hits}
                      </TableCell>
                      <TableCell>{tableData[0].away_errors}</TableCell>
                    </React.Fragment>
                  ) : (
                    <TableCell>
                      {tableData[0].away_period_scores.reduce(
                        (a, b) => a + b,
                        0
                      )}
                    </TableCell>
                  )}
                </TableRow>
                <TableRow key={prop}>
                  <TableCell>{tableData[0].home_team.abbreviation}</TableCell>
                  {prop.home_period_scores.map((prop, key) => {
                    return <TableCell key={key + 303}>{prop}</TableCell>;
                  })}

                  {tableData[0].league === "MLB" ? (
                    <React.Fragment>
                      <TableCell>
                        {tableData[0].home_period_scores.reduce(
                          (a, b) => a + b,
                          0
                        )}
                      </TableCell>
                      <TableCell>
                        {tableData[0].home_batter_totals.hits}
                      </TableCell>
                      <TableCell>{tableData[0].home_errors}</TableCell>
                    </React.Fragment>
                  ) : (
                    <TableCell>
                      {tableData[0].home_period_scores.reduce(
                        (a, b) => a + b,
                        0
                      )}
                    </TableCell>
                  )}
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
        {gameStatus !== "completed" ? (
          <TableFooter>
            <TableRow>
              <TableCell>{tableData[0].away_team.full_name}</TableCell>
              <TableCell>{tableData[0].event_information.status}</TableCell>
              <TableCell>{tableData[0].home_team.full_name}</TableCell>
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
};

export default CustomTable;
