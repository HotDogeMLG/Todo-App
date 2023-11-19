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

  const addTask = (inputVal, taskTimer) => {
    let maxId = 0
    maxId = toDoData.reduce((acc, task) => {
      if (task.id > maxId) {
        return task.id
      }
      return maxId
    }, 0)

    const currentTime = new Date().getTime()

    changeToDoData((prevToDoData) => {
      const toDoDataCopy = [...prevToDoData]
      toDoDataCopy.push({
        label: inputVal,
        done: false,
        important: false,
        id: maxId + 1,
        display: true,
        created: currentTime,
        timer: taskTimer,
      })
      return toDoDataCopy
    })
  }

  const toggleProperty = (id, property) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((task) => (task.id === id ? { ...task, [property]: !task[property] } : task))
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
      const newToDoData = prevToDoData.filter((task) => !task.done)
      return newToDoData
    })
  }

  const changeDisplay = (ifDone, ifActive) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((task) => {
        const returnEl = { ...task }
        if (task.done) returnEl.display = ifDone
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

  const changeTimer = (id, newTimer) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((task) => {
        const returnEl = { ...task }
        if (task.id === id) returnEl.timer = newTimer
        return returnEl
      })
      return newToDoData
    })
  }

  const setUnmountDate = (id, update) => {
    changeToDoData((prevToDoData) => {
      const newToDoData = prevToDoData.map((task) => {
        const returnEl = { ...task }
        if (task.id === id)
          if (update) returnEl.unmountDate = new Date().getTime()
          else returnEl.unmountDate = null
        return returnEl
      })
      return newToDoData
    })
  }

  const tasksLeft = toDoData.filter((task) => !task.done).length
  return (
    <div className="App">
      <AppHeader />
      <NewTaskForm
        onSubmit={(inputVal, taskTimer) => {
          addTask(inputVal, taskTimer)
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
        onTick={(id, newTimer) => {
          changeTimer(id, newTimer)
        }}
        onUnmount={(id, update) => {
          setUnmountDate(id, update)
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
