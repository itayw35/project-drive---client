import React, { useContext } from "react";
import { PopupContext } from "../context/Context";
import "./Buttons.css";
import plusIcon from "../plus-icon.png";

export default function Buttons() {
  const { setClicked, setIsNewFolder, setIsNewFile } = useContext(PopupContext);
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
    </div>
  );
}
