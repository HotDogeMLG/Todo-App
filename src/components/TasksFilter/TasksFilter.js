import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

function TasksFilter({ onShowActive, onShowAll, onShowCompleted }) {
  return (
    <ul className="TasksFilter">
      <li>
        <button type="button" className="footer-btn" onClick={onShowAll}>
          All
        </button>
      </li>
      <li>
        <button type="button" className="footer-btn" onClick={onShowActive}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className="footer-btn" onClick={onShowCompleted}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onShowAll: PropTypes.func,
  onShowActive: PropTypes.func,
  onShowCompleted: PropTypes.func,
}

export default TasksFilter
