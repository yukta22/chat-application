import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </>
  );
}

export default App;
