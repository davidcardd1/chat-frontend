import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetUserDetailsQuery } from "../../services/userService";
import { logout, setCredentials } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import UsersList from "../usersList/UsersList";
import MessageList from "../messageList/MessageList";
import { Box } from "@mui/system";
import SendMessage from "../sendMessage/SendMessage";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "auto",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
    height: "100%",
  },
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
});

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { userInfo } = useSelector((state) => state.user);
  const { data: userData } = useGetUserDetailsQuery(userInfo.id);

  useEffect(() => {
    if (userData) dispatch(setCredentials(userData));
  }, [userData, dispatch]);

  const onSwitchChange = (event) => {
    event.preventDefault();
    setStatus(event.target.checked);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/ ");
  };

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <div style={{ width: "90%" }}>
      <Grid container sx={{ flexDirection: "row" }}>
        <Grid item xs={6} sx={{ display: "flex" }}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleLogout}>
            <Typography variant="h5" className="header-message">
              Logout
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        className={classes.chatSection}
        sx={{ height: "auto" }}
      >
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Group Chat"
                  src="https://cdn-icons-png.flaticon.com/512/6387/6387947.png"
                />
              </ListItemIcon>
              <ListItemText
                primary={`Chat room: ${userInfo.room.name}`}
              ></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <List>
              <ListItem key="You">
                <ListItemText
                  primary={`User: ${userInfo.nickname}`}
                ></ListItemText>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status}
                        onChange={() => onSwitchChange}
                      />
                    }
                    label={status ? "online" : "offline"}
                    labelPlacement="top"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Grid>
          <Divider />
          <UsersList setSelectedUser={setSelectedUser} />
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Typography variant="h3">- {selectedUser} -</Typography>
          </Box>
          <Divider />
          <List className={classes.messageArea}>
            <MessageList user={selectedUser} />
          </List>
          <Divider />
          <SendMessage receiver={selectedUser} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
