import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import "./App.css";

class App extends React.Component {
  state = {
    toDoData: [
      {
        label: "Drink coffee",
        done: false,
        important: false,
        id: 1,
        display: true,
        created: new Date().getTime(),
      },
      {
        label: "Make React App",
        done: false,
        important: false,
        id: 2,
        display: true,
        created: new Date().getTime(),
      },
      {
        label: "Chill",
        done: false,
        important: false,
        id: 3,
        display: true,
        created: new Date().getTime(),
      },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ toDoData }) => {
      const newElems = toDoData.filter((el) => el.id !== id);
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
        important: false,
        id: maxId + 1,
        display: true,
        created: new Date().getTime(),
      });
      return { toDoData: toDoDataCopy };
    });
  };

  toggleProperty = (id, property) => {
    this.setState(({ toDoData }) => {
      let newToDoData = toDoData.map((el) => {
        if (el.id === id) el[property] = !el[property];
        return el;
      });
      return {
        toDoData: newToDoData,
      };
    });
  };

  doTask = (id) => {
    this.toggleProperty(id, "done");
  };

  markImportant = (id) => {
    this.toggleProperty(id, "important");
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
          onImportant={(id) => {
            this.markImportant(id);
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
