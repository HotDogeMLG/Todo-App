import React from "react";
import "./AppHeader.css";

const AppHeader = ({ todo, done }) => {
  return (
    <div className="AppHeader d-flex">
      <h1>Todos</h1>
    </div>
  );
};

export default AppHeader;
