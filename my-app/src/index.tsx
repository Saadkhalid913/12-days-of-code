import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.minimal.css';
toast.configure()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
