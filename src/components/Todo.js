import React, { useRef } from 'react'
import styled from 'styled-components';

const StyledTodo = styled.div`
  background-color: ${props => props.theme.todoBgColor};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  position: relative;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.lineColor};
  padding: 1.5rem;
  align-items: center;
  z-index: 1;

  &:hover {
    box-shadow: 0px 5px 22px -13px rgba(0,0,0,0.35);
    z-index: 100;
  }

  &:hover .todo__btns-container .todo__edit-btn,
  &:hover .todo__btns-container .todo__delete-btn, 
  &:hover .todo__btns-container .todo__save-btn {
  opacity: 100;
}

  .todo__text-container {
    width: 100%;
    color: ${props => props.theme.fontColor};
    font-size: 18px;
  }

  .todo__checkbox-label {
    display: flex;
    align-items: center;
    margin-right: 15px;
    background-color: ${props => props.theme.todoBgColor};
    align-items: center;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: solid 2px transparent;
    background-clip: padding-box;
  }

  .todo__checkbox-label::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: ${props => props.theme.checkBoxBorder};
    border-radius: 100px;
    margin: -2px;
    width: 20px;
    height: 20px;
    z-index: -1;
    transition: all .3s;
  }
`;

export default function Todo(props) {
  const {
    todo,
    handleCompletedTask,
    handleUpdateTask,
    handleDeleteTask,
  } = props;

  const todoText = useRef();
  const todoInput = useRef();
  const saveBtn = useRef();
  const editBtn = useRef();

  function handleChange() {
    handleCompletedTask(todo.id);
    if(todoText.current.classList.contains('done')) {
      todoText.current.classList.remove('done');
    } else {
      todoText.current.classList.add('done');
    }
  }

  function handleEdit() {
    todoInput.current.value = todoText.current.innerHTML;
    todoText.current.classList.add('hidden');
    todoInput.current.classList.remove('hidden');
    todoInput.current.focus();
    saveBtn.current.classList.remove('hidden')
    editBtn.current.classList.add('hidden')
  }

  function handleUpdate() {
    handleUpdateTask(todo.id, todoInput.current.value)
    todoText.current.classList.remove('hidden');
    todoInput.current.classList.add('hidden');
    saveBtn.current.classList.add('hidden')
    editBtn.current.classList.remove('hidden')
  }

  function handleDelete() {
    handleDeleteTask(todo.id);
  }

  return (
    <StyledTodo>
      <div className="todo__checkbox-container">
        <input 
          className="todo__checkbox" 
          type="checkbox" 
          id={todo.id} 
          checked={todo.done}
          onChange={handleChange}
        />
        <label className="todo__checkbox-label" htmlFor={todo.id}></label> 
      </div>
      <div className="todo__text-container">
        <p
          ref={todoText}
          className={todo.done ? 'todo__text done' : 'todo__text'} 
        >{todo.text}</p>
        <input 
          ref={todoInput}
          className="todo__text-edit hidden" 
          type="text" />
      </div>
      <div className="todo__btns-container">
        <button
          ref={editBtn}
          onClick={handleEdit}
          className="todo__btn todo__edit-btn">
          <svg className="todo__btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.13 194.17"><title>edit</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="edit"><path d="M186.16,66.82,63.59,189.39,21.4,194.05A19.28,19.28,0,0,1,.12,172.77l4.67-42.19L127.35,8A27.24,27.24,0,0,1,166,8l20.16,20.16a27.33,27.33,0,0,1,0,38.64ZM140,81.25,112.93,54.13,26.21,140.89,22.8,171.37,53.28,168Zm30.25-37.2L150.13,23.88a4.88,4.88,0,0,0-6.91,0L128.8,38.31l27.11,27.11L170.34,51A5,5,0,0,0,170.29,44.05Z"/></g></g></g></svg>
        </button>
        <button 
          ref={saveBtn} 
          className="todo__btn todo__save-btn hidden"
          onClick={handleUpdate} >
          <svg className="todo__btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206.67 206.67"><title>save</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M184.52,0H22.14A22.14,22.14,0,0,0,0,22.14V184.52a22.15,22.15,0,0,0,22.14,22.15H184.52a22.15,22.15,0,0,0,22.15-22.15V22.14A22.15,22.15,0,0,0,184.52,0Zm0,184.52H22.14V22.14H184.52ZM168,73,88.36,152a5.53,5.53,0,0,1-7.83,0L38.66,109.74a5.53,5.53,0,0,1,0-7.83L49.17,91.52a5.54,5.54,0,0,1,7.83,0l27.58,27.81,65.21-64.69a5.52,5.52,0,0,1,7.82,0L168,65.19A5.53,5.53,0,0,1,168,73Z"/></g></g></svg>
        </button>
        <button 
          className="todo__btn todo__delete-btn"
          onClick={handleDelete}>
          <svg className="todo__btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.98 235.41"><title>delete</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="delete"><path d="M123.22,191.27h11a5.52,5.52,0,0,0,5.51-5.52V86.44a5.52,5.52,0,0,0-5.51-5.52h-11a5.52,5.52,0,0,0-5.52,5.52v99.31A5.52,5.52,0,0,0,123.22,191.27ZM198.63,36.78H160.74L145.1,10.71A22.07,22.07,0,0,0,126.17,0H79.81A22.08,22.08,0,0,0,60.89,10.71L45.25,36.78H7.36A7.36,7.36,0,0,0,0,44.14V51.5a7.35,7.35,0,0,0,7.36,7.35h7.35V213.34a22.07,22.07,0,0,0,22.07,22.07H169.2a22.07,22.07,0,0,0,22.07-22.07h0V58.85h7.36A7.35,7.35,0,0,0,206,51.5V44.14A7.36,7.36,0,0,0,198.63,36.78ZM79.16,23.41a2.77,2.77,0,0,1,2.38-1.34h43.21a2.77,2.77,0,0,1,2.37,1.34l8,13.37h-64Zm90,189.93H36.78V58.85H169.2ZM71.73,191.27h11a5.52,5.52,0,0,0,5.52-5.52V86.44a5.52,5.52,0,0,0-5.52-5.52h-11a5.52,5.52,0,0,0-5.52,5.52v99.31A5.52,5.52,0,0,0,71.73,191.27Z"/></g></g></g></svg>
        </button>
      </div>
    </StyledTodo>
  )
}
