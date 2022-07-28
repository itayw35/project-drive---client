import React, { useContext } from "react";
import "./File.css";
import { useState } from "react";
import { PopupContext } from "../context/Context";
import axios from "axios";

export default function File(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.fileName);
  const [isDetails, setIsDetails] = useState(false);
  const { currentPath, setError, baseURL, secondURL } =
    useContext(PopupContext);
  const handleError = (error) => {
    setError(
      error?.response?.data || error?.message || error || "something went wrong"
    );
    setTimeout(setError, 5000);
  };
  const handleRename = function (e) {
    console.log(e._reactName);
    if (e.key === "Enter" || e._reactName === "onBlur") {
      axios
        .put(`${baseURL || secondURL}/files/rename`, {
          path: currentPath,
          oldName: props.fileName,
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
      <div>
        <div className="single-file">
          <a href={props.link}>
            <img
              onMouseOver={() => {
                if (!isDetails) {
                  setIsDetails(true);
                }
              }}
              onMouseLeave={() => {
                if (isDetails) {
                  setIsDetails(false);
                }
              }}
              className="file-icon"
              src={props.source}
            ></img>
          </a>
          {!isRename ? (
            <span className="file-name" onClick={() => setIsRename(true)}>
              {" "}
              {props.fileName}
            </span>
          ) : (
            <div className="rename-file-container">
              <input
                autoFocus
                className="rename-file-content"
                value={myValue}
                onChange={(e) => setMyValue(e.target.value)}
                onKeyDown={handleRename}
                onBlur={handleRename}
              ></input>
            </div>
          )}
          <img
            onClick={props.delete}
            src={props.source2}
            className="trash-can-icon-file"
          ></img>
        </div>
        {isDetails ? (
          <div className="details-box">
            <div>size: {props.size}</div>
            <div>created: {props.creationDate}</div>
            <div>last modified: {props.modifyDate}</div>
            <div>last changed: {props.changeDate}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
