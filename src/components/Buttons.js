import React, { useContext } from "react";
import { PopupContext } from "../context/Context";
import "./Buttons.css";
import plusIcon from "../plus-icon.png";
import { FaPaste } from "react-icons/fa6";
import axios from "axios";

export default function Buttons() {
  const { setClicked, setIsNewFolder, setIsNewFile, baseURL, secondURL, currentPath, setError, isPaste, setIsPaste} = useContext(PopupContext);
  const handlePopupFolder = function () {
    setIsNewFolder(true);
    setIsNewFile(false);
    setClicked(true);
  };
  const handlePopupFile = function () {
    setIsNewFolder(false);
    setIsNewFile(true);
    setClicked(true);
  };
  const handleError = (error) => {
    setError(
      error?.response?.data || error?.message || error || "something went wrong"
    );
    setTimeout(setError, 5000);
  };
  const handlePaste = ()=>{
    const newPath = currentPath != "" ? `${currentPath}/${sessionStorage.itemName}` : sessionStorage.itemName;
    axios
        .put(`${baseURL || secondURL}/files/copy`, {
          path: sessionStorage.copiedItem,
          newPath: newPath
        })
        .then((data) => {
          console.log(data);
          setIsPaste(false)
        })
        .catch((error) => {
          console.log(error);
          handleError(error);
        });
        sessionStorage.copiedItem = "";
  }
  return (
    <div className="buttons-flex">
      <button
        name="new-folder"
        className="button-style"
        onClick={handlePopupFolder}
      >
        <div name="new-folder">New Folder</div>
        <img name="new-folder" className="plus-icon" src={plusIcon}></img>
      </button>
      <button
        className="button-style"
        name="new-file"
        onClick={handlePopupFile}
      >
        <div name="new-file">Upload File</div>
        <img name="new-file" className="plus-icon" src={plusIcon}></img>
      </button>
      {isPaste ? <FaPaste title="paste" onClick={handlePaste}/> : null}
    </div>
  );
}
