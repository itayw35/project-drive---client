import React, { useContext } from "react";
import { PopupContext } from "../context/Context";

export default function Buttons() {
  const { setClicked, setIsNewFolder, setIsNewFile } = useContext(PopupContext);
  const handlePopup = function (e) {
    setClicked(true);
    e.target.id === "new-folder" ? setIsNewFolder(true) : setIsNewFile(true);
  };
  return (
    <div>
      Buttons
      <button id="new-folder" onClick={handlePopup}>
        New Folder
      </button>
      <button id="new-file" onClick={handlePopup}>
        Upload File
      </button>
    </div>
  );
}
