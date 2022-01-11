import React from 'react';
import './modal.css';

const Modal = ({active, setActive, children}) => {

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            {/* stopPropagation makes that window dont close by click on content section. Only click on background closing window */}
            <div className="modal__content" onClick={event => event.stopPropagation()}> 
                {children}
            </div>
        </div>
    )
}

export default Modal;