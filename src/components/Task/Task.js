import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './Task.css'

class Task extends React.Component {
  state = {
    date: formatDistanceToNow(this.props.created, { includeSeconds: true }),
  }

  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    onDeleted: PropTypes.func,
    onImportant: PropTypes.func,
    onDone: PropTypes.func,
    created: PropTypes.number,
    important: PropTypes.bool,
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { created } = this.props
      this.setState({
        date: formatDistanceToNow(created, { includeSeconds: true }),
      })
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { label, done, important, onDeleted, onDone, onImportant } = this.props
    const { date } = this.state

    let classNames = 'Task'
    if (done) classNames += ' done'
    if (important) classNames += ' important'

    return (
      <div className={classNames}>
        <label htmlFor="Task__checkbox" className="checkbox">
          <input id="Task__checkbox" checked={done} className="toggle" type="checkbox" onChange={onDone} />
          <div className="check-dot" />
        </label>

        <label className="Task__label" onClick={onDone}>
          <span className="description">{label}</span>
          <span className="created">Created {date} ago</span>
        </label>

        <div className="btn-container">
          <button type="button" className="Task__btn important" onClick={onImportant}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="#cc9a9a"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 19v.01" /> <path d="M12 15v-10" />{' '}
            </svg>
          </button>

          <button type="button" className="Task__btn delete" onClick={onDeleted}>
            <svg width="15" height="15" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="100" x2="100" y2="0" strokeWidth="15" stroke="#cc9a9a" />
              <line x1="0" y1="0" x2="100" y2="100" strokeWidth="15" stroke="#cc9a9a" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
}

export default Task
