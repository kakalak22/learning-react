import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import Movies from './components/movies';

ReactDOM.render(
  <React.StrictMode>
    <Movies />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
