import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PopupContext } from "../context/Context";
import "./Header.css";
export default function Header() {
  const { currentPath } = useContext(PopupContext);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    setFolders(currentPath.split("/"));
    console.log(currentPath.split("/"));
  }, [currentPath]);

  return (
    <div className="header-container">
      <div className="header-path">
        <Link to="/"> My Storage</Link>
        <div className="inner-header-path">
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
          {folders.length > 0 ? (
            <div>/{folders[folders.length - 1]}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
