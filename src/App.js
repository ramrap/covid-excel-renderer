import logo from './logo.svg';
import React from 'react'
import { Switch, Route , BrowserRouter} from "react-router-dom"
import Homepage from './pages/Homepage'

import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';

function App() {
  return (
    <BrowserRouter>
     <Switch>
      <Route path="/" component={Homepage} />
    </Switch></BrowserRouter>
   
  );
}

export default App;
