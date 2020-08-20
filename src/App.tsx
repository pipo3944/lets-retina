import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from 'components/Home';
import MainHeader from 'components/header/MainHeader';
import { Switch, Route, Redirect } from 'react-router';
import paths from 'paths';
import Policy from 'components/Policy';

function App() {
  return (
    <>
      <MainHeader />
      <div className="App">
        <Switch>
          <Route path={paths.home} component={Home} exact />
          {/* <Route path={paths.policy} component={Policy} /> */}

          <Redirect to={paths.home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
