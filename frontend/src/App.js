import React from "react";

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

const App = () => {
  const auth = useSelector((state) => state?.auth?.data);
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
            <Route path="test" element={<Test />} />
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
