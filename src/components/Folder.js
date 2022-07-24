import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./Folder.css";
import axios from "axios";
import { PopupContext } from "../context/Context";
export default function Folder(props) {
  const [isRename, setIsRename] = useState(false);
  const [myValue, setMyValue] = useState(props.folderName);
  const { currentPath } = useContext(PopupContext);
  const handleRename = function (e) {
    if (e.key === "Enter") {
      axios
        .put("http://localhost:3050/folders/rename", {
          path: currentPath,
          oldName: props.folderName,
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
  // const { folderName } = useParams();
  return (
    <div>
      {!isRename ? (
        <div>
          <img
            onDoubleClick={props.navigate}
            className="folder-icon"
            src={props.source}
          ></img>
          <span onClick={() => setIsRename(true)}> {props.folderName}</span>
          <img
            onClick={props.delete}
            src={props.source2}
            className="trash-can-icon"
          ></img>
        </div>
      ) : (
        <input
          value={myValue}
          onChange={(e) => setMyValue(e.target.value)}
          onKeyDown={handleRename}
        ></input>
      )}
    </div>
  );
}
