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
    const [gTitle, setGTitle] = useState("");
    const [postInput, setPostInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [memberList, setMemberList] = useState([]); //Takes strings of member names
    const [myGroups, setMyGroups] = useState([]); //Currently takes strings, will have to change it
    const handleSubmit = () => {
        if (postInput) {
            fetch(backend_url + "/createPost", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    group_id: location.state.id,
                    content: postInput,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((postId) => {
                    setPosts([
                        {
                            author: user.fname + " " + user.lname,
                            content: postInput,
                            postId: postId,
                        },
                        ...posts,
                    ]);
                });

            setPostInput("");
        }
    };

    const handleGroupRedirect = (gid) => {
        navigate("/StudyGroup", { state: { id: gid } });
        navigate(0);
    };
    //On page render, fetch all user groups and members of the study group
    //and fetch all posts
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
            fetch(backend_url + "/studyGroupInfo?gid=" + location.state.id, {
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
                    setGTitle(data[0].title);
                });
            //This will get all of the posts for this group
            fetch(backend_url + "/getPosts?gid=" + location.state.id, {
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
                    for (let pinfo of data) {
                        tmp.push({
                            author: pinfo.f_name + " " + pinfo.l_name,
                            content: pinfo.content,
                            postid: pinfo.id,
                            postdate: pinfo.post_date,
                        });
                    }
                    setPosts(tmp);
                });
        }
    }, [location.state?.id]);

    return (
        <div className="group_container">
            <div className="group_leftBar">
                <div>
                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginLeft: "2%" }}
                        onClick={() => navigate(-1)}
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
                                    postid={post.postid}
                                    postdate={post.postdate}
                                    userId={user.id}
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
                <List
                    sx={{
                        maxHeight: "92%",
                        overflow: "auto",
                    }}
                >
                    <ListItem sx={{ marginBottom: "-20px" }}>
                        <ListItemText
                            primary={gTitle}
                            primaryTypographyProps={{ fontSize: "20px" }}
                        />
                    </ListItem>
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
