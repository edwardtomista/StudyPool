import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

function createData(courseName, groupName) {
    return { courseName, groupName };
}

const groups = [
    createData("CS 46A", "CS 46A fall 2022"),
    createData("ENGR 10", "Engineering intro group"),
    createData("MATH 30", "Math?"),
    createData("ENGL 1A", "ENGLISH!!"),
];

export default function Account() {
    const { user, setUser } = useContext(UserContext);
    const [userGroups, setUserGroups] = useState([]);

    return (
        <div className="tables">
            {user.id ? (
                <>
                    <h1>Account Info</h1>
                    <Container component={Paper} sx={{ marginBottom: "50px" }}>
                        <List sx={{ minWidth: 500 }}>
                            <ListItem>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        marginTop: "1%",
                                        width: "100px",
                                    }}
                                >
                                    First Name:
                                </Typography>
                                <Typography
                                    sx={{
                                        marginLeft: "5%",
                                        fontSize: 15,
                                        marginTop: "1%",
                                    }}
                                >
                                    {user.fname}
                                </Typography>
                            </ListItem>

                            <ListItem>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        marginTop: "1%",
                                        width: "100px",
                                    }}
                                >
                                    Last Name:
                                </Typography>
                                <Typography
                                    sx={{
                                        marginLeft: "5%",
                                        fontSize: 15,
                                        marginTop: "1%",
                                    }}
                                >
                                    {user.lname}
                                </Typography>
                            </ListItem>

                            <ListItem>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        marginTop: "1%",
                                        width: "100px",
                                    }}
                                >
                                    Email:
                                </Typography>
                                <Typography
                                    sx={{
                                        marginLeft: "5%",
                                        fontSize: 15,
                                        marginTop: "1%",
                                    }}
                                >
                                    {user.email}
                                </Typography>
                            </ListItem>
                        </List>
                    </Container>
                    <h1>My Group</h1>
                    <Container component={Paper}>
                        <List sx={{ minWidth: 500 }}>
                            {groups.map(function (group) {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={group.groupName}
                                            secondary={group.courseName}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Container>
                </>
            ) : (
                <Navigate to="/Login" />
            )}
        </div>
    );
}
