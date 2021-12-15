import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';
import Header from '../header/header';
// import InputPanel from '../input-panel/input-panel';
// import Filter from '../filter/filter';
import TodoList from '../todo-list/todo-list';
import TodoAddTask from '../todo-add-task/todo-add-task';
import Context from '../../context';
import LoginPage from '../login-page/login-page';

const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [token, setToken] = useState();
  let isThereCredentials = false;

  useEffect(() => {
      axios.get('http://localhost:1337/todos', {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
      .then(res => {
          setTodos(res.data)
      })
  }, [token])

  // const getMainTodos = () => {
  //   let mounted = true;
  //   axios.get('http://localhost:1337/todos', {
  //     headers: {
  //       Authorization:
  //         `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => {
  //     console.log('res1 ', res.data)
  //     if(mounted) {
  //       setTodos(res.data)
  //     }
  //   })
  //   return () => mounted = false;
  // }

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
    .then(newTodo => {
        setTodos([...todos, newTodo])
        console.log(todos)
        }
    )
  }

  const updateTodo = async (titleText, isCompleted, id) => {
    const response = await fetch(`http://localhost:1337/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleText,
        completed: isCompleted
      })
    });
    return(
      await response.json()
      .then(updatedData => {
        todos.map((todo)=>{
          if (todo.id === id) {
            const index = todos.indexOf(todo)
            todos[index].title = updatedData.title
            todos[index].completed = updatedData.completed
            setTodos(todos)
          }
        })
    }))
  }

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Загрузка...</div>;
  // }

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

  function handlerToken(token, todos) {
    setToken(token)
    setTodos(todos)
    isThereCredentials = true;
    console.log('handlerToken', token)
  }

  return (
    <>
      {!token ?
      <>
        <LoginPage setTokenInApp={handlerToken}/>
      </> :
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
      </Context.Provider>}
    </>
    
  );

  if(!token) {
    console.log('setToken', token)
    return (
      <>
        <LoginPage setTokenInApp={handlerToken}/>
      </>
    )
  } else {
    console.log('setToken', token)
     return (
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
    );
  }

  
  
}

export default App;
