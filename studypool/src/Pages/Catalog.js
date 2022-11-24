import * as React from "react";
import { useState, useEffect } from "react";
import "./Catalog.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { backend_url } from "../links";

export default function Catalog() {
    const [courses, setCourses] = useState([]);
    const [courseCount, setCourseCount] = useState(100);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
    };
    useEffect(() => {
        fetch(backend_url + "/courseCount")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCourseCount(data[0]["count(*)"])
            });
        fetch(
            backend_url +
                "/getCourses?start=" +
                page * rowsPerPage +
                "&rowsPerPage=" +
                rowsPerPage,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCourses(data);
            });
    }, [page, rowsPerPage]);

    return (
        <div className="tables">
            <h1>Class Catalog</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow selected={true}>
                            <TableCell style={{ width: 100 }}>
                                Section
                            </TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="right"></TableCell>
                            {/* <TableCell align="right">Time</TableCell>
            <TableCell align="right">Instructor</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((row) => (
                            <TableRow
                                key={row.id}
                                hover={true}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    style={{ width: 100 }}
                                    component="th"
                                    scope="row"
                                >
                                    {row.course_code}
                                </TableCell>
                                <TableCell align="left">
                                    {row.course_name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">Select</Button>
                                </TableCell>
                                {/* <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.instructor}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        component={TableBody}
                        count={courseCount}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}
