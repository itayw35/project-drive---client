import React, { useContext, useRef } from "react";
import axios from "axios";
import "./Popup.css";
import { PathContext, PopupContext } from "../context/Context";

export default function Popup() {
  const folderName = useRef();
  const newFile = useRef();
  const {
    setClicked,
    isNewFolder,
    setIsNewFolder,
    isNewFile,
    setIsNewFile,
    currentPath,
  } = useContext(PopupContext);
  const createFolder = function () {
    setClicked(false);
    setIsNewFolder(false);
    console.log(currentPath);
    axios
      .post("http://localhost:3050/folders/create", {
        folderName: `${currentPath}/${folderName.current.value}`,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const createFile = function () {
    const formData = new FormData();
    formData.append("myFile", newFile.current.files[0]);
    setIsNewFile(false);
    axios
      .post(`http://localhost:3050/files/upload?path=${currentPath}`, formData)
      .then((data) => {
        console.log(data);
        setClicked(false);
      })
      .catch((error) => console.log(error));
  };
  const handleClosing = function () {
    setClicked(false);
    setIsNewFolder(false);
    setIsNewFile(false);
  };
  return (
    <div className="popup">
      {isNewFolder ? (
        <div>
          <label>New Folder:</label>
          <input ref={folderName} placeholder="un-named folder"></input>
          <button onClick={createFolder}>New</button>
        </div>
      ) : isNewFile ? (
        <div>
          <input ref={newFile} type="file"></input>
          <button onClick={createFile}>New</button>
        </div>
      ) : null}
      <button onClick={handleClosing}>Cancel</button>
    </div>
  );
}
