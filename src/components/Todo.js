import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

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
      <Alert color="light">
        {todo.complete ? (
          'Done'
        ) : (
          <button
            onClick={() => handleClick('update')}
            type="button"
            className="btn btn-success"
          >
            Complete
          </button>
        )}

        {todo.name}

        <button
          onClick={() => setEditItem(todo)}
          type="button"
          className="btn btn-info"
        >
          EDIT
        </button>

        <button
          onClick={() => handleClick('delete')}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </Alert>
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
