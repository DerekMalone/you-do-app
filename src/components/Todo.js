import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

export default function Todo({ todo }) {
  return (
    <>
      <Alert color="light">
        <button type="button" className="btn btn-success">
          Complete
        </button>
        {todo.name}
        <button type="button" className="btn btn-danger">
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
    uid: PropTypes.string,
  }).isRequired,
};
