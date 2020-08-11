import React from 'react';
import { logo } from '../../images';
import './App.css';
import { useAuthDataContext, } from '../../utils/AuthDataProvider';

const App = () => {
  const { onLogout, user }: any = useAuthDataContext();

  console.log("user in route", user);
  console.log("useAuthDataContext() in route", useAuthDataContext());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{user ? user.name : ""}</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={onLogout}>Log out</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
