import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './app-content.css';
import Header from '../header/header';
import TodoList from '../todo-list/todo-list';
import TodoAddTask from '../todo-add-task/todo-add-task';
import Context from '../../context';
import LoginPage from '../login-page/login-page';
import Loader from '../loader/loader';

const AppContent = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const token = sessionStorage.getItem('token');
  
  useEffect(() => {
    axios.get('http://localhost:1337/todos', {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then(
      (res) => {
        setIsLoaded(true);
        setTodos(res.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, [token])

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
    console.log('id ', id)
    axios.delete(`http://localhost:1337/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('res ', res)
      setTodos(todos.filter(todo => todo.title !== res.data.title))
    })
  }

  const addTodo = (titleValueFromInput) => {
    axios.post('http://localhost:1337/todos', 
      {
        title: titleValueFromInput,
        completed: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(newTodo => {
        console.log('newTodo', newTodo.data.title)
        console.log('newTodo', newTodo)
        try {
          setTodos([...todos, 
            {
              id: newTodo.data.id,
              title: newTodo.data.title,
              completed: newTodo.data.completed,
            }
          ])
        } catch (error) {
          console.log('Catch Error - ', error)
        }
      })
  }
  

  const updateTodo = async (titleText, isCompleted, status, id) => {
    const URL = 'http://localhost:1337/todos/';

    const config = {
      headers: {'Authorization': `Bearer ${token}`}
    };

    const bodyParameters  = {
      title: titleText,
      completed: isCompleted,
      status: status
    };
    const response = await axios.put(
      `${URL}${id}`, 
      bodyParameters,
      config
    )
    
    todos.map((todo) => {
      if (todo.id === id) {
        const index = todos.indexOf(todo)
        todos[index].title = response.data.title
        todos[index].completed = response.data.completed
        todos[index].status = response.data.status
        setTodos(todos)
      }
    })
  }

  const filteredTodos = (filter) => {
    if (filter === 'byName') {
      return setTodos(todos.sort(byNameSequence))
    } 
    else if (filter === 'byDate') {
      return setTodos(todos.sort(byDateSequence))
    }
    else {
      return setTodos(todos.sort(defaultSequence))
    }
  }
  
  const onFilterSelect = (filter) => {
    setFilter(filter)
  }

  const byNameSequence = (a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1; 
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1; 
    }
    return 0;
  }

  const byDateSequence = (a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  }
  
  const defaultSequence = (a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (<div className="app"><Loader/></div>);
  }

  if (!token) {
    return (<LoginPage/>)
  }
  
  return (
    <>
      <Context.Provider value={{removeTodo, toggleTodo, updateTodo, onFilterSelect, filteredTodos}}>
          <div className="app">
          <Header/>
          <TodoAddTask onCreate={addTodo} filter={filter} />
          {todos.length ?
          <TodoList todos={todos} /> :
          <ul class="app-list list-group">
            <li className="list-group-item d-flex justify-content-between" >
              <span className="list-group-item-label">No todos.</span>
            </li>
          </ul>}
        </div>
      </Context.Provider>
    </>
  )
}

export default AppContent;
