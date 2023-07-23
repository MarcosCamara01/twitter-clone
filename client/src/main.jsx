import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./assets/css/styles.css";
import "./assets/css/normalize.css";
import "./assets/css/responsive.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
