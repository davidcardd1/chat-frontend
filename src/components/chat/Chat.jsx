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
import { resetMessages } from "../../features/messages/messagesSlice";
import { resetUsers, statusChange } from "../../features/users/usersSlice";
import { userStatus } from "../../features/user/userActions";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useCookies } from "react-cookie";

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

let stompClient;
const Chat = () => {
  const [cookies, removeCookie] = useCookies(["userSession"]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");

  const { userInfo } = useSelector((state) => state.user);
  const { data: userData } = useGetUserDetailsQuery(
    userInfo.sessionID || cookies.sessionID
  );

  useEffect(() => {
    if (userData) dispatch(setCredentials(userData));
  }, [userData, dispatch]);

  useEffect(() => {
    const connect = () => {
      let Sock = new SockJS("http://localhost:9090/chat");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      stompClient.subscribe(
        "/chatroom/public/" + userInfo.room.id,
        onStatusReceived
      );
    };

    const onError = (err) => {
      console.log(err);
    };

    const onStatusReceived = (payload) => {
      let msg = JSON.parse(payload.body);
      if (msg.sender !== userInfo.nickname) {
        console.log("RECEIVED: ", msg);
      }
      dispatch(statusChange(msg));
    };

    if (stompClient == null) connect();
  }, [userInfo.nickname, dispatch]);

  const onSwitchChange = (event) => {
    setStatus(event.target.checked);
    dispatch(
      userStatus({
        status: event.target.checked,
        sessionID: userInfo.sessionID,
      })
    );
    sendStatus();
  };

  const sendStatus = () => {
    let msg = JSON.stringify({
      body: !status,
      sender: userInfo.nickname,
    });

    stompClient.send("/chatroom/public/" + userInfo.room.id, {}, msg);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetMessages());
    dispatch(resetUsers());
    removeCookie("userSession", { path: "/" });
    navigate("/ ");
  };

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <>
      {userInfo?.sessionID != null ? (
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
                    primary={`Chat room: ${userInfo.room?.name || " "}`}
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
                          <Switch checked={status} onChange={onSwitchChange} />
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
      ) : (
        <>{handleLogout()}</>
      )}
    </>
  );
};

export default Chat;
