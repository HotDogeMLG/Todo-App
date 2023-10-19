import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({ itemsLeft, onClear, onShowActive, onShowAll, onShowCompleted }) {
  return (
    <div className="Footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter
        onShowActive={() => {
          onShowActive()
        }}
        onShowAll={() => {
          onShowAll()
        }}
        onShowCompleted={() => {
          onShowCompleted()
        }}
      />
      <button type="button" className="footer-btn" onClick={onClear}>
        Clear completed
      </button>
    </div>
  )
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  onClear: PropTypes.func,
  onShowActive: PropTypes.func,
  onShowAll: PropTypes.func,
  onShowCompleted: PropTypes.func,
}

export default Footer
