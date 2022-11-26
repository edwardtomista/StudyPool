import React, { useState, useEffect, useContext } from "react";
import Post from "../Components/StudyGroup/Post";
import "./StudyGroup.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { backend_url } from "../links";
import { UserContext } from "../UserContext";

const StudyGroup = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    //location.state.id is the current group id
    const [postInput, setPostInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [memberList, setMemberList] = useState([]); //Takes strings of member names
    const [myGroups, setMyGroups] = useState([]); //Currently takes strings, will have to change it
    const handleSubmit = () => {
        if (postInput) {
            setPosts([
                {
                    author: "John Doe",
                    content: postInput,
                },
                ...posts,
            ]);
            setPostInput("");
            console.log(posts);
        }
    };

    const handleGroupRedirect = (gid) => {
        navigate("/StudyGroup", { state: { id: gid } });
    };

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        } else {
            //This gets the current groups the user is in
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
                    setMyGroups(data);
                });
            //This will get the current members in this study group
            fetch(backend_url + "/studyGroupMembers?gid=" + location.state.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    let tmp = [];
                    for (let mem of data) {
                        tmp.push(mem.f_name + " " + mem.l_name);
                    }
                    setMemberList(tmp);
                });
        }
    }, [location.state.id]);

    return (
        <div className="group_container">
            <div className="group_leftBar">
                <div>
                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginLeft: "2%" }}
                    >
                        <KeyboardReturnIcon /> &nbsp;Back
                    </Button>
                </div>
                <List sx={{ maxHeight: "92%", overflow: "auto" }}>
                    <ListItem>
                        <ListItemText primary="My Groups" />
                    </ListItem>
                    {myGroups.map((group) => {
                        return (
                            <ListItem>
                                <ListItemButton
                                    onClick={() =>
                                        handleGroupRedirect(group.id)
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
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
            </div>
            <div className="group_feed">
                <div className="group_postList">
                    {posts.length > 0 ? (
                        posts.map((post) => {
                            return (
                                <Post
                                    author={post.author}
                                    content={post.content}
                                    comments={[]}
                                />
                            );
                        })
                    ) : (
                        <Paper className="noPostNotice" elevation={5}>
                            <div className="noPost_title">Welcome!</div>
                            <Divider />
                            <div className="noPost_content">
                                There are no recent posts in this study group.
                            </div>
                        </Paper>
                    )}
                </div>
                <div className="group_postCreate">
                    <Divider />
                    <TextField
                        multiline
                        id="createPostField"
                        placeholder="Create A Post"
                        value={postInput}
                        size="medium"
                        rows={4}
                        onChange={(e) => setPostInput(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            maxHeight: "20vh",
                            backgroundColor: "white",
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{ width: "100%" }}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <div className="group_rightBar">
                <List sx={{ maxHeight: "92%", overflow: "auto" }}>
                    <ListItem>
                        <ListItemText primary="Members" />
                    </ListItem>
                    {memberList.map((member) => {
                        return (
                            <ListItem>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </div>
    );
};

export default StudyGroup;
