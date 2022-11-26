import * as React from "react";
import { useContext, useState, useEffect } from "react";
import "./Groups.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { UserContext } from "../UserContext";
import { backend_url } from "../links";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { create } from "@mui/material/styles/createTransitions";

export default function Groups(props) {
    const { user, setUser } = useContext(UserContext);
    const [groups, setGroups] = useState([]); //title, subject, host
    const [userGroups, setUserGroups] = useState([]); //title, subject, host
    const [open, setOpen] = useState(false); //Used to open create box
    const [createTitle, setCreateTitle] = useState(""); //Used for creating group
    const [createSubject, setCreateSubject] = useState(""); //Used for creating group
    const location = useLocation();
    const navigate = useNavigate();
    //location.state.cid is the courseID we are looking at

    useEffect(() => {
        //Go to /catalog if user types /groups into url
        if (!location.state) {
            navigate("/catalog");
        } else {
            //This fetches all studygroups to display for the current course we are looking at
            fetch(backend_url + "/getGroups?cid=" + location.state.cid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setGroups(data);
                });
            //This fetches all of the current user's study groups in this course
            fetch(
                backend_url +
                    "/getUserGroups?cid=" +
                    location.state.cid +
                    "&id=" +
                    user.id,
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
                    let curUserGroups = [];
                    for (let row of data) {
                        curUserGroups.push(row.id);
                    }
                    setUserGroups(curUserGroups);
                });
        }
    }, [groups]);

    const handleCreate = () => {
        setOpen(false);
        fetch(backend_url + "/createGroup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                course_id: location.state.cid,
                title: createTitle,
                subject: createSubject,
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
                        course_id: location.state.cid,
                    }),
                });
            });
        setGroups([
            ...groups,
            {
                course_id: location.state.cid,
                title: createTitle,
                subject: createSubject,
                creator_name: user.fname + " " + user.lname,
            },
        ]);
        setCreateTitle("");
        setCreateSubject("");
    };

    const handleJoin = (gid) => {
        fetch(backend_url + "/joinGroup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id: Number(gid),
                user_id: user.id,
                course_id: location.state.cid,
            }),
        });
        navigate("/StudyGroup", { state: { id: gid } });
    };

    const handleLeave = (gid) => {
        fetch(backend_url + "/leaveGroup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id: Number(gid),
                user_id: user.id,
            }),
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {location.state ? (
                <div className="tables">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate("/catalog");
                        }}
                    >
                        Back
                    </Button>
                    <h1>{location.state.cname}</h1>
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
                                        "& > :not(style)": {
                                            m: 1,
                                            width: "25ch",
                                        },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Title"
                                        variant="outlined"
                                        value={createTitle}
                                        onChange={(e) => {
                                            setCreateTitle(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Subject"
                                        variant="outlined"
                                        value={createSubject}
                                        onChange={(e) => {
                                            setCreateSubject(e.target.value);
                                        }}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleCreate}>Create</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <TableContainer
                        component={Paper}
                        sx={{ marginTop: "10px" }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow
                                    sx={{ backgroundColor: "whitesmoke" }}
                                >
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Subject</TableCell>
                                    <TableCell align="right">Host</TableCell>
                                    <TableCell align="right">
                                        Join/Leave
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groups.map((row) => (
                                    <TableRow
                                        key={row.title}
                                        hover={true}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
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
                                                disabled={
                                                    !user.id ||
                                                    userGroups.includes(row.id)
                                                }
                                                variant="contained"
                                                onClick={() => {
                                                    handleJoin(row.id);
                                                }}
                                            >
                                                Join
                                            </Button>
                                            <Button
                                                disabled={
                                                    !user.id ||
                                                    !userGroups.includes(row.id)
                                                }
                                                variant="contained"
                                                sx={{ marginLeft: "2px" }}
                                                onClick={() => {
                                                    handleLeave(row.id);
                                                }}
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
            ) : (
                <Navigate to="/Catalog" />
            )}
        </>
    );
}
