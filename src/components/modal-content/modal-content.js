import React, { useState, useRef, useEffect, useContext } from "react";
import Context from "../../context"
import "./modal-content.css";

const ModalContent = props => {

  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [titleText, setTitleText] = useState(props.todo.title);
  const [isCompleted, setIsCompleted] = useState(props.todo.completed);
  const [isShowNotice, setIsShowNotice] = useState(false);
  const {removeTodo} = useContext(Context)

  const classes = []

  if (props.todo.completed) {
    classes.push('text-decoration-line-through')
  }

  function handleChange(event) {
    setIsCompleted(event.target.checked);
  }

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
    }
  }

  function escOrEnterForInputInvisible(event) {
    if (event.key === "Escape" || event.key === "Enter") {
      setInputVisible(false)
    }
  }

  function updateHandler() {
    props.updateTodo(titleText, isCompleted, props.todo.id)
    console.log('props.todo.id', props.todo.id)
  }

  function syncBtn(todo) {
    console.log(`
      This is id: ${todo.id},
      This is title: ${todo.title},
      This is titleText: ${titleText},
      Is todo completed: ${todo.completed}
    `)
    updateHandler();
    setIsShowNotice(true);
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
      document.addEventListener("keydown", escOrEnterForInputInvisible)
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
      document.removeEventListener("keydown", escOrEnterForInputInvisible)
    };
  });

  return (
    <>
    {isShowNotice && setTimeout(() => {setIsShowNotice(false)}, 2000) ? <Notice/> : null}
    <ul id="modal-content" className="list-group">
      <li className="list-group-item d-flex justify-content-between">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <strong>{props.index + 1}</strong>
        <span id="modal-title" className={"list-group-item-label " + classes.join(' ')}>
          {inputVisible ? (
            <input
              ref={inputRef} // Set the Ref
              value={titleText} // Now input value uses local state
              onChange={e => {
                setTitleText(e.target.value);
              }}
            />
          ) : (
            <span onClick={() => setInputVisible(true)}>{titleText}</span>
          )}
        </span>
        {/* <input type="text" className="list-group-item-input" defaultValue="DefValue" /> */}
        <div className='d-flex justify-content-center align-items-center'>
          <button type="button"
            className="btn-sync btn-sm "
            onClick={() => syncBtn(props.todo)}>
            <i class="fas fa-sync-alt"></i>
          </button>
          <button type="button"
            className="btn-trash btn-sm "
            onClick={() => removeTodo(props.todo.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
    </>
  )
}

export default ModalContent;

export const Notice = () => {

  return (
    <div className="notice">
      Updated
    </div>
  )

}
