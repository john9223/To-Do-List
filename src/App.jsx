import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = (text) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { id: Date.now(), text }]
    }));
  }

  updateTodo = (id, newText) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <AddTodo addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={this.props.updateTodo}
            deleteTodo={this.props.deleteTodo}
          />
        ))}
      </ul>
    );
  }
}

class TodoItem extends Component {
  state = {
    editText: this.props.todo.text,
    isEditing: false
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleSubmit = () => {
    this.props.updateTodo(this.props.todo.id, this.state.editText);
    this.setState({ isEditing: false });
  };

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo.id);
  };

  render() {
    const { todo } = this.props;
    return (
      <li>
        {this.state.isEditing ? (
          <div>
            <input
              type="text"
              value={this.state.editText}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Save</button>
          </div>
        ) : (
          <div>
            <span>{todo.text}</span>
            <button onClick={this.handleEdit}>Update</button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </li>
    );
  }
}

class AddTodo extends Component {
  state = {
    text: ''
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim() !== '') {
      this.props.addTodo(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Add new item"
        />
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default App;
