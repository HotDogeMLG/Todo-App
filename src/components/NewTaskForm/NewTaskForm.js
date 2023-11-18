import React, { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

function NewTaskForm({ onSubmit }) {
  const [label, changeLabel] = useState('')
  const [min, changeMins] = useState('')
  const [sec, changeSecs] = useState('')

  const setLabelFromInput = (e) => {
    changeLabel(e.target.value)
  }

  const setMinsFromInput = (e) => {
    if (!isNaN(e.target.value)) changeMins(e.target.value)
  }

  const setSecsFromInput = (e) => {
    if (!isNaN(e.target.value)) changeSecs(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (label && min && sec) {
      const time = +min * 60 + +sec
      onSubmit(label, time)
      changeLabel('')
      changeMins('')
      changeSecs('')
    }
  }

  return (
    <form onSubmit={submitForm} className="task-form">
      <input
        onChange={setLabelFromInput}
        type="text"
        placeholder="Task"
        className="NewTaskForm new-task"
        value={label}
      />
      <input onChange={setMinsFromInput} type="text" placeholder="Min" className="NewTaskForm minutes" value={min} />
      <input onChange={setSecsFromInput} type="text" placeholder="Sec" className="NewTaskForm seconds" value={sec} />
      <input type="submit" className="form-submit"></input>
    </form>
  )
}

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default NewTaskForm
