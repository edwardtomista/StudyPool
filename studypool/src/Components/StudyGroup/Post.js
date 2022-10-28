import React, { useState } from "react";
import "./Post.css";
import Paper from "@mui/material/Paper";
import { Divider, TextField, Button } from "@mui/material";
import Comment from "./Comment.js";

const Post = (props) => {
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(props.comments);

  const handleComment = () => {
    if (commentInput) {
      setComments([
        {
          author: "John Doe",
          content: commentInput,
        },
        ...comments,
      ]);
      setCommentInput("");
      setReplyOpen(false);
      console.log(comments);
    }
  };

  return (
    <div>
      <Paper className="post" elevation="5">
        <div className="post_author">{props.author}</div>
        <Divider />
        <div className="post_content">{props.content}</div>
        <Divider />
        <Button
          variant="text"
          onClick={() => setReplyOpen(!isReplyOpen)}
          sx={{ textAlign: "left", marginLeft: "-7px", marginBottom: "-10px" }}
        >
          Reply
        </Button>
        <Button
          variant="text"
          onClick={() => setCommentsOpen(!isCommentsOpen)}
          sx={{ textAlign: "left", marginLeft: "-7px", marginBottom: "-10px" }}
        >
          Show Comments ({comments.length})
        </Button>
        {isReplyOpen ? (
          <div className="reply_container">
            <TextField
              multiline
              id="createPostField"
              placeholder="Reply to this post"
              value={commentInput}
              size="medium"
              rows={4}
              onChange={(e) => setCommentInput(e.target.value)}
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
                handleComment();
              }}
            >
              Comment
            </Button>
          </div>
        ) : (
          <></>
        )}
        {isCommentsOpen ? (
          <div className="comments_container">
            {comments.map((comment) => (
              <Comment author={comment.author} content={comment.content} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
};

export default Post;
