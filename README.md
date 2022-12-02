# StudyPool

Study Group Website For 2022 Fall Senior Project

# Tools

Built with ReactJS, Material UI, AWS, MySQL, and ExpressJS

# How to Run on Local Server

Requires Node 16 or later and MySQL version 8.0.16 or later

Configure MySQL with the schema inside the sql directory

The API server requires the root password to be "password"

Run create.sql and insert.sql in that order

If insert.sql fails, just put "use studypool;" before the insert

./Frontend/src/links.js contains the express backend url

./Frontend/src/UserPool.js contains UserPool information for AWS Cognito

UserPool information is necessary to create an account and utilize features

UserPool should be configured to take in an email, given_name, and family_name

Cognito domain name is necessary for the sign up to work properly

Run npm install in both Frontend and Backend directories

Run npm start in the Frontend directory to start the localhost

Run npm start in the Backend directory to start the API server

Depending on the configuration of the UserPool, remember to verify your email once you sign up for an account.
