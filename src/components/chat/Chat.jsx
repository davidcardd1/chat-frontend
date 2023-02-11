import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Grid,
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetUserDetailsQuery } from "../../features/user/userService";
import { logout, setCredentials } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import UsersList from "../usersList/UsersList";

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
    height: "70vh",
    overflowY: "auto",
  },
});

let stompClient = null;

const Chat = () => {
  const classes = useStyles();

  const [status, setStatus] = useState(false);

  const { roomInfo } = useSelector((state) => state.room);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data } = useGetUserDetailsQuery(userInfo.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
    console.log(data, userInfo);
  }, [data, dispatch]);

  const onSwitchChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/ ");
  };

  return (
    <div style={{ width: "90%" }}>
      <Grid container sx={{ flexDirection: "row" }}>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
                        defaultChecked
                        checked={status}
                        onChange={onSwitchChange}
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
          <List sx={{ height: "60vh", overflowY: "scroll" }}>
            <UsersList />
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
