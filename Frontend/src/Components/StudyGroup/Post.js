import React, { useEffect, useState } from "react";
import "./Post.css";
import Paper from "@mui/material/Paper";
import { Divider, TextField, Button } from "@mui/material";
import Comment from "./Comment.js";
import { backend_url } from "../../links";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
    /** props:
     *  author, content, postid, postdate
     */
    const [isReplyOpen, setReplyOpen] = useState(false);
    const [isCommentsOpen, setCommentsOpen] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
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
                        date: comm.comment_date,
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
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    //this refreshes the page to fetch comment data again
                    //doing this to fix wrong names on comments in deployment
                    navigate(0);
                });
            setCommentInput("");
            setReplyOpen(false);
            // setComments([
            //     {
            //         author: props.author,
            //         content: commentInput,
            //         date: new Date()
            //     },
            //     ...comments,
            // ]);
        }
    };
    const convertDate = (pdate) => {
        if (pdate instanceof Date) {
            return pdate;
        }
        let t = pdate.split(/[- :]/);
        //2022,11,27T02,47,58.000Z
        let b = new Date(
            Date.UTC(
                t[0],
                t[1] - 1,
                t[2].substring(0, 2),
                t[2].substring(3),
                t[3],
                t[4].substring(0, 2)
            )
        );
        return b;
    };

    const relativeTimePeriods = [
        [31536000, "year"],
        [2419200, "month"],
        [604800, "week"],
        [86400, "day"],
        [3600, "hour"],
        [60, "minute"],
        [1, "second"],
    ];

    function relativeTime(date, isUtc = true) {
        if (!(date instanceof Date)) date = new Date(date * 1000);
        const seconds = (new Date() - date) / 1000;
        for (let [secondsPer, name] of relativeTimePeriods) {
            if (seconds >= secondsPer) {
                const amount = Math.floor(seconds / secondsPer);
                return `${amount} ${name}${amount > 1 ? "s" : ""} ago`;
            }
        }
        return "Just now";
    }

    return (
        <div>
            <Paper className="post" elevation="5">
                <div className="post_author">
                    {props.author}
                    <em>{" " + relativeTime(convertDate(props.postdate))}</em>
                </div>
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
                                date={comment.date}
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
