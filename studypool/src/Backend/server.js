const express = require("express"); 
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "studypool",
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('Successfully Connected!')
})

app.get('/users', (req, res)=>{
    connection.query("SELECT * FROM user", 
    function(err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("User info is: ", rows);
            res.send(rows);
        };
    });
});

app.post("/signup", (req,res)=>{
    const user = req.body;
    console.log(user);
    connection.query("INSERT IGNORE INTO user (id, email, f_name, l_name) VALUES (?, ?, ?, ?)", [user.id, user.email, user.f_name, user.l_name],
    function(err, rows, fields) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(rows);
            console.log(user);
        };
    });
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})