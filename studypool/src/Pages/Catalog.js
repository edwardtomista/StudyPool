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
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import SearchBar from "./SearchBar.js"


export default function Catalog() {
    const [courses, setCourses] = useState([
      {courses: "1", name: "KINK"}
    ]);
    const [courseCount, setCourseCount] = useState(100);
    const [page, setPage] = useState(0);
    const [sortSection, setSortSection] = useState(false);
    const [sortName, setSortName] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
    };
    const handleClick = (courseId, courseCode) => {
        navigate("/Groups", { state: { cid: courseId, cname: courseCode } });
    };
    //this runs on page refresh / first render
    useEffect(() => {
        fetch(backend_url + "/courseCount")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCourseCount(data[0]["count(*)"]);
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
    }, []);

    //this runs everytime the page is changed
    useEffect(() => {
        fetch(backend_url + "/courseCount")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCourseCount(data[0]["count(*)"]);
            });
        let urlParam = "";
        //this if block accounts for if the user has the catalog sorted
        if (sortSection) {
            urlParam += "&courseCode=desc";
        } else if (sortName) {
            urlParam += "&courseName=desc";
        }
        fetch(
            backend_url +
                "/getCourses?start=" +
                page * rowsPerPage +
                "&rowsPerPage=" +
                rowsPerPage +
                urlParam,
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

    useEffect(() => {
        window.scrollTo({ top: 80, left: 0, behavior: "smooth" });
    }, [page]);

    const handleSort = (type) => {
        //type === 0 for sorting section, 1 for sorting name
        let urlParam = "";
        if (type === 0) {
            //sorting by course code
            let courseCode = "desc";
            if (sortSection) {
                courseCode = "asc";
            }
            setSortSection(!sortSection);
            setSortName(false);
            urlParam += "&courseCode=" + courseCode;
        } else {
            //sorting by name
            let courseName = "desc";
            if (sortName) {
                courseName = "asc";
            }
            setSortName(!sortName);
            setSortSection(false);
            urlParam += "&courseName=" + courseName;
        }
        fetch(
            backend_url +
                "/getCourses?start=" +
                page * rowsPerPage +
                "&rowsPerPage=" +
                rowsPerPage +
                urlParam,
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
        setPage(0);
    };

    return (
        <div className="tables">
            <h1>Class Catalog</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <SearchBar placeholder ="Search Class... " data = {courses}/>
                        <TableRow sx={{ backgroundColor: "Gainsboro" }}>
                            <TableCell style={{ width: 300 }}>
                                Section
                                <IconButton
                                    aria-label=""
                                    onClick={() => {
                                        handleSort(0);
                                    }}
                                >
                                    {sortSection ? (
                                        <KeyboardArrowDownIcon />
                                    ) : (
                                        <KeyboardArrowUpIcon />
                                    )}
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                Title{" "}
                                <IconButton
                                    aria-label=""
                                    onClick={() => {
                                        handleSort(1);
                                    }}
                                >
                                    {sortName ? (
                                        <KeyboardArrowDownIcon />
                                    ) : (
                                        <KeyboardArrowUpIcon />
                                    )}
                                </IconButton>
                            </TableCell>
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
                                    style={{ width: 150 }}
                                    component="th"
                                    scope="row"
                                >
                                    {row.course_code}
                                </TableCell>
                                <TableCell align="left">
                                    {row.course_name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleClick(row.id, row.course_code)
                                        }
                                    >
                                        Select
                                    </Button>
                                </TableCell>
                                {/* <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.instructor}</TableCell> */}
                            </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: "Gainsboro" }}>
                            <TableCell style={{ width: 300 }}>
                                <TablePagination
                                    component={TableBody}
                                    count={courseCount}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
