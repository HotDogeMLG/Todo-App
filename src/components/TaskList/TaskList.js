import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onDone, onImportant, onTick, onUnmount }) {
  const toDoElems = todos.map((el) => {
    if (!el.display) return null

    return (
      <li key={el.id}>
        <Task
          label={el.label}
          done={el.done}
          important={el.important}
          timer={el.timer}
          onDeleted={() => {
            onDeleted(el.id)
          }}
          onDone={() => {
            onDone(el.id)
          }}
          onImportant={() => {
            onImportant(el.id)
          }}
          onTick={(time) => {
            onTick(el.id, time)
          }}
          onUnmount={(update) => {
            onUnmount(el.id, update)
          }}
          created={el.created}
          unmountDate={el.unmountDate}
        />
      </li>
    )
  })

  return <ul className="TaskList">{toDoElems}</ul>
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
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onImportant: PropTypes.func,
}

export default TaskList
