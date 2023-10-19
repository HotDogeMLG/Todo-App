import React from 'react'

import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'

class App extends React.Component {
  state = {
    toDoData: [
      {
        label: 'Drink coffee',
        done: false,
        important: false,
        id: 1,
        display: true,
        created: new Date().getTime(),
      },
      {
        label: 'Make React App',
        done: false,
        important: false,
        id: 2,
        display: true,
        created: new Date().getTime(),
      },
      {
        label: 'Chill',
        done: false,
        important: false,
        id: 3,
        display: true,
        created: new Date().getTime(),
      },
    ],
  }

  deleteTask = (id) => {
    this.setState(({ toDoData }) => {
      const newElems = toDoData.filter((el) => el.id !== id)
      return { toDoData: newElems }
    })
  }

  addTask = (val) => {
    this.setState(({ toDoData }) => {
      const toDoDataCopy = JSON.parse(JSON.stringify(toDoData))
      let maxId = 0
      maxId = toDoDataCopy.reduce((acc, el) => {
        if (el.id > maxId) {
          return el.id
        }
        return maxId
      }, 0)
      toDoDataCopy.push({
        label: val,
        done: false,
        important: false,
        id: maxId + 1,
        display: true,
        created: new Date().getTime(),
      })
      return { toDoData: toDoDataCopy }
    })
  }

  toggleProperty = (id, property) => {
    this.setState(({ toDoData }) => {
      const newToDoData = toDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.id === id) returnEl[property] = !returnEl[property]
        return returnEl
      })
      return {
        toDoData: newToDoData,
      }
    })
  }

  doTask = (id) => {
    this.toggleProperty(id, 'done')
  }

  markImportant = (id) => {
    this.toggleProperty(id, 'important')
  }

  clearCompletedTasks = () => {
    this.setState(({ toDoData }) => {
      const newToDoData = toDoData.filter((el) => !el.done)
      return {
        toDoData: newToDoData,
      }
    })
  }

  changeDisplay = (ifDone, ifActive) => {
    this.setState(({ toDoData }) => {
      const newToDoData = toDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.done) returnEl.display = ifDone
        else returnEl.display = ifActive
        return returnEl
      })
      return {
        toDoData: newToDoData,
      }
    })
  }

  showAll = () => {
    this.changeDisplay(true, true)
  }

  showActive = () => {
    this.changeDisplay(false, true)
  }

  showCompleted = () => {
    this.changeDisplay(true, false)
  }

  render() {
    const { toDoData } = this.state
    const tasksLeft = toDoData.filter((el) => !el.done).length
    return (
      <div className="App">
        <AppHeader />
        <NewTaskForm
          onSubmit={(val) => {
            this.addTask(val)
          }}
        />
        <TaskList
          todos={toDoData}
          onDeleted={(id) => {
            this.deleteTask(id)
          }}
          onDone={(id) => {
            this.doTask(id)
          }}
          onImportant={(id) => {
            this.markImportant(id)
          }}
        />
        <Footer
          itemsLeft={tasksLeft}
          onClear={() => {
            this.clearCompletedTasks()
          }}
          onShowAll={() => {
            this.showAll()
          }}
          onShowActive={() => {
            this.showActive()
          }}
          onShowCompleted={() => {
            this.showCompleted()
          }}
        />
      </div>
    )
  }
}

export default App
