import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './themes';
import "../style/main.css"
import AddTodo from './AddTodo'
import TodoList from './TodoList';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

const StyledApp = styled.div`
  .banner {
    background-image: linear-gradient(200deg, rgba(85,150,255,0.6) 0%, rgba(172,45,235,0.6) 100%), ${props => props.theme.bannerImg};
  }
`;

function App() {
  
  const LOCAL_STORAGE_TODOS = 'todos';
  const LOCAL_STORAGE_THEME = 'theme';
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light')
  const themeToggle = useRef();
  const bannerImg = useRef();
  
  function handleCompletedTask(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.done = !todo.done;
    setTodos(newTodos);
  }

  function handleClearCompletedTask() {
    const currentTodos = [...todos];
    const newTodos = currentTodos.filter(todo => !todo.done);
    setTodos(newTodos);
  }

  function handleAddTodo(str) {
    if(str === '' || str === "Create a new task") return;
    const text = str;
    const id = new Date().getTime();
    setTodos([...todos, { id, text, done: false }]);
  }

  function handleUpdateTask(id, str) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.text = str;
    setTodos(newTodos);
  }

  function handleDeleteTask(id) {
    const currentTodos = [...todos];
    const newTodos = currentTodos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  function handleTheme() {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS))
    const storedTheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME))
    if(storedTodos) setTodos(storedTodos)
    if(storedTheme) setTheme(storedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS,  JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME,  JSON.stringify(theme))
  }, [theme])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <div className="wrapper">
          <div 
            ref={bannerImg}
            className="banner"
          ></div>
          <div className="container">
            <div className="header">
              <h1 className="header__title">TODO</h1>
              <div>
                <input 
                  ref={themeToggle}
                  className='theme__toggle-checkbox hidden'
                  type="checkbox"
                  id="theme"
                  onChange={handleTheme}
                  />
                <label className='theme__toggle-label' htmlFor="theme"></label>
              </div>
            </div>
            <AddTodo handleAddTodo={handleAddTodo} />
            <TodoList 
              todos={todos}
              handleCompletedTask={handleCompletedTask}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              handleClearCompletedTask={handleClearCompletedTask}
            />
            <p className="aux-text">Drag and drop to reorder list</p>
          </div>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;