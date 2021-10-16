import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getTodos = (value) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/todo.json?orderBy="complete"&equalTo=${value}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getCompletedTodos = () => new Promise((resolve, reject) => {
  getTodos(true)
    .then((todoArray) => resolve(todoArray))
    .catch(reject);
});

const createTodo = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/todo.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/todo/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getTodos(false).then(resolve);
        });
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/todo/${firebaseKey}.json`)
    .then(() => getTodos(false).then(resolve))
    .catch(reject);
});

const deleteCompletedTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/todo/${firebaseKey}.json`)
    .then(() => getCompletedTodos().then(resolve))
    .catch(reject);
});

// Second way to write updateTodo if only using to update one item.
// const updateTodo = (firebaseKey, newState) => new Promise((resolve, reject) => {
//   axios.patch(`${dbUrl}/todo/${firebaseKey}.json`, newState)
//     .then(() => {
//       getTodos().then(resolve);
//     })
//     .catch(reject);
// });

const updateTodo = (todoObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/todo/${todoObj.firebaseKey}.json`, todoObj)
    .then(() => {
      getTodos(false).then(resolve);
    })
    .catch(reject);
});

export {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getCompletedTodos,
  deleteCompletedTodo,
};
