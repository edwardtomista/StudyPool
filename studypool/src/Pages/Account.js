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
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext";
import { backend_url } from "../links";
import { useNavigate, Navigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import "./Account.css";

export default function Account() {
    const { user, setUser } = useContext(UserContext);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    const handleClick = (gid) => {
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
    }, [groups]);

    var groupCtr = 0; // Used for group color accents
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
                                //Used to create color accents for each listitembuttom
                                let backgroundColor = "";
                                if (groupCtr === 0) {
                                    backgroundColor =
                                        "account_group_accent0";
                                    groupCtr++;
                                } else if (groupCtr === 1) {
                                    backgroundColor =
                                        "account_group_accent1";
                                    groupCtr++;
                                } else if (groupCtr === 2) {
                                    backgroundColor =
                                        "account_group_accent2";
                                    groupCtr++;
                                } else {
                                    backgroundColor =
                                        "account_group_accent3";
                                    groupCtr = 0;
                                }
                                return (
                                    <ListItem>
                                        <ListItemButton
                                            divider={true}
                                            onClick={() =>
                                                handleClick(group.id)
                                            }
                                            disableGutters
                                            sx={{ p: 0, ml: 2 }}
                                        >
                                            <div className={backgroundColor}>
                                                &nbsp;
                                            </div>
                                            <ListItemText
                                                primary={group.title}
                                                secondary={
                                                    group.course_code +
                                                    ": " +
                                                    group.subject
                                                }
                                            />
                                        </ListItemButton>
                                        <Button
                                            variant="contained"
                                            sx={{ marginLeft: "10px" }}
                                            onClick={() =>
                                                handleLeave(group.id)
                                            }
                                        >
                                            Leave
                                        </Button>
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
