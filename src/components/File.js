import React, { useContext } from "react";
import "./File.css";
import { useState } from "react";
import { PopupContext } from "../context/Context";
import axios from "axios";
import { FaCopy } from "react-icons/fa6";

export default function File(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.fileName.slice(0, -4));
  // const [isDetails, setIsDetails] = useState(false);
  const { currentPath, setError, baseURL, secondURL, setIsPaste } =
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
        .put(`${baseURL || secondURL}/files/rename`, {
          path: currentPath,
          oldName: props.fileName,
          newName:
            e.target.value +
            props.fileName.slice(props.fileName.lastIndexOf(".")),
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
    sessionStorage.copiedItem = currentPath != "" ? `${currentPath}/${props.fileName}` : props.fileName;
    sessionStorage.itemName = props.fileName;
    setIsPaste(true)
  }
  return (
    <div>
      <div>
        <div className="single-file">
          <a href={props.link}>
            <img
              // onMouseOver={() => {
              //   if (!isDetails) {
              //     setIsDetails(true);
              //   }
              // }}
              // onMouseLeave={() => {
              //   if (isDetails) {
              //     setIsDetails(false);
              //   }
              // }}
              className="file-icon"
              src={props.source}
            ></img>
          </a>
          {!isRename ? (
            <span
              className="file-name"
              onClick={() => {
                setIsRename(true);
                setMyValue(
                  props.fileName.slice(0, props.fileName.lastIndexOf("."))
                );
              }}
            >
              {" "}
              <abbr
                title={`size: ${props.size}\ncreated: ${props.creationDate}\nlast modified: ${props.modifyDate}\nlast changed: ${props.changeDate}`}
              >
                {props.fileName}{" "}
              </abbr>
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
          <div id="file-actions">
            <img
              onClick={props.delete}
              src={props.source2}
              className="trash-can-icon-file"
              title="delete"
            ></img>
            <FaCopy onClick={handleCopy} title="copy" />
          </div>
        </div>
        {/* {isDetails ? (
          <div className="details-box">
            <div>size: {props.size}</div>
            <div>created: {props.creationDate}</div>
            <div>last modified: {props.modifyDate}</div>
            <div>last changed: {props.changeDate}</div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
