import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getTodos } from '../api/data/todoData';
import Navigation from '../components/Navigation';
import TodoForm from '../components/TodoForm';
import SignIn from '../views/SignIn';
import Routes from '../routes';

const Container = styled.div`
  width: 60%;
  margin: 25px 20%;

  h1 {
    display: flex;
    justify-content: center;
    color: white;
    margin: 50px;
  }
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profile: authed.photoURL,
          uid: authed.uid,
        };
        setUser(userInfoObj);
        getTodos(false).then(setTodos);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Navigation />
          <h1>You - DO</h1>
          <TodoForm
            obj={editItem}
            setTodos={setTodos}
            setEditItem={setEditItem}
          />
          <Routes todos={todos} setTodos={setTodos} setEditItem={setEditItem} />
        </>
      ) : (
        <SignIn />
      )}
    </Container>
  );
}

export default Initialize;
