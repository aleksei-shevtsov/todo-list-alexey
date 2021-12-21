import React, { useState, useRef, useEffect } from "react";

const ModalContent = props => {

  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [titleText, setTitleText] = useState(props.todo.title);
  const [isCompleted, setIsCompleted] = useState(props.todo.completed);

  const classes = []

  if (props.todo.completed) {
    classes.push('text-decoration-line-through')
  }

  function handleChange(event) {
    setIsCompleted(event.target.checked);
  }

  function updateHandler() {
    props.updateTodo(titleText, isCompleted, props.todo.id)
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

  function syncBtn(todo) {
    console.log(`
      This is id: ${todo.id},
      This is title: ${todo.title},
      Is todo completed: ${todo.completed}
    `)
    updateHandler()
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
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <strong>{props.index + 1}</strong>
        <span className={"list-group-item-label " + classes.join(' ')}>
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
        <input type="text" className="list-group-item-input" defaultValue="DefValue" />
        <div className='d-flex justify-content-center align-items-center'>
          <button type="button"
            className="btn-sync btn-sm "
            onClick={() => syncBtn(props.todo)}>
            <i class="fas fa-sync-alt"></i>
          </button>
          <button type="button"
            className="btn-trash btn-sm ">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  )
}

export default ModalContent;
