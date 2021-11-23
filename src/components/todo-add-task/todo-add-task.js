import React, {useState} from 'react';
import './todo-add-task.css';

const TodoAddTask = ({onCreate}) => {
    const [value, setValue] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }

    return (
        <div className="app-add-task">
            <h3>Add your todo</h3>
            <form
                className="add-task d-flex"
                onSubmit={submitHandler}>
                <input 
                    type="text"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    className="form-control new-post-label"
                    placeholder="Write task" />

                <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
}

export default TodoAddTask;