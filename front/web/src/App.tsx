import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import './assets/logo.svg';
import {Route} from 'wouter';
import Assign from './pages/Assign';
import NewTask from './pages/NewTask';
import NewCommand from './pages/NewCommand';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Route path="/" component={Home} />
      <Route path="/tasks/new" component={NewTask} />
      <Route path="/commands/new" component={NewCommand} />
      <Route path="/tasks/assign/:page?">{params => <Assign page={params.page} />}</Route>
    </div>
  );
};

export default App;
