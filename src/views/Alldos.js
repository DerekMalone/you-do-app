/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllTodos } from '../api/data/todoData';
import Todo from '../components/Todo';

export default function Alldos({ todos, setTodos, setEditItem }) {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos(todos).then(setAllTodos);
  }, []);

  return (
    <div className="mt-5">
      {allTodos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ))}
    </div>
  );
}

Alldos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
