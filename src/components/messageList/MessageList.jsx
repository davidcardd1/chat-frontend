import { makeStyles } from "@mui/styles";
import React from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";

const MessageList = ({ user }) => {
  return user ? (
    <>
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
            <ListItemText align="left" primary={user}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="left" secondary="09:31"></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
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
