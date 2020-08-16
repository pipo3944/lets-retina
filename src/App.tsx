import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from 'components/Home';
import MainHeader from 'components/header/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <div className="App">
        <Home />
      </div>
    </>
  );
}

export default App;
