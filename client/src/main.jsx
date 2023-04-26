import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./assets/css/normalize.css";
import "./assets/css/styles.css";
import "./assets/css/responsive.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
