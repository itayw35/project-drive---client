import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopupContext } from "../context/Context";
import "./Header.css";
export default function Header() {
  const { currentPath } = useContext(PopupContext);
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  // const handleNavigate = function (folder) {
  //   // navigate(folders.indexOf(folder) - folders.length + 1);
  // };
  useEffect(() => {
    setFolders(currentPath.split("/"));
    console.log(currentPath.split("/"));
  }, [currentPath]);

  return (
    <div className="header-path">
      <Link to="/"> My Storage</Link>
      <div className="header-path">
        {folders.length > 0
          ? folders.slice(0, folders.length - 1).map((folder) => {
              return (
                <Link
                  to={`/folder/${folders
                    .slice(0, folders.indexOf(folder) + 1)
                    .join("/")}`}
                  state={folder}
                >
                  /{folder}
                </Link>
              );
            })
          : null}
        {folders.length > 0 ? <div>/{folders[folders.length - 1]}</div> : null}
      </div>
    </div>
  );
}
