import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { FirebaseContext } from './store/Context';
import Context from './store/Context';
import Firebase from './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={Firebase}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);