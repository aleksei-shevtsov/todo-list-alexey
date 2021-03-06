import React, {useState} from 'react';
import './todo-add-task.css';
import Filter from '../filter/filter';

const styles = {
    width_add_btn: {
        width: '10rem'
    }
}

const TodoAddTask = ({onCreate, filter}) => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        if (inputValue.trim()) {
            onCreate(inputValue) 
            setInputValue('')
        }
    }

    return (
        <div className="app-add-task">
            <h3>Add your todo</h3>
            <form
                className="add-task d-flex"
                onSubmit={handleChange}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    className="form-control new-post-label"
                    placeholder="Write task" />

                <button type="submit"
                        className="btn btn-outline-light"
                        style={styles.width_add_btn}>Add</button>
            </form>
            <Filter filter={filter}/>
        </div>
    )
}

export default TodoAddTask;
