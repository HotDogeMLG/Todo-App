import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const ToDoList = ({ todos, onDeleted, onDone }) => {
  const toDoElems = todos.map((el) => {
    if (!el.display) return null;

    return (
      <li key={el.id}>
        <Task
          label={el.label}
          done={el.done}
          onDeleted={() => {
            onDeleted(el.id);
          }}
          onDone={(id) => {
            onDone(el.id);
          }}
        />
      </li>
    );
  });

  return <ul className="TaskList">{toDoElems}</ul>;
};

export default ToDoList;
