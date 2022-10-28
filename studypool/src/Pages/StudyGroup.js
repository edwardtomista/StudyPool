import React, { useState, useEffect } from "react";
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

const StudyGroup = () => {
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [memberList, setMemberList] = useState([
    "Alan",
    "Edward",
    "Josh",
    "Junyu",
    "Alan",
    "Edward",
    "Josh",
    "Junyu",
    "Alan",
    "Edward",
    "Josh",
    "Junyu",
  ]);
  const [myGroups, setMyGroups] = useState([
    "Procrastination Classroom",
    "Our Last Hope",
    "Pain",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
    "Procrastination Classroom",
  ]);
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

  return (
    <div className="group_container">
      <div className="group_leftBar">
        <div>
          <Button variant="text" color="primary" style={{ marginLeft: "2%" }}>
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
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={group} secondary="Course Name" />
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
            <Paper className="noPostNotice" elevation="5">
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
