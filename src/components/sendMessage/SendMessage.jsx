import React from "react";
import { TextField, Grid, Fab } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";
import { addMessage } from "../../features/messages/messagesSlice";
import { addUnread } from "../../features/users/usersSlice";

let stompClient;
function SendMessage({ receiver }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [text, setText] = useState("");

  const handleText = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  const sendMessage = () => {
    let msg = JSON.stringify({
      body: text,
      sender: userInfo.sessionID,
      receiver: receiver,
      timeSent: Date.now(),
    });

    stompClient.send("/app/chat/" + receiver, {}, msg);
    dispatch(addMessage(JSON.parse(msg)));
  };

  useEffect(() => {
    const connect = () => {
      let Sock = new SockJS("http://localhost:9090/chat");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      //setUserData({ ...userData, connected: true });
      stompClient.subscribe(
        "/chatroom/public/" + userInfo.room.id,
        onStatusReceived
      );
      stompClient.subscribe(
        "/user/messages/" + userInfo.nickname,
        onPrivateMessage
      );
    };

    const onError = (err) => {
      console.log(err);
    };

    const onPrivateMessage = (payload) => {
      let msg = JSON.parse(payload.body);
      if (msg.sender !== userInfo.nickname) {
        console.log("RECEIVED: ", msg);
        dispatch(addMessage(msg));
        dispatch(addUnread(msg.sender));
      }
    };

    const onStatusReceived = (payload) => {
      let msg = JSON.parse(payload.body);
      if (msg.sender !== userInfo.nickname) {
        console.log("RECEIVED: ", msg);
      }
    };

    if (stompClient == null) connect();
  }, [receiver, userInfo.nickname, dispatch]);

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          onChange={handleText}
        />
      </Grid>
      <Grid item xs={1} align="right">
        <Fab color="primary" aria-label="add" onClick={() => sendMessage()}>
          <Send />
        </Fab>
      </Grid>
    </Grid>
  );
}

export default SendMessage;
