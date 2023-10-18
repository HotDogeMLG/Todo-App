import React from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";
import "./TaskList.css";

class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onDone, onImportant } = this.props;

    const toDoElems = todos.map((el) => {
      if (!el.display) return null;

      return (
        <li key={el.id}>
          <Task
            label={el.label}
            done={el.done}
            important={el.important}
            onDeleted={() => {
              onDeleted(el.id);
            }}
            onDone={() => {
              onDone(el.id);
            }}
            onImportant={() => {
              onImportant(el.id);
            }}
            created={el.created}
          />
        </li>
      );
    });
    return <ul className="TaskList">{toDoElems}</ul>;
  }
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      id: PropTypes.number,
      display: PropTypes.bool,
    })
  ),
  toDeleted: PropTypes.func,
  onDone: PropTypes.func,
};

export default TaskList;
