import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { registerUser, userLogin } from "../features/user/userActions";
import { useCookies } from "react-cookie";

export const EntryRoom = () => {
  const [cookies, setCookie] = useCookies(["userSession"]);
  const { roomInfo } = useSelector((state) => state.room);
  const { userInfo, success, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [sessionID, setSessionID] = useState("");

  const navigate = useNavigate();

  const handleCreateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datas = { userName: data.get("userName"), roomID: roomInfo.id };

    dispatch(registerUser(datas));
  };

  const joinRoom = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(userLogin(data.get("sessionID")));
    setCookie("userSession", data.get("sessionID"), {
      path: "/",
      maxAge: 86400,
    });
  };

  useEffect(() => {
    if (success) {
      //console.log(userInfo);
      alert("This is your unique session ID: " + userInfo.sessionID);
    } else {
      if (error) {
        alert(error);
      }
    }
  }, [success, error, navigate]);

  useEffect(() => {
    //console.log(userInfo);
    if (userInfo.sessionID || cookies.sessionID) {
      navigate("user");
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
        <Grid container spacing={5} sx={{ marginTop: "2rem" }}>
          <Grid item xs>
            <Box>
              <Typography component="h1" variant="h5" color="black">
                Create User for Room
              </Typography>
              <Box
                component="form"
                onSubmit={handleCreateUser}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="User name"
                  name="userName"
                  autoComplete="name"
                  autoFocus
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={userName.length === 0 ? true : false}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create User
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography component="h1" variant="h5" color="black">
                Join with your session ID
              </Typography>
              <Box
                component="form"
                onSubmit={joinRoom}
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
