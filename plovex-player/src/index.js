import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import { Videosprovider } from "./Context"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Videosprovider>
        <App />
      </Videosprovider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

