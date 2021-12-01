import React from 'react';

const ContentModal = () => {
    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
                <input
                    type="checkbox"
                    checked={JSON.parse(localStorage.getItem('Completed'))}
                    onChange={() => localStorage.getItem('ID')}
                />
                <strong>ID</strong>
                <span className="list-group-item-label">ewrwer</span>
                <input type="text" className="list-group-item-input" defaultValue="DefValue" />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-trash btn-sm "
                    // onClick={() => removeTodo(localStorage.getItem('ID'))}
                    >
                    <i className="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default ContentModal;

