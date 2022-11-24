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
import { UserContext } from "../UserContext";
import { backend_url } from "../links";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

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
        console.log(user.id);
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
                creator_id: user.id,
                creator_name: user.fname + " " + user.lname,
            }),
        })
            .then((groupid) => {
                return groupid.json();
            })
            .then((gid) => {
                //This adds the user to the newly created group in usergroup table.
                //We need to do .then 2 times to ensure we get the right data.
                fetch(backend_url + "/joinGroup", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        id: Number(gid),
                        user_id: user.id,
                        course_id: 0, //THIS IS TEMPORARY, CHANGE LATER
                    }),
                });
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    return (
        <div className="tables">
            <h1>CS 46A</h1>
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Create New Group
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Create Group</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                <TextField id="outlined-basic" label="Title" variant="outlined" />
                                <TextField id="outlined-basic" label="Subject" variant="outlined" />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </div>

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
                                    <Button
                                        disabled={!user.id}
                                        variant="contained"
                                    >
                                        Join
                                    </Button>
                                    <Button
                                        disabled={!user.id}
                                        variant="contained"
                                    >
                                        Leave
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
