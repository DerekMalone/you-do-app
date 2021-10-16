import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Navigation from '../components/Navigation';
import TodoForm from '../components/TodoForm';
import Routes from '../routes';

const Container = styled.div`
  width: 60%;
  margin: 25px 20%;

  h1 {
    display: flex;
    justify-content: center;
    color: white;
    margin: 50px;
  }
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos(false).then(setTodos);
  }, []);

  return (
    <Container>
      <Navigation />
      <h1>You - DO</h1>
      <TodoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />
      <Routes todos={todos} setTodos={setTodos} setEditItem={setEditItem} />
    </Container>
  );
}

export default Initialize;
