import React from 'react';
import ReactDOM from 'react-dom';
import { db } from './lib/firebase';
import FirebaseContext from './context/FirebaseContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{ db }}>
    <h1 className="text-red-500">Hello, World</h1>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);