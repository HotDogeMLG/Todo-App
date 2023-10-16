import React from "react";
import "./NewTaskForm.css";

class NewTaskForm extends React.Component {
  state = {
    label: "",
  };

  changeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          onChange={this.changeLabel}
          type="text"
          placeholder="What needs to be done?"
          className="NewTaskForm"
          value={this.state.label}
        />
      </form>
    );
  }
}

export default NewTaskForm;
