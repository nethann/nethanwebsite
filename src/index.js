import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Global/Nav.css"
import "./CSS/Global/Global.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
