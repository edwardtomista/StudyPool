import React, { useState } from "react";
import "./Post.css";
import Paper from "@mui/material/Paper";
import { Divider, Button } from "@mui/material";
const Post = (props) => {
  let numOfComments = 10;
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  return (
    <div>
      <Paper className="post">
        <div className="post_author">Alan Ngo</div>
        <Divider />
        <div className="post_content">
          Hey guys! Did the professor say we could use notes for the test or is
          the test closed notes?
        </div>
        <Divider />
        <Button
          className="post_comments"
          variant="text"
          onClick={() => setPopoverOpen(true)}
        >
          Comments ({numOfComments})
        </Button>
      </Paper>
      {isPopoverOpen ? <></> : <></>}
    </div>
  );
};

export default Post;
