import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getTodos = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/todo.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export default getTodos;
