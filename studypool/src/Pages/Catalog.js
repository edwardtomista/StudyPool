import * as React from 'react';
import './Catalog.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(section, title, time, instructor) {
  return { section, title, time, instructor };
}

const rows = [
  createData('CS 46A', 'Introduction to Programming', '01:30PM-02:45PM', 'Qi Yang'),
  createData('ENGR 10', 'Introduction to Engineering', '12:00PM-12:50PM', 'Jack Warecki'),
  createData('MATH 30', 'Calculus I', '10:30AM-11:45AM', 'Minh Vu'),
  createData('ENGL 1A', 'First Year Writing', '07:30AM-08:45AM', 'Anne Walker'),
];

export default function Catalog() {
  return (
    <div className="tables">
      <h1>Class Catalog</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Section</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Instructor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.section}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.section}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.instructor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  );
}