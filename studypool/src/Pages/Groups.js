import * as React from "react";
import { useContext, useState, useEffect } from "react";
import "./Groups.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { UserContext } from "../UserContext";
import { backend_url } from "../links";

export default function Groups() {
    const { user, setUser } = useContext(UserContext);
    const [groups, setGroups] = useState([]); //title, subject, host
    useEffect(() => {
        fetch(backend_url + "/getGroups")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setGroups(data);
            });
          console.log(user)
    }, []);

    const handleCreate = () => {
        fetch(backend_url + "/createGroup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                course_id: 0, //THIS IS TEMPORARY, CHANGE LATER
                title: "Test Title",
                subject: "Test Subject",
                creator_name: user.fname + " " + user.lname,
            }),
        });
        //This setgroups is here to update the group list right away. On refresh the group displayed
        //should be the same.
        setGroups([
            ...groups,
            {
                course_id: 0, //0 is temporary, MUST CHANGE LATER
                title: "Test Title",
                subject: "Test Subject",
                creator_name: user.fname + " " + user.lname,
            },
        ]);
    };

    return (
        <div className="tables">
            <h1>CS 46A</h1>
            <Button variant="contained" disabled={!user.id} onClick={() => handleCreate()}>
                Create
            </Button>
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
                        {groups.map((row) => (
                            <TableRow
                                key={row.title}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">
                                    {row.subject}
                                </TableCell>
                                <TableCell align="right">
                                    {row.creator_name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button disabled={!user.id} variant="contained">Join</Button>
                                    <Button disabled={!user.id} variant="contained">Leave</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
