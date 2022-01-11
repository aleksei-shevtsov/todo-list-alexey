import React, { useContext } from 'react';
import Context from '../../context';
import './filter.css';

const Filter = (props) => {
    const { onFilterSelect, filteredTodos } = useContext(Context)
    const buttonsData = [
        { filterName: 'all', label: 'All todos' },
        { filterName: 'byName', label: 'By name' },
        { filterName: 'byDate', label: 'By date' },
    ]

    const clickHandler = (filterName) => {
        onFilterSelect(filterName)
        filteredTodos(filterName)
    }

    const buttons = buttonsData.map(({ filterName, label }) => {
        const active = props.filter === filterName;
        const btnClass = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button
                type="button"
                className={`btn ${btnClass}`}
                key={filterName}
                onClick={() => { clickHandler(filterName, props.todos) }}>
                {label}
            </button>
        )
    })

    return (
        <>
            <div className="btn-group">Sort by: </div>
            <div className="btn-group">
                {buttons}
            </div>
        </>
    )
}

export default Filter;
