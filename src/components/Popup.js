import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Popup.css";
import { PopupContext } from "../context/Context";

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
  const [message, setMessage] = useState();
  const createFolder = function () {
    setClicked(false);
    setIsNewFolder(false);
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
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClosing = function () {
    setClicked(false);
    if (isNewFile) setIsNewFile(false);
    else setIsNewFolder(false);
  };
  return (
    <div className="popup">
      {isNewFolder ? (
        <div className="new-folder-container">
          <div className="new-folder-content">
            <div>
              <label>New Folder:</label>
              <input
                className="popup-input"
                ref={folderName}
                placeholder="un-named folder"
              ></input>
            </div>
            <div>
              <button className="popup-button-style" onClick={createFolder}>
                New
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="new-file-container">
          <div className="new-file-content">
            <div>
              <input ref={newFile} type="file"></input>
            </div>
            <div>
              <button className="popup-button-style" onClick={createFile}>
                New
              </button>
            </div>
          </div>
        </div>
      )}
      <button className="popup-button-style" onClick={handleClosing}>
        Cancel
      </button>
    </div>
  );
}