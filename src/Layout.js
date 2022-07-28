import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";
import { PathContext, PopupContext } from "./context/Context";

export default function Layout() {
  const [clicked, setClicked] = useState(false);
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [isNewFile, setIsNewFile] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [error, setError] = useState();
  const baseURL = "https://itay-drive.herokuapp.com";
  const secondURL = "http://localhost:3050";
  return (
    <div>
      <PopupContext.Provider
        value={{
          clicked,
          setClicked,
          isNewFolder,
          setIsNewFolder,
          isNewFile,
          setIsNewFile,
          currentPath,
          setCurrentPath,
          error,
          setError,
          baseURL,
          secondURL,
        }}
      >
        <Header />
        <Main />
        {clicked ? <Popup /> : null}
      </PopupContext.Provider>
    </div>
  );
}
