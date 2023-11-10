import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import BaseLayout from './components/layout/BaseLayout';
import Watchlist from './components/Watchlist';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Redirects to /home so there is a query string parameter for the "firstname field". Default is "home"
if(window.location.href ===  "http://localhost:3000/"){
  window.location.href = "http://localhost:3000/home"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> //todo uncomment
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/:firstName" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BaseLayout>
    </Router>
  // </React.StrictMode>
);

