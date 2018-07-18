import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Tasks } from "../api/tasks.js";

// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRowId: null,
    }
  }
  toogleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  editThisTask() {
    console.log(this.props.task._id);
    this.setState({ selectRowId: this.props.task._id });
    console.log(this.state.selectRowId);
    // Tasks.update(this.props.task._id, {
    //   $set: { isEdit: !this.props.task.isEdit },
    // });
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.update(this.props.task._id, {
      $set: { ...this.props.task, text }
    });
    this.setState({ selectRowId: null });
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    const taskClassname = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassname}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
        <button className="delete" onClick={this.editThisTask.bind(this)}>
          编辑
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toogleChecked.bind(this)}
        />
        <span className="text">
          {this.state.selectRowId === this.props.task._id ? (
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                defaultValue={this.props.task.text}
                type="text"
                ref="textInput"
                placeholder="请输入"
              />
            </form>
          ) : (
              <strong>{this.props.task.username}<span>:{this.props.task.text}</span></strong>
            )}
        </span>
      </li>
    );
  }
}