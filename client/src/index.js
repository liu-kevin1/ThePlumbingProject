import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Auth0Provider
  // audience="https://dev-bh0d0r0nk8n1svw.us.auth0.com"
  cacheLocation="localstorage"
  domain= "dev-bh0d0r0nk8n1svwf.us.auth0.com"
  clientId= "hljLjyws5AJTCoNyZxFtG9F4HqS53e6P"
  redirectUri="http://localhost:3000"
>
  <App />
</Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
