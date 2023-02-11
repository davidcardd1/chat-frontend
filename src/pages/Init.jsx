import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRoom } from "../features/room/roomActions";
import { userLogin } from "../features/user/userActions";

export const Init = () => {
  const { roomInfo, error, success } = useSelector((state) => state.room);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [rName, setRName] = useState("");
  const [sessionID, setSessionID] = useState("");
  const navigate = useNavigate();

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      roomName: data.get("roomName"),
    });

    if (data.get("roomName").trim === " ") {
      alert("Name for room not valid");
    }
    dispatch(registerRoom(data.get("roomName")));
  };

  const handleJoin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(userLogin(data.get("sessionID")));
  };

  useEffect(() => {
    if (success) {
      console.log(roomInfo);
      navigate("/room/" + roomInfo.id);
    }
  });

  useEffect(() => {
    //console.log(userInfo);
    if (userInfo.sessionID) {
      navigate("room/" + userInfo.room.id + "/user");
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <Container
        sx={{
          background: "#fff",
          height: "100vh",
          width: "100vw",
          padding: "2em",
        }}
      >
        <CssBaseline />
        {error && roomInfo && alert(error)}
        <Grid container spacing={5}>
          <Grid item xs>
            <Box>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <CreateIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="black">
                Create New Chat
              </Typography>
              <Box
                component="form"
                onSubmit={handleCreate}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="roomName"
                  label="Room name"
                  name="roomName"
                  autoComplete="name"
                  autoFocus
                  value={rName}
                  onChange={(event) => {
                    setRName(event.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={rName.length === 0 ? true : false}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Room
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="black">
                Join Existing Chat
              </Typography>
              <Box
                component="form"
                onSubmit={handleJoin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="sessionID"
                  label="Unique chat session ID"
                  name="sessionID"
                  autoComplete="session ID"
                  value={sessionID}
                  onChange={(event) => {
                    setSessionID(event.target.value);
                  }}
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={sessionID.length === 0 ? true : false}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Join Room
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
