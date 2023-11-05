import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  changeLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  changeMins = (e) => {
    if (!isNaN(e.target.value))
      this.setState({
        min: e.target.value,
      })
  }

  changeSecs = (e) => {
    if (!isNaN(e.target.value))
      this.setState({
        sec: e.target.value,
      })
  }

  submitForm = (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { label, min, sec } = this.state
    if (label && min && sec) {
      const time = +min * 60 + +sec
      onSubmit(label, time)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form onSubmit={this.submitForm} className="task-form">
        <input
          onChange={this.changeLabel}
          type="text"
          placeholder="Task"
          className="NewTaskForm new-task"
          value={label}
        />
        <input onChange={this.changeMins} type="text" placeholder="Min" className="NewTaskForm minutes" value={min} />
        <input onChange={this.changeSecs} type="text" placeholder="Sec" className="NewTaskForm seconds" value={sec} />
        <input type="submit" className="form-submit"></input>
      </form>
    )
  }
}

export default NewTaskForm
