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
import jpg from "../jpg-icon.png";
import HEIF from "../HEIF-icon.png";
import HEIC from "../HEIC-icon.png";
import m4a from "../m4a-icon.jpeg";
import folderIcon from "../folder-icon.png";
import trashCanIcon from "../trash-can-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Folders.css";
export default function Folders() {
  const { clicked, setCurrentPath, error, baseURL, secondURL, isPaste } =
    useContext(PopupContext);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [isRename, setIsRename] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `${
          baseURL || secondURL
        }/folders/get?folderName=${location.pathname.slice(8)}`
      )
      .then((data) => {
        console.log(data.data);
        setFolders(data.data.folders);
        setFiles(data.data.files);
      })
      .catch((error) => console.log(error));
  }, [clicked, count, isRename, location.state, isPaste]);
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
        `${baseURL || secondURL}/files/delete?fileName=${file.name.slice(4)}`
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
        `${baseURL || secondURL}/folders/delete?folderName=${folder.slice(4)}`
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
            <div className="section-title">
              {" "}
              {error ? <span className="error">{error}</span> : null}
              <h3>Folders</h3>
            </div>
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
            <div className="section-title">
              <h3>Files</h3>
            </div>
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
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "jpg" ||
                                file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "jpeg"
                              ? jpg
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "heif"
                              ? HEIF
                              : file.name.slice(
                                  file.name.lastIndexOf(".") + 1
                                ) === "heic"
                              ? HEIC
                              : file.name.slice(file.name.lastIndexOf(".")+1)==="m4a"?m4a:null
                          }
                          source2={trashCanIcon}
                          alt="img"
                          link={`${
                            baseURL || secondURL
                          }/files/download?fileName=${file.name.slice(5)}`}
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
