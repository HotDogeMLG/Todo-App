import React from "react";
import "./TasksFilter.css";

class TasksFilter extends React.Component {
  render() {
    const { onShowActive, onShowAll, onShowCompleted } = this.props;
    return (
      <ul className="TasksFilter">
        <li>
          <button className="footer-btn" onClick={onShowAll}>
            All
          </button>
        </li>
        <li>
          <button className="footer-btn" onClick={onShowActive}>
            Active
          </button>
        </li>
        <li>
          <button className="footer-btn" onClick={onShowCompleted}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TasksFilter;
