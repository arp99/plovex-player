import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Videosprovider } from "./Context"


ReactDOM.render(
  <React.StrictMode>
      <Videosprovider>
        <App />
      </Videosprovider>
  </React.StrictMode>,
  document.getElementById('root')
);

