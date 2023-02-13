import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../services/userService";
import { setMessages } from "../../features/messages/messagesSlice";
import {
  Grid,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import { useRef } from "react";
import { resetUnreads } from "../../features/users/usersSlice";

const MessageList = ({ user }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.messages);
  const { data: messagesData } = useGetMessagesQuery({
    user: user,
    sessionID: userInfo.sessionID,
  });

  const scrollBottomRef = useRef(null);

  const scrollToBottom = () => {
    scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    dispatch(resetUnreads(user));
  }, [user, messages, dispatch]);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:9090/messages/${user}`, {
    //     params: { sessionID: userInfo.sessionID },
    //   })
    //   .then((res) => {
    //     dispatch(setMessages(res.data));
    //   });
    if (messagesData) dispatch(setMessages(messagesData));
  }, [dispatch, messagesData]);

  return user ? (
    <>
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <ListItem key={message.timeSent} xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align={
                      message.sender === userInfo.nickname ||
                      message.sender === userInfo.sessionID
                        ? "right"
                        : "left"
                    }
                    primary={message.body}
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    align={
                      message.sender === userInfo.nickname ||
                      message.sender === userInfo.sessionID
                        ? "right"
                        : "left"
                    }
                    secondary={
                      new Date(message.timeSent).getHours() +
                      ":" +
                      new Date(message.timeSent).getMinutes()
                    }
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <div ref={scrollBottomRef} />
        </>
      ) : (
        <Container
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">No messages...</Typography>
        </Container>
      )}
    </>
  ) : (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Select user...</Typography>
    </Container>
  );
};

export default MessageList;
