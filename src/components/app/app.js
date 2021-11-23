import React from 'react';
import './app.css';
import Header from '../header/header';
import InputPanel from '../input-panel/input-panel';
import Filter from '../filter/filter';
import TodoList from '../todo-list/todo-list';
import TodoAddTask from '../todo-add-task/todo-add-task';
import Context from '../../context';

const App = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: false, title: 'Buy bread'},
    { id: 2, completed: true, title: 'Buy milk'},
    { id: 3, completed: false, title: 'Clean house'}
  ])

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const  removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTodo = (title) => {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo, toggleTodo}}>
      <div className="app">
        <Header/>
        <TodoAddTask onCreate={addTodo}/>
        {todos.length ?
        <TodoList todos={todos} onToggle={toggleTodo}/> :
        <ul class="app-list list-group">
          <li className="list-group-item d-flex justify-content-between" >
            <span className="list-group-item-label">No todos.</span>
          </li>
        </ul>}
      </div>
    </Context.Provider>
  );
}

export default App;
