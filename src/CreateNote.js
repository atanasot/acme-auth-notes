import React, { Component } from "react";
import { connect } from "react-redux";
import { createNote } from "./store";

// does auth.id === user.id ???

class CreateNote extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: { errors: [{ message: "" }] },
    });
  }

  async onSave(ev) {
    ev.preventDefault();
    const note = {
      text: this.state.text,
      userId: this.props.auth.id,
    };
    try {
      await this.props.createNote(note);
      this.setState({ text: "" });
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
    const { text, error } = this.state;
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <input
          name="text"
          placeholder="enter new note"
          value={text}
          onChange={onChange}
        />
        <button>create note</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note) => dispatch(createNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
