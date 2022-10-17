import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

function createData(courceName, groupName) {
  return { courceName, groupName};
}

const user = ["John", "Doe", "johndoe@gmail.com"]

const groups = [
  createData('CS 46A', 'CS 46A fall 2022'),
  createData('ENGR 10', 'Engineering intro group'),
  createData('MATH 30', 'Math?'),
  createData('ENGL 1A', 'ENGLISH!!'),
];

export default function Account() {
  return (
    <div className="tables">
      <h1>Account Info</h1>
      <Container component={Paper} sx={{marginBottom: '50px'}}>
      <List sx={{ minWidth: 500}}>

        <ListItem>
          <Typography sx={{
              fontSize: 15,
              marginTop: "1%",
              width: '100px'
          }}>
              First Name:
          </Typography>
          <Typography sx={{
              marginLeft: "5%",
              fontSize: 15,
              marginTop: "1%"
          }}>
              {user[0]}
          </Typography>

        </ListItem>

        <ListItem>
          <Typography sx={{
              fontSize: 15,
              marginTop: "1%",
              width: '100px'
          }}>
              Last Name:
          </Typography>
          <Typography sx={{
              marginLeft: "5%",
              fontSize: 15,
              marginTop: "1%"
          }}>
              {user[1]}
          </Typography>

        </ListItem>

        <ListItem>
          <Typography sx={{
              fontSize: 15,
              marginTop: "1%",
              width: '100px'
          }}>
              Email:
          </Typography>
          <Typography sx={{
              marginLeft: "5%",
              fontSize: 15,
              marginTop: "1%"
          }}>
              {user[2]}
          </Typography>

        </ListItem>

        </List>
      </Container>
      <h1>My Group</h1>
      <Container component={Paper}>
        <List sx={{ minWidth: 500}}>
          {
            groups.map(function(group) {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={group.groupName} secondary={group.courceName}/>
              </ListItem>
              )
            })
          } 
        </List>
      </Container>
    </div>
  );
}