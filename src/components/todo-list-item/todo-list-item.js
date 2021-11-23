import React, {useContext} from 'react';
import './todo-list-item.css';
import Context from '../../context';

const TodoListItem = ({todo, index}) => {
    const {removeTodo, toggleTodo} = useContext(Context)
    const classes = []

    if (todo.completed) {
        classes.push('text-decoration-line-through')
    }
    return (
        <li className="list-group-item d-flex justify-content-between">
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <strong>{index + 1}</strong>
            <span className={"list-group-item-label " + classes.join(' ')}>{ todo.title }</span>    
            <input type="text" className="list-group-item-input" defaultValue="DefValue"/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={() => removeTodo(todo.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default TodoListItem;