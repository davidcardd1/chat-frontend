import { List, ListItem } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Chat from "../components/chat/Chat";
import { useGetRoomDetailsQuery } from "../features/room/roomService";
import { setRoomCredentials } from "../features/room/roomSlice";
import { EntryRoom } from "./EntryRoom";
import { NotFound } from "./NotFound";

export const Room = () => {
  const params = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const { roomInfo } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const { data } = useGetRoomDetailsQuery(params.roomID);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) dispatch(setRoomCredentials(data));
  }, [data, dispatch]);

  const Enter = () => {
    navigate("user");
  };

  return (
    <div>
      {roomInfo.name ? (
        <div>
          <h1>Room : {roomInfo.name}</h1>
          {userInfo.sessionID ? <Enter /> : <EntryRoom />}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
