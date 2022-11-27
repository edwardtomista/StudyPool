import React, { useState } from "react";
import "./Comment.css";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

const Comment = (props) => {
    const convertDate = (date) => {
        if (date instanceof Date) {
            return date;
        }
        let t = date.split(/[- :]/);
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
        <Paper variant="elevation" elevation="5" className="comment">
            <div className="comment_author">
                {props.author}
                <em>{" " + relativeTime(convertDate(props.date))}</em>
            </div>
            <Divider />
            <div className="comment_content">{props.content}</div>
        </Paper>
    );
};

export default Comment;
