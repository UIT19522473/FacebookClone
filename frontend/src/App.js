import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LayOut from "./components/LayOut";
import Watch from "./pages/Watch";
import Group from "./pages/Group";
import Game from "./pages/Game";
import Login from "./pages/Login";

import Test from "./pages/Test";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";

import io from "socket.io-client";
import TestCall from "./pages/TestCall";

const socket = io(process.env.REACT_APP_URL_SERVER);

const App = () => {
  const auth = useSelector((state) => state?.auth?.data);

  useEffect(() => {
    // console.log("hello");
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server:", socket.id);
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="test" element={<ModalRegister />} /> */}

        {auth ? (
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="watch" element={<Watch />} />
            <Route path="group" element={<Group />} />
            <Route path="game" element={<Game />} />
            <Route path="profile" element={<Profile />} />
            <Route path="test" element={<Test />} />
            <Route path="test-call" element={<TestCall />} />
            <Route path="*" element={<NotFound />} />

          </Route>
        ) : (
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
