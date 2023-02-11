import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import axios from "axios";

const UsersList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const baseURL = "http://localhost:9090";
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(userInfo);
    axios
      .get(baseURL + `/${userInfo.room.id}/users`, {
        params: {
          sessionID: userInfo.sessionID,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setUsers([...Object.entries(res.data)]);
        console.log(users);
      });
  }, [userInfo]);

  const selectUser = (event) => {
    setSelectedUser(event.target.firstChild.data);
  };

  return (
    <List sx={{ height: "30vw", overflowY: "auto" }}>
      {users.length > 0 &&
        users.map((item) => (
          <ListItem button key={item} onClick={selectUser}>
            <ListItemIcon>
              <Badge badgeContent={4} color="primary">
                <MailIcon color="action" />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={item[0]}>{item[0]}</ListItemText>
            <ListItemText
              secondary={item[1] ? "online" : "offline"}
              align="end"
            ></ListItemText>
          </ListItem>
        ))}
    </List>
  );
};

export default UsersList;
