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
    database : "user_db",
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

app.post("/id", (req,res)=>{
    const user = req.body.email;
    console.log(user);
    connection.query("INSERT INTO user (email) VALUES (?)", [user],
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