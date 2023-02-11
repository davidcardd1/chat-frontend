import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ListItem, ListItemText } from "@mui/material";

export default function UsersList() {
  const baseURL = "http://localhost:9090";
  const [users, setUsers] = useState({});
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
        console.log(res.data);
        setUsers(res.data);
        console.log(users);
      });
  }, [userInfo]);

  const printUsers = () => {
    Object.keys(users).forEach((key) => {
      console.log(key, users[key]);
      <ListItem button key={key}>
        <ListItemText primary={`${key}`}>key</ListItemText>
        <ListItemText
          secondary={users[key] ? "online" : "offline"}
          align="right"
        ></ListItemText>
      </ListItem>;
    });
  };

  return <div>{printUsers()}</div>;
}
