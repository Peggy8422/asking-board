import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistPage from './pages/RegistPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPostsPage from './pages/AdminPostsPage';
//test

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/regist' element={<RegistPage />} />
          <Route path='/admin_login' element={<AdminLoginPage />} />
          <Route path='/admin_home' element={<AdminPostsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
