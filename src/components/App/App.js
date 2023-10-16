import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import "./App.css";
import Footer from "../Footer/Footer";

class App extends React.Component {
  state = {
    toDoData: [
      { label: "Drink coffee", done: false, id: 1, display: true },
      { label: "Make React App", done: false, id: 2, display: true },
      { label: "Chill", done: false, id: 3, display: true },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ toDoData }) => {
      const newElems = toDoData.filter((el) => {
        if (el.id !== id) return el;
      });
      return { toDoData: newElems };
    });
  };

  addTask = (val) => {
    this.setState(({ toDoData }) => {
      const toDoDataCopy = JSON.parse(JSON.stringify(toDoData));
      let maxId = 0;
      maxId = toDoDataCopy.reduce((acc, el) => {
        if (el.id > maxId) {
          return el.id;
        } else return maxId;
      }, 0);
      toDoDataCopy.push({
        label: val,
        done: false,
        id: maxId + 1,
        display: "block",
      });
      return { toDoData: toDoDataCopy };
    });
  };

  doTask = (id) => {
    this.setState(({ toDoData }) => {
      let newToDoData = toDoData.map((el) => {
        if (el.id === id) el.done = !el.done;
        return el;
      });
      return {
        toDoData: newToDoData,
      };
    });
  };

  clearCompletedTasks = () => {
    this.setState(({ toDoData }) => {
      let newToDoData = toDoData.filter((el) => !el.done);
      return {
        toDoData: newToDoData,
      };
    });
  };

  changeDisplay = (ifDone, ifActive) => {
    this.setState(({ toDoData }) => {
      let newToDoData = toDoData.map((el) => {
        if (el.done) el.display = ifDone;
        else el.display = ifActive;
        return el;
      });
      return {
        toDoData: newToDoData,
      };
    });
  };

  showAll = () => {
    this.changeDisplay(true, true);
  };

  showActive = () => {
    this.changeDisplay(false, true);
  };

  showCompleted = () => {
    this.changeDisplay(true, false);
  };

  render() {
    const tasksLeft = this.state.toDoData.filter((el) => !el.done).length;

    return (
      <div className="App">
        <AppHeader />
        <NewTaskForm
          onSubmit={(val) => {
            this.addTask(val);
          }}
        />
        <TaskList
          todos={this.state.toDoData}
          onDeleted={(id) => {
            this.deleteTask(id);
          }}
          onDone={(id) => {
            this.doTask(id);
          }}
        />
        <Footer
          itemsLeft={tasksLeft}
          onClear={() => {
            this.clearCompletedTasks();
          }}
          onShowAll={() => {
            this.showAll();
          }}
          onShowActive={() => {
            this.showActive();
          }}
          onShowCompleted={() => {
            this.showCompleted();
          }}
        />
      </div>
    );
  }
}

export default App;
