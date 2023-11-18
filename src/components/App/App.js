import React, { useState } from 'react'

import AppHeader from '../AppHeader/AppHeader'
import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'

function App() {
  const [toDoData, changeToDoData] = useState([])

  const deleteTask = (id) => {
    changeToDoData((prevToDoData) => {
      const newElems = prevToDoData.filter((el) => el.id !== id)
      return newElems
    })
  }

  const addTask = (val, time) => {
    changeToDoData((prevToDoData) => {
      const toDoDataCopy = JSON.parse(JSON.stringify(prevToDoData))
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
        timer: time,
      })
      return toDoDataCopy
    })
  }

  const toggleProperty = (id, property) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.id === id) returnEl[property] = !returnEl[property]
        return returnEl
      })
      return newToDoData
    })
  }

  const doTask = (id) => {
    toggleProperty(id, 'done')
  }

  const markImportant = (id) => {
    toggleProperty(id, 'important')
  }

  const clearCompletedTasks = () => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.filter((el) => !el.done)
      return newToDoData
    })
  }

  const changeDisplay = (ifDone, ifActive) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.done) returnEl.display = ifDone
        else returnEl.display = ifActive
        return returnEl
      })
      return newToDoData
    })
  }

  const showAll = () => {
    changeDisplay(true, true)
  }

  const showActive = () => {
    changeDisplay(false, true)
  }

  const showCompleted = () => {
    changeDisplay(true, false)
  }

  const changeTimer = (id, time) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.id === id) returnEl.timer = time
        return returnEl
      })
      return newToDoData
    })
  }

  const unmount = (id, update) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((el) => {
        const returnEl = JSON.parse(JSON.stringify(el))
        if (el.id === id)
          if (update) returnEl.unmountDate = new Date().getTime()
          else returnEl.unmountDate = null
        return returnEl
      })
      return newToDoData
    })
  }

  const tasksLeft = toDoData.filter((el) => !el.done).length
  return (
    <div className="App">
      <AppHeader />
      <NewTaskForm
        onSubmit={(val, time) => {
          addTask(val, time)
        }}
      />
      <TaskList
        todos={toDoData}
        onDeleted={(id) => {
          deleteTask(id)
        }}
        onDone={(id) => {
          doTask(id)
        }}
        onImportant={(id) => {
          markImportant(id)
        }}
        onTick={(id, time) => {
          changeTimer(id, time)
        }}
        onUnmount={(id, update) => {
          unmount(id, update)
        }}
      />
      <Footer
        itemsLeft={tasksLeft}
        onClear={() => {
          clearCompletedTasks()
        }}
        onShowAll={() => {
          showAll()
        }}
        onShowActive={() => {
          showActive()
        }}
        onShowCompleted={() => {
          showCompleted()
        }}
      />
    </div>
  )
}

export default App
