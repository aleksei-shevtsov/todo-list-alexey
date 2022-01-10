import React, {useContext, useState} from 'react';
import './todo-list-item.css';
import Context from '../../context';
import Modal from '../modal/modal';
import ModalContent from '../modal-content/modal-content';
import Badge from 'react-bootstrap/Badge';

const TodoListItem = ({todo, index}) => {
    const {toggleTodo, updateTodo} = useContext(Context)
    const [modalActive, setModalActive] = useState('');

    const classes = []

    const toggleHandler = (id) => {
        toggleTodo(id);
        updateTodo(todo.title, todo.completed, todo.status, id)
    }

    if (todo.completed) {
        classes.push('text-decoration-line-through')
    }

    return (
        <li className="list-group-item d-flex justify-content-between">
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleHandler(todo.id)}
            />
            <strong>{index + 1}</strong>
            <span className={"list-group-item-label " + classes.join(' ')}>{todo.title}</span>    
            <Badge bg="primary" id="status-text">{todo.status}</Badge>
            <div className='d-flex justify-content-center align-items-center'>
            <button type="button"
                className="btn-update btn-sm "
                onClick={() => setModalActive(true)}>
            <i class="fas fa-pen"></i>
            </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContent todo={todo} index={index} updateTodo={updateTodo} />
            </Modal>
        </li>
    )
}

export default TodoListItem;