import React from 'react';
import './filter.css';

/* ------------------------------ */

// component not used yet

/* ------------------------------ */

const Filter = () => {
    return (
        <div className="btn-group">
            <button
                className="btn btn-light"
                type="button">
                    By name
            </button>
            <button
                className="btn btn-outline-light"
                type="button">
                    By date
            </button>
        </div>
    )
}

export default Filter;