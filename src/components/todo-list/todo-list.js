import React from 'react';
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css';

const TodoList = (props) => {
    return (
        <ul className="app-list list-group">
            {props.todos.map((todo, index) => {
                return <TodoListItem todo={todo} key={todo.id} index={index} />
            })}
        </ul>
    )
}

export default TodoList;