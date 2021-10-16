import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../components/Todo';

export default function Home({ todos, setTodos, setEditItem }) {
  return (
    <div className="mt-5">
      {todos.length ? (
        todos.map((todo) => (
          <Todo
            key={todo.firebaseKey}
            todo={todo}
            setTodos={setTodos}
            setEditItem={setEditItem}
          />
        ))
      ) : (
        <h3>Add a You Do!</h3>
      )}
    </div>
  );
}

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
