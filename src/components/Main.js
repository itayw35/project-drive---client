import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Folders from "../pages/Folders";
import "./Main.css";
import { PopupContext } from "../context/Context";

export default function Main() {
  const { clicked } = useContext(PopupContext);
  return (
    <div
      className="overlay"
      style={clicked ? { opacity: 0.5 } : { opacity: 1 }}
    >
      Main
      <Routes>
        <Route path="/" element={<Navigate to="/folder" />} />
        <Route path="/folder" element={<Folders />} />
        <Route path="/folder/:folderName/*" element={<Folders />} />
      </Routes>
    </div>
  );
}
