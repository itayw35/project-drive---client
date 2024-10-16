import React, { useContext } from "react";
import { json, useParams } from "react-router-dom";
import { useState } from "react";
import "./Folder.css";
import axios from "axios";
import { PopupContext } from "../context/Context";
import { FaCopy } from "react-icons/fa6";

export default function Folder(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.folderName);
  const { currentPath, setError, baseURL, secondURL, setIsPaste} =
    useContext(PopupContext);
  const handleError = (error) => {
    setError(
      error?.response?.data || error?.message || error || "something went wrong"
    );
    setTimeout(setError, 5000);
  };
  const handleRename = function (e) {
    if (e.key === "Enter" || e._reactName === "onBlur") {
      axios
        .put(`${baseURL || secondURL}/folders/rename`, {
          path: currentPath,
          oldName: props.folderName,
          newName: e.target.value,
        })
        .then((data) => {
          console.log(data);
          setIsRename(false);
          props.setIsRename(!props.isRename);
        })
        .catch((error) => {
          console.log(error);
          handleError(error);
        });
    }
  };
  const handleCopy = ()=>{
    sessionStorage.copiedItem = JSON.stringify({path : currentPath != "" ? `${currentPath}/${props.folderName}` : props.folderName, itemName : props.folderName, itemType : "folder"});
    setIsPaste(true)
  }
  return (
    <div>
      <div className="single-folder">
        <img
          onDoubleClick={props.navigate}
          className="folder-icon"
          src={props.source}
        ></img>
        {!isRename ? (
          <span onClick={() => setIsRename(true)}> {props.folderName}</span>
        ) : (
          <input
            autoFocus
            value={myValue}
            onChange={(e) => setMyValue(e.target.value)}
            onKeyDown={handleRename}
            onBlur={handleRename}
          ></input>
        )}
        <img
          onClick={props.delete}
          src={props.source2}
          className="trash-can-icon-folder"
          title="delete"
        ></img>
        <FaCopy onClick={handleCopy} title="copy" />
      </div>
    </div>
  );
}
