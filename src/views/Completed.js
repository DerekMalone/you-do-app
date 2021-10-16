import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteCompletedTodo, getCompletedTodos } from '../api/data/todoData';

const Completestyle = styled.div`
  margin: 25px 10%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 75%;
  radius: 10%;

  div {
    flex-grow: 1;
  }
  h5 {
    flex-grow: 4;
  }
`;

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getCompletedTodos().then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompletedTodo(key).then(setCompletedTodos);
  };

  return (
    <Completestyle>
      <div>
        {completedTodos.map((completedTodo) => (
          <div
            key={completedTodo.firebaseKey}
            className="d-flex justify-content-between alert alert-light"
            role="alert"
          >
            {completedTodo.name}
            <button
              onClick={() => handleClick(completedTodo.firebaseKey)}
              className="btn btn-danger"
              type="button"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </Completestyle>
  );
}
