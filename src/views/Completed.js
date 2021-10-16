import React, { useEffect, useState } from 'react';
import { deleteCompletedTodo, getCompletedTodos } from '../api/data/todoData';

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getCompletedTodos().then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompletedTodo(key).then(setCompletedTodos);
  };

  return (
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
  );
}
