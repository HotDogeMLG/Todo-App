import React from "react";
import "./Footer.css";
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = ({
  itemsLeft,
  onClear,
  onShowActive,
  onShowAll,
  onShowCompleted,
}) => {
  return (
    <div className="Footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter
        onShowActive={() => {
          onShowActive();
        }}
        onShowAll={() => {
          onShowAll();
        }}
        onShowCompleted={() => {
          onShowCompleted();
        }}
      />
      <button className="footer-btn" onClick={onClear}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
