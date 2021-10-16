import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Navigation from '../components/Navigation';
import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  color: white;
  margin: 50px;
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <Navigation />
      <H1>You - DO</H1>
      <TodoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />
      {todos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ))}
    </>
  );
}

export default Initialize;
