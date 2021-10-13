import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

const TodoStyle = styled.div`
  margin: 25px 10%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 75%;

  div {
    flex-grow: 1;
  }
  h5 {
    flex-grow: 4;
  }
`;

const Div = styled.div`
  display: flex;
  flex-grow: 3;
  justify-content: flex-end;
`;

export default function Todo({ todo, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodos);
    } else {
      // update the value of complete on the todo based on clicking complete
      updateTodo({ ...todo, complete: true }).then(setTodos);
      // way to update a single todo based on complete updateTodo(todo.firebaseKey, { complete: true }).then(setTodos);
    }
  };

  return (
    <>
      <TodoStyle className="alert alert-light" role="alert">
        <div>
          {todo.complete ? (
            <i className="fas fa-check-square" />
          ) : (
            <Button
              onClick={() => handleClick('update')}
              type="button"
              className="btn btn-success"
            >
              <i className="far fa-square" />
            </Button>
          )}
        </div>

        <h5>{todo.name}</h5>

        <Div>
          {todo.complete ? (
            ''
          ) : (
            <button
              onClick={() => setEditItem(todo)}
              type="button"
              className="btn btn-info"
            >
              EDIT
            </button>
          )}

          <button
            onClick={() => handleClick('delete')}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </Div>
      </TodoStyle>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
