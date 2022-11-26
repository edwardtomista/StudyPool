import React, { useContext, useState, useEffect } from "react";
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
import { backend_url } from "../links";
import { useNavigate, Navigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";

export default function Account() {
    const { user, setUser } = useContext(UserContext);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    const handleClick = (gid) => {
        navigate("/StudyGroup", {state:{id: gid}});
    }

    useEffect(() => {
        fetch(backend_url + "/getAccountInfo?id=" + user.id, {
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
    }, []);

    return (
        <div className="tables">
            {user.id ? (
                <>
                    <Container
                        component={Paper}
                        sx={{
                            marginBottom: "50px",
                            backgroundColor: "whitesmoke",
                        }}
                    >
                        <h1>Account Info</h1>
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

                    <Container
                        component={Paper}
                        sx={{
                            marginBottom: "50px",
                            backgroundColor: "whitesmoke",
                        }}
                    >
                        <h1>My Groups</h1>
                        <List sx={{ minWidth: 500 }}>
                            {groups.map(function (group) {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemButton divider={true} onClick={() => handleClick(group.id)}>
                                            <ListItemText
                                                primary={group.title}
                                                secondary={
                                                    group.course_code +
                                                    ": " +
                                                    group.subject
                                                }
                                            />
                                        </ListItemButton>
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
