const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createPool({
    host: "studypool.cpqx7rt8igho.us-west-2.rds.amazonaws.com",
    user: "root",
    password: "password",
    database: "studypool",
    port: 3306,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.send("Successfully Connected!");
});

app.get("/getAllUsers", (req, res) => {
    connection.query("SELECT * FROM user", function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("User info is: ", rows);
            res.send(rows);
        }
    });
});

//Used to display groups in account page.
app.get("/getAccountInfo", (req, res) => {
    const id = req.query.id;
    connection.query(
        "SELECT DISTINCT title, subject, course_code, usergroup.id FROM (usergroup join course on usergroup.course_id=course.id join studygroup on usergroup.id=studygroup.id) where user_id=?",
        [id],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        }
    );
});

app.post("/signup", (req, res) => {
    const user = req.body;
    console.log(user);
    connection.query(
        "INSERT IGNORE INTO user (id, email, f_name, l_name) VALUES (?, ?, ?, ?)",
        [user.id, user.email, user.f_name, user.l_name],
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
                console.log(user);
            }
        }
    );
});

//Used in /groups to create a new group
app.post("/createGroup", (req, res) => {
    const data = req.body;
    connection.query(
        "INSERT IGNORE INTO studygroup (course_id, title, subject, creator_id, creator_name) VALUES (?, ?, ?, ?, ?)",
        [
            Number(data.course_id),
            data.title,
            data.subject,
            data.creator_id,
            data.creator_name,
        ],
        function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.send(String(rows.insertId));
            }
        }
    );
});

//Used in /Groups to join a group
app.post("/joinGroup", (req, res) => {
    const data = req.body;
    connection.query(
        "INSERT IGNORE INTO usergroup (id, user_id, course_id) VALUES (?, ?, ?)",
        [data.id, data.user_id, Number(data.course_id)],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                //console.log(results);
            }
        }
    );
});

//Used in /Groups, /Account, and /Studygroup to leave a group
app.post("/leaveGroup", (req, res) => {
    const data = req.body;
    connection.query(
        "DELETE FROM usergroup WHERE id=? and user_id=?",
        [data.id, data.user_id],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                //console.log(results)
            }
        }
    );
    //This is to delete the entire group from the db if the user is the creator of the table
    connection.query(
        "DELETE FROM studygroup WHERE id=? and creator_id=?",
        [data.id, data.user_id, data.id],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                //If we are deleting the group, delete all entries from usergroup of that group
                connection.query(
                    "DELETE FROM usergroup WHERE id=?",
                    [data.id],
                    function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                        }
                    }
                );
            }
        }
    );
});

//Displays all study groups in /Groups corresponding to a course
app.get("/getGroups", (req, res) => {
    const cid = req.query.cid;
    connection.query(
        "SELECT * FROM studygroup where course_id = ?",
        [cid],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log("Results are: ", data);
                res.send(data);
            }
        }
    );
});

//Gets all user groups, used in /Groups to determine status of Join/Leave buttons
app.get("/getUserGroups", (req, res) => {
    const id = req.query.id;
    const cid = req.query.cid;
    connection.query(
        "SELECT DISTINCT * FROM usergroup where user_id = ? and course_id = ?",
        [id, cid],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log("Results are: ", data);
                res.send(data);
            }
        }
    );
});

//Gets all courses to display in /Catalog
app.get("/getCourses", (req, res) => {
    const start = Number(req.query.start);
    const rowsPerPage = Number(req.query.rowsPerPage);
    let sqlquery = "SELECT * FROM course ";
    if (req.query.search) {
        sqlquery += "where course_name like '%" + req.query.search + "%' ";
    }
    if (req.query.courseCode) {
        sqlquery +=
            " order by course_code " + req.query.courseCode + " LIMIT ?,?";
    } else if (req.query.courseName) {
        sqlquery +=
            " order by course_name " + req.query.courseName + " LIMIT ?,?";
    } else {
        sqlquery += "order by course_name LIMIT ?,?";
    }

    connection.query(sqlquery, [start, rowsPerPage], function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

//Used in /Catalog for pagination number
app.get("/courseCount", (req, res) => {
    let sqlquery = "SELECT count(*) FROM course ";
    if (req.query.search) {
        sqlquery += "where course_name like '%" + req.query.search + "%' ";
    }

    connection.query(sqlquery, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

/**
 * Stuff before will be used exclusively on each studygroup page
 */
app.get("/studyGroupInfo", (req, res) => {
    const gid = req.query.gid;
    connection.query(
        "select f_name, l_name, title from (user join usergroup on user.id=usergroup.user_id join studygroup on usergroup.id=studygroup.id) where usergroup.id=?",
        [gid],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        }
    );
});

app.post("/createPost", (req, res) => {
    const data = req.body;
    connection.query(
        "INSERT IGNORE INTO userpost (user_id, group_id, post_date, content) VALUES (?,?,NOW(),?)",
        [data.user_id, data.group_id, data.content],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send(String(results.insertId));
            }
        }
    );
});

app.get("/getPosts", (req, res) => {
    const gid = Number(req.query.gid);
    connection.query(
        "select f_name, l_name, post_date, content, userpost.id from (userpost join user on user.id=userpost.user_id) where group_id=? order by post_date desc",
        [gid],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        }
    );
});

app.post("/createComment", (req, res) => {
    const data = req.body;
    connection.query(
        "INSERT IGNORE INTO comment (post_id, user_id, comment_date, content) VALUES (?,?,now(),?)",
        [data.post_id, data.user_id, data.content],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send("{}");
            }
        }
    );
});

app.get("/getComments", (req, res) => {
    const pid = Number(req.query.pid);
    connection.query(
        "select * from (comment join user on comment.user_id=user.id) where post_id=? order by comment_date desc",
        [pid],
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Connect at Port:${port}`);
});
