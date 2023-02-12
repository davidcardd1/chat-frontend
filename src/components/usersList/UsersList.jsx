import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../../features/users/usersSlice";
import { useGetUsersQuery } from "../../services/userService";

const UsersList = ({ setSelectedUser }) => {
  const baseURL = "http://localhost:9090";
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { users, status } = useSelector((state) => state.users);

  const { data: usersData } = useGetUsersQuery({
    roomID: userInfo.room.id,
    sessionID: userInfo.sessionID,
  });

  useEffect(() => {
    // console.log(userInfo);
    // axios
    //   .get(baseURL + `/${userInfo.room.id}/users`, {
    //     params: {
    //       sessionID: userInfo.sessionID,
    //     },
    //   })
    //   .then((res) => {
    //     //console.log(res.data);
    //     setUsers([...Object.entries(res.data)]);
    //   });
    if (usersData) dispatch(setUsers([...Object.entries(usersData)]));
  }, [dispatch, usersData]);

  const selectUser = (event) => {
    event.preventDefault();
    if (
      event.target.firstChild.data !== "online" &&
      event.target.firstChild.data !== "offline"
    ) {
      setSelectedUser(event.target.firstChild.data);
    }
  };

  return (
    <List sx={{ height: "30vw", overflowY: "auto" }}>
      {users.length > 0 &&
        users.map((item) => (
          <ListItem button key={item} onClick={selectUser}>
            <ListItemIcon>
              <Badge badgeContent={item[2]} color="primary">
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
