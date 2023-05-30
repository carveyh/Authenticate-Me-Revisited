import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
// import { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import { useEffect } from 'react';

const store = configureStore();

// let store;

// useEffect(() => {
//   store = configureStore();
// }, [])

if(process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
  );
}

console.log("X-CSRF-Token", sessionStorage.getItem("X-CSRF-Token")===null)
console.log("currentUser", sessionStorage.getItem("currentUser")===null)

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  // restoreCSRF().then(renderApplication);
  // restoreSession().then(renderApplication); // This won't work since restoreSession() is now a thunk action creator, so need to dispatch it like you normally would
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}