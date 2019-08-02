import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const Scores = () => (
  <Query
    query={gql`
      {
        players {
          id
          name
          score
        }
      }
    `}
    pollInterval={15000}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const Players = () => data.players
        .sort((a,b) => b.score - a.score)
        .map(({ id, name, score }) => (
        <TableRow key={id}>
          <TableCell>{name}</TableCell>
          <TableCell align="right">{score}</TableCell>
        </TableRow>
      ));

      return <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <Players />
                </TableBody>
              </Table>
            </Paper>
    }}
  </Query>
);

export default function Component () { 
  return(
  <div>
    <Scores />
    <p>
    <Button component={Link} to="/" variant="contained">Back</Button>
    </p>
  </div>
);
}
