import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa

import HomePage from './pages/homepage/homepage.component';
import './App.css';

const HatsPage = () => <h1>Hats Page</h1>;

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
