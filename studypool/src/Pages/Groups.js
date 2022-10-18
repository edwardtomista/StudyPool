import * as React from 'react';
import './Groups.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(title, subject, host) {
  return { title, subject, host };
}

const rows = [
  createData('Study Group 1', 'Study Session for Midterm', 'Edward Tomista'),
  createData('Study Group 2', 'Quiz Study Session', 'Alan Ngo'),
  createData('Study Group 3', 'Midterm 2 Study Session', 'Josh Oh'),
  createData('Study Group 4', 'Final Study Session', 'Junyu Mu'),

];

export default function Groups() {
  return (
    <div className="tables">
      <h1>CS 46A</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Host</TableCell>
            <TableCell align="right">Join/Leave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.host}</TableCell>
              <TableCell align="right">
              <Button variant="contained">Join</Button>
              <Button variant="contained">Leave</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  );
}