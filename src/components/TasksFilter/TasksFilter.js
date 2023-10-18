import React from "react";
import PropTypes from "prop-types";
import "./TasksFilter.css";

class TasksFilter extends React.Component {
  static propTypes = {
    onShowAll: PropTypes.func,
    onShowActive: PropTypes.func,
    onShowCompleted: PropTypes.func,
  };

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
