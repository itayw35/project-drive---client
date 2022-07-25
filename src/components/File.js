import React, { useContext } from "react";
import "./File.css";
import { useState } from "react";
import { PopupContext } from "../context/Context";
import axios from "axios";

export default function File(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.fileName);
  const [isDetails, setIsDetails] = useState(false);
  const { currentPath } = useContext(PopupContext);
  const handleRename = function (e) {
    if (e.key === "Enter") {
      axios
        .put("http://localhost:3050/files/rename", {
          path: currentPath,
          oldName: props.fileName,
          newName: e.target.value,
        })
        .then((data) => {
          console.log(data);
          setIsRename(false);
          props.setIsRename(!props.isRename);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      {!isRename ? (
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
            <span className="file-name" onClick={() => setIsRename(true)}>
              {" "}
              {props.fileName}
            </span>
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
      ) : (
        <div className="rename-file">
          <input
            value={myValue}
            onChange={(e) => setMyValue(e.target.value)}
            onKeyDown={handleRename}
          ></input>
        </div>
      )}
    </div>
  );
}
