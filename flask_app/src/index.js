import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Baby from './baby'
import reportWebVitals from './reportWebVitals';

const Message=()=>{
  document.getElementById('area').innerHTML = 'clicked';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Baby/>
    <div id="area"></div>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
