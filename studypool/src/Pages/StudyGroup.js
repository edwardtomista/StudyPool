import React, { useState } from "react";
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

const StudyGroup = () => {
  const [postInput, setPostInput] = useState("");
  let memberList = [
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
  ];
  let myGroups = [
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
  ];
  let testInfo = [
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
    "Test 1",
  ];
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
          {testInfo.map((info) => {
            return <Post info={info} />;
          })}
        </div>
        <div className="group_postCreate">
          <Divider />
          <TextField
            id="createPostField"
            label="Create A Post"
            value={postInput}
            size="medium"
            onChange={(e) => setPostInput(e.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />
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
