import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { db } from './lib/firebase';
import FirebaseContext from './context/FirebaseContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{ db }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);