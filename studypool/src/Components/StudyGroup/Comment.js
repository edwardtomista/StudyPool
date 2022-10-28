import React, { useState } from "react";
import "./Comment.css";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

const Comment = (props) => {
  return (
    <Paper variant="elevation" elevation="5" className="comment">
      <div className="comment_author">{props.author}</div>
      <Divider />
      <div className="comment_content">{props.content}</div>
    </Paper>
  );
};

export default Comment;
