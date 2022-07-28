import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./Folder.css";
import axios from "axios";
import { PopupContext } from "../context/Context";
export default function Folder(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.folderName);
  const { currentPath, setError, baseURL, secondURL } =
    useContext(PopupContext);
  const handleError = (error) => {
    setError(
      error?.response?.data || error?.message || error || "something went wrong"
    );
    setTimeout(setError, 5000);
  };
  const handleRename = function (e) {
    if (e.key === "Enter") {
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
          ></input>
        )}
        <img
          onClick={props.delete}
          src={props.source2}
          className="trash-can-icon-folder"
        ></img>
      </div>
    </div>
  );
}
