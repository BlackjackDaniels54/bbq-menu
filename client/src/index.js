import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import RegPage from './pages/RegPage/RegPage';
import Login from './pages/LoginPage/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
          <Routes>
                <Route path="/registration" element={<RegPage />} />
                <Route path="/login" element={<Login />} />
                <Route index path="/dashboard" element={<App />} />
          </Routes>
              
    </BrowserRouter>
  </React.StrictMode>
);

