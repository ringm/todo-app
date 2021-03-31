import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Todo from './Todo';
import FilterButton from './FilterButton'

const StyledTodoList = styled.div`
  background-color: ${props => props.theme.todoBgColor};
  border-radius: 0.25rem;
  box-shadow: 0px 12px 30px 0px rgba(0,0,0,0.1);
  width: 100%;
  margin-bottom: 2rem;
  position: relative;

  .footer__btn:hover {
    color: ${props => props.theme.hoverColor}
  }
`;

export default function TodoList(props) {

  const [activeFilter, setActiveFilter] = useState('All');

  const {
    todos,
    handleCompletedTask,
    handleUpdateTask,
    handleDeleteTask,
    handleClearCompletedTask,
  } = props;

  const todosLeft = todos.reduce((acc, todo) => {
    return todo.done ? acc + 0 : acc + 1;
  }, 0);

  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos)
  }, [todos]);

  function handleFilter(e) {
    console.log(e)
    const currentFiltered = [...todos];
    switch (e.target.innerHTML) {
      case 'Active':
        const filterActive = currentFiltered.filter(todo => !todo.done)
        e.target.classList.add('active')
        setFilteredTodos(filterActive)
        setActiveFilter(e.target.innerHTML)
        break;
      case 'Completed':
        const filterCompleted = currentFiltered.filter(todo => todo.done)
        setFilteredTodos(filterCompleted)
        setActiveFilter(e.target.innerHTML)
        break;
      default:
        setFilteredTodos(todos)
        setActiveFilter(e.target.innerHTML)
    }
  }

  function handleClearCompleted() {
    handleClearCompletedTask()
  }

  function handleOnDragEnd(result) {
    if(!result.destination) return;
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFilteredTodos(items)
  }

  return (
    <StyledTodoList>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todolist">
          {(provided) => (
            <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
            {
              filteredTodos.map((todo, index) => 
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index} >
                  {(provided) => (
                    <li                         
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      <Todo 
                        todo={todo} 
                        handleCompletedTask={handleCompletedTask} 
                        handleUpdateTask={handleUpdateTask}
                        handleDeleteTask={handleDeleteTask}
                      />
                    </li>
                    )}
                </Draggable>
            )}
            {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </ DragDropContext>
      <div className="todo-list__footer">
        <p>{todosLeft} item(s) left</p>
        <div className="filter-btns__container">
          <FilterButton 
            key={1}
            handleFilter={handleFilter} 
            text={'All'} 
            color={activeFilter}
          />
          <FilterButton
            key={2}
            handleFilter={handleFilter} 
            text={'Active'} 
            color={activeFilter}
          />
          <FilterButton
            key={3}
            handleFilter={handleFilter} 
            text={'Completed'} 
            color={activeFilter}
          />
        </div>
        <button 
          className="footer__btn"
          onClick={handleClearCompleted}
          >Clear Completed</button>
      </div>
    </StyledTodoList>
  )
}
