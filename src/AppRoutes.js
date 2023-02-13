import React from "react";
import { Route, Routes } from "react-router-dom";
import { Init } from "./pages/Init";
import { NotFound } from "./pages/NotFound";
import { Room } from "./pages/Room";
import Chat from "./components/chat/Chat";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"*"} element={<NotFound />} />
      <Route path={"/"} element={<Init />} />
      <Route path={"/room/:roomID"} element={<Room />} />
      <Route path={"/room/:roomID/user"} element={<Chat />} />
      <Route path={"/test"} element={<Chat />} />
    </Routes>
  );
};
