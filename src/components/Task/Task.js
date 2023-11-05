import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './Task.css'

class Task extends React.Component {
  state = {
    date: formatDistanceToNow(this.props.created, { includeSeconds: true }),
    timer: this.props.timer,
    paused: false,
  }

  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    onDeleted: PropTypes.func,
    onImportant: PropTypes.func,
    onDone: PropTypes.func,
    created: PropTypes.number,
    important: PropTypes.bool,
    timer: PropTypes.number,
    onUnmount: PropTypes.func,
  }

  formatTime(time) {
    let newTime = ''
    const mins = Math.floor(time / 60)
    newTime += mins + ':'
    if (time % 60 === 0) newTime += '00'
    else if (time - mins * 60 < 10) newTime += '0' + (time - mins * 60)
    else newTime += time - mins * 60
    return newTime
  }

  addInterval(onTick) {
    if (this.props.timer !== 0)
      return setInterval(() => {
        const { timer } = this.props
        onTick(timer - 1)
        this.setState({
          timer: timer - 1,
        })
        if (timer - 1 === 0) {
          clearInterval(this.todoTimer)
          this.todoTimer = null
        }
      }, 1000)
  }

  componentDidMount() {
    const { onTick, timer, unmountDate } = this.props
    const { paused } = this.state

    if (unmountDate === null) this.setState({ paused: true })

    const timeDifference = Math.round((new Date().getTime() - unmountDate) / 1000)
    if (!paused && unmountDate) {
      onTick(timer - timeDifference)
      this.setState({ timer: timer - timeDifference })
    }

    this.createdTimer = setInterval(() => {
      const { created } = this.props
      this.setState({
        date: formatDistanceToNow(created, { includeSeconds: true }),
      })
    }, 1000)
  }

  componentWillUnmount() {
    if (!this.state.paused && !this.props.done) this.props.onUnmount(true)
    else this.props.onUnmount(false)
    clearInterval(this.todoTimer)
    this.todoTimer = null
    clearInterval(this.createdTimer)
  }

  render() {
    const { label, done, important, onDeleted, onDone, onImportant } = this.props
    const { date, timer, paused } = this.state

    let classNames = 'Task'
    if (done) classNames += ' done'
    if (important) classNames += ' important'
    if (!this.todoTimer && !paused && !done) this.todoTimer = this.addInterval(this.props.onTick)

    let pauseDisable, playDisable
    if (this.todoTimer === null || paused || done) {
      clearInterval(this.todoTimer)
      this.todoTimer = null
      pauseDisable = true
      playDisable = false
    } else {
      playDisable = true
      pauseDisable = false
    }

    let timerClasses = 'timer'
    if (timer === 0) timerClasses += ' expired'

    return (
      <div className={classNames}>
        <label className="checkbox">
          <input checked={done} className="toggle" type="checkbox" onChange={onDone} />
          <div className="check-dot" />
        </label>

        <label className="Task__label">
          <span
            className="description"
            onClick={(e) => {
              e.preventDefault()
              onDone()
            }}
          >
            {label}
          </span>
          <div className="timer-box">
            <button
              type="button"
              disabled={playDisable}
              className="Task__btn"
              onClick={() => {
                if (this.props.done) onDone()
                this.setState({
                  paused: false,
                })
              }}
            >
              <svg
                fill="#cc9a9a"
                height="15px"
                width="15px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17.804 17.804"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g id="c98_play">
                      <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313 c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04 c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path>{' '}
                    </g>
                    <g id="Capa_1_78_"> </g>
                  </g>
                </g>
              </svg>
            </button>
            <button
              type="button"
              disabled={pauseDisable}
              className="Task__btn"
              onClick={() => {
                this.setState({
                  paused: true,
                })
              }}
            >
              <svg
                fill="#cc9a9a"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                viewBox="0 0 277.338 277.338"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M14.22,45.665v186.013c0,25.223,16.711,45.66,37.327,45.66c20.618,0,37.339-20.438,37.339-45.66V45.665 c0-25.211-16.721-45.657-37.339-45.657C30.931,0,14.22,20.454,14.22,45.665z"></path>{' '}
                    <path d="M225.78,0c-20.614,0-37.325,20.446-37.325,45.657V231.67c0,25.223,16.711,45.652,37.325,45.652s37.338-20.43,37.338-45.652 V45.665C263.109,20.454,246.394,0,225.78,0z"></path>{' '}
                  </g>
                </g>
              </svg>
            </button>
            <span className={timerClasses}>{this.formatTime(timer)}</span>
          </div>
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
