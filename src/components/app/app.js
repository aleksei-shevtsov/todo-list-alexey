import React, {useState, useEffect} from 'react';
import './app.css';
import Header from '../header/header';
import InputPanel from '../input-panel/input-panel';
import Filter from '../filter/filter';
import TodoList from '../todo-list/todo-list';
import TodoAddTask from '../todo-add-task/todo-add-task';
import Context from '../../context';

const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

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

  const addTodo = (titleValueFromInput) => {
    return fetch('http://localhost:1337/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValueFromInput,
            completed: false
        })
    }).then(data => data.json())
    .then(newTodo=>setTodos([...todos, newTodo]))
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {

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
