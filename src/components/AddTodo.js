import React, { useRef } from 'react'
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.todoBgColor};
  padding: 1.5rem;
  border-radius: .25rem;
  margin-bottom: 2rem;
  width: 100%;

  .add-todo__button:hover {
    color: ${props => props.theme.hoverColor};
  }
`;

export default function AddTodo({ handleAddTodo }) {

  const inputText = useRef();

  function handleBtnClick() {
    handleAddTodo(inputText.current.value);
    inputText.current.value = 'Create a new task';
  }

  function handleInputClick() {
    if(inputText.current.defaultValue === "Create a new task") {
      inputText.current.value = ""
    }

    if(inputText.current.value === "Create a new task") {
      inputText.current.value = ""
    }
  }

  return (
    <StyledContainer className="add-todo__container">
      <input 
        ref={inputText}
        className="add-todo__input" 
        type="text"
        defaultValue="Create a new task"
        onClick={handleInputClick}
      />
      <button 
        className="add-todo__button"
        onClick={handleBtnClick}
      >Add</button>
    </StyledContainer>
  )
}
