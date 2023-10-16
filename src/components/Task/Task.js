import React from "react";
import "./Task.css";

class Task extends React.Component {
  render() {
    const { label, done, onDeleted, onDone } = this.props;

    let classNames = "Task";
    if (done) {
      classNames += " done";
    }

    return (
      <div className={classNames}>
        <label className="checkbox">
          <input
            checked={done}
            className="toggle"
            type="checkbox"
            onChange={onDone}
          ></input>
          <div className="check-dot"></div>
        </label>

        <label className="Task__label" onClick={onDone}>
          <span className="description">{label}</span>
          <span className="created">created 5 minutes ago</span>
        </label>

        <div className="btn-container">
          <button className="Task__btn redact">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="#cc9a9a"
            >
              <path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" />
            </svg>
          </button>

          <button className="Task__btn delete" onClick={onDeleted}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                strokeWidth="15"
                stroke="#cc9a9a"
              />
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                strokeWidth="15"
                stroke="#cc9a9a"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
