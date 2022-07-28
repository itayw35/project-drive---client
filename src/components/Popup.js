import React, { useContext, useRef } from "react";
import axios from "axios";
import "./Popup.css";
import { PopupContext } from "../context/Context";
// import { AiOutlineCloudUpload } from "react-icons/ai";

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
    setError,
    baseURL,
    secondURL,
  } = useContext(PopupContext);
  const handleError = (error) => {
    setError(
      error?.response?.data || error?.message || error || "something went wrong"
    );
    setTimeout(setError, 5000);
  };
  const createFolder = function () {
    axios
      .post(`${baseURL || secondURL}/folders/create`, {
        folderName: `${currentPath}/${folderName.current.value}`,
      })
      .then((data) => {
        console.log(data);
        setClicked(false);
        setIsNewFolder(false);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      });
  };
  const createFile = function () {
    const formData = new FormData();
    formData.append("myFile", newFile.current.files[0]);
    setIsNewFile(false);
    axios
      .post(`${baseURL}/files/upload?path=${currentPath}`, formData)
      .then((data) => {
        console.log(data);
        setClicked(false);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
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
              <input className="upload-input" ref={newFile} type="file"></input>
              {/* <AiOutlineCloudUpload onClick={newFile?.current?.click()} /> */}
            </div>
            <div>
              <button className="popup-button-style" onClick={createFile}>
                {" "}
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
