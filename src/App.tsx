import React, { useEffect } from 'react';
import TodoList from 'components/TodoList';
import styled from "styled-components";
import { GlobalStyle } from "styles/global";
import Input from 'components/UI/Input';
import { v4 as uuidv4 } from 'uuid';
import breakpoints from "styles/breakpoints";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    color: ${({ theme }) => theme.colors.primary };
    background-color: #131A22;
    padding: 10px;
  
    @media only screen and ${breakpoints.device.xs} {
      min-width: 300px;
    }
`;

function App() {
  const [todo, setTodo] = React.useState('');
  const [list, setList] = React.useState<{ id: string, todo: string }[]>(() => {
      // grabbing 'todos' from localstorage
      const savedTodos = localStorage.getItem('todos');

      // if truthy return the list else return empty state
      if (savedTodos) {
          return JSON.parse(savedTodos);
      } else {
          return [];
      }
  });

  // setting the list of todos in local storage on any update to the list of todos
  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (!todo.length) {
          alert('Please enter a todo.');
          return;
      }

      setList((prevState => [{ todo, id: uuidv4() }, ...prevState]));
      setTodo('');

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTodo(event.target.value);

  const handleRemove = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
      <div>
        <GlobalStyle />
        <Container>
          <form onSubmit={handleSubmit}>
              <Input id='todo-id' dataTag='todo-id' maxlength={26} type={undefined} placeholder="Enter a new todo" labelText="Todo Input" value={todo} onChange={handleChange} />
          </form>
          <h3>Total Todos: {list.length}</h3>
        </Container>
        <TodoList list={list} onRemove={handleRemove} />
      </div>
  );
}

export default App;
