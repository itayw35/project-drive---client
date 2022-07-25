import React, { useContext } from "react";
import Buttons from "../components/Buttons";
import axios from "axios";
import { useState, useEffect } from "react";
import Folder from "../components/Folder";
import File from "../components/File";
import { PopupContext } from "../context/Context";
import docx from "../word-icon.png";
import pdf from "../pdf-icon.jpeg";
import pages from "../pages icon.jpeg";
import txt from "../txt-icon.png";
import folderIcon from "../folder-icon.png";
import trashCanIcon from "../trash-can-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Folders.css";
export default function Folders() {
  const { clicked, setCurrentPath } = useContext(PopupContext);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [isRename, setIsRename] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    axios
      .get(
        `http://localhost:3050/folders/get?folderName=${location.pathname.slice(
          8
        )}`
      )
      .then((data) => {
        console.log(data.data);
        setFolders(data.data.folders);
        setFiles(data.data.files);
      })
      .catch((error) => console.log(error));
  }, [clicked, count, isRename, location.state]);
  useEffect(() => {
    setCurrentPath(location.pathname.slice(8));
  }, [count, location.state]);
  const handleNavigate = function (folder) {
    navigate(
      `${location.pathname}/${folder.slice(folder.lastIndexOf("/") + 1)}`
    );
    setCount((prevCount) => prevCount + 1);
  };
  const handleDeleteFile = function (file) {
    axios
      .delete(
        `http://localhost:3050/files/delete?fileName=${file.name.slice(5)}`
      )
      .then((data) => {
        console.log(data);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteFolder = function (folder) {
    axios
      .delete(
        `http://localhost:3050/folders/delete?folderName=${folder.slice(5)}`
      )
      .then((data) => {
        console.log(data);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="main-container">
      <div className="folders-container">
        <div>
          <Buttons />
        </div>
        <div className="folders-inner-width">
          <br />
          <div className="section-title-container">
            <div className="section-title"> Folders</div>
          </div>
          <div className="folder-section-container">
            <div className="folder-section">
              {folders
                ? folders.map((folder) => {
                    return (
                      <>
                        {" "}
                        <Folder
                          isRename={isRename}
                          delete={() => handleDeleteFolder(folder)}
                          setIsRename={setIsRename}
                          navigate={() => handleNavigate(folder)}
                          source={folderIcon}
                          source2={trashCanIcon}
                          folderName={folder.slice(folder.lastIndexOf("/") + 1)}
                        />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
          <br />
          <div className="section-title-container">
            <div className="section-title">Files</div>
          </div>
          <div className="file-section-container">
            <div className="file-section-content">
              {files
                ? files.map((file) => {
                    return (
                      <>
                        {" "}
                        <File
                          isRename={isRename}
                          setIsRename={setIsRename}
                          source={
                            file.name.slice(file.name.lastIndexOf(".") + 1) ===
                              "docx" ||
                            file.name.slice(file.name.lastIndexOf(".") + 1) ===
                              "doc"
                              ? docx
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "pdf"
                              ? pdf
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "pages"
                              ? pages
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "txt"
                              ? txt
                              : null
                          }
                          source2={trashCanIcon}
                          alt="img"
                          link={`http://localhost:3050/files/download?fileName=${file.name.slice(
                            5
                          )}`}
                          fileName={file.name.slice(
                            file.name.lastIndexOf("/") + 1
                          )}
                          delete={() => handleDeleteFile(file)}
                          size={
                            (file.stats.size / 1024 / 1024).toFixed(2) + "MB"
                          }
                          creationDate={file.stats.birthtime}
                          modifyDate={file.stats.mtime}
                          changeDate={file.stats.ctime}
                        />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
