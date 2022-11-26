import React, { useEffect, useState } from "react";
import "./Post.css";
import Paper from "@mui/material/Paper";
import { Divider, TextField, Button } from "@mui/material";
import Comment from "./Comment.js";
import { backend_url } from "../../links";

const Post = (props) => {
    /** props:
     *  author, content, postid, postdate
     */
    const [isReplyOpen, setReplyOpen] = useState(false);
    const [isCommentsOpen, setCommentsOpen] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);

    //This will fetch all comments on render
    useEffect(() => {
        //takes pid = postId
        fetch(backend_url + "/getComments?pid=" + props.postid, {
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
                //f_name,l_name, comment_date, content
                for (let comm of data) {
                    tmp.push({
                        author: comm.f_name + " " + comm.l_name,
                        content: comm.content,
                    });
                }
                setComments(tmp);
            });
        //each comment = {author, content, comment_date}
    }, []);

    const handleComment = () => {
        if (commentInput) {
            //post request to create the comment in db
            //createComment takes: data.post_id, data.user_id, data.content
            fetch(backend_url + "/createComment", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    post_id: props.postid,
                    user_id: props.userId,
                    content: commentInput,
                }),
            });
            setComments([
                {
                    author: props.author,
                    content: commentInput,
                },
                ...comments,
            ]);
            setCommentInput("");
            setReplyOpen(false);
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
                    sx={{
                        textAlign: "left",
                        marginLeft: "-7px",
                        marginBottom: "-10px",
                    }}
                >
                    Reply
                </Button>
                <Button
                    variant="text"
                    onClick={() => setCommentsOpen(!isCommentsOpen)}
                    sx={{
                        textAlign: "left",
                        marginLeft: "-7px",
                        marginBottom: "-10px",
                    }}
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
                            <Comment
                                author={comment.author}
                                content={comment.content}
                            />
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
