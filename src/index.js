import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import { Videosprovider , SearchDataProvider , ThemeProvider } from "./Context"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SearchDataProvider >
        <Videosprovider>
          <ThemeProvider >
            <App />
          </ThemeProvider>
        </Videosprovider>
      </SearchDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);