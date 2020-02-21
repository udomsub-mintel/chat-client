import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path='/chat' component={Chat} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
