import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    label: '',
  }

  changeLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { label } = this.state
    onSubmit(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <form onSubmit={this.submitForm}>
        <input
          onChange={this.changeLabel}
          type="text"
          placeholder="What needs to be done?"
          className="NewTaskForm"
          value={label}
        />
      </form>
    )
  }
}

export default NewTaskForm
