import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import styled from 'styled-components';
import { createTodo, updateTodo } from '../api/data/todoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
  catagory: '',
};

const FormStyle = styled.form`
  display: flex;
  justify-content: center;

  input {
    width: 35rem;
    height: 100%;
    border-radius: 5px;
  }
`;

export default function TodoForm({ obj, setTodos, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectorInput, setSelectorInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
        catagory: selectorInput,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput({ ...initialState });
    setSelectorInput({ ...initialState });
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // updates the todo
      updateTodo(formInput).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        // update the DOM with the new todo
        setTodos(todos);
        // reset the form
        resetForm();
      });
    }
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            name="name"
            id="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="Add a You-Do"
            required
          />
        </label>
        {
          <select
            value={setSelectorInput}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        }{' '}
        <button type="submit" className="btn btn-success">
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
      </FormStyle>
    </>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    catagory: PropTypes.string,
  }),
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoForm.defaultProps = { obj: {} };
