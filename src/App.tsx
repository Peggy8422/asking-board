import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Users pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistPage from './pages/RegistPage';
import Layout from './components/Layout';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
//Admin pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPostsPage from './pages/AdminPostsPage';
import AdminUsersPage from './pages/AdminUsersPage';


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
          <Route path='/admin_users' element={<AdminUsersPage />} />
          <Route path='/front' element={<Layout />}>
            <Route path='settings' element={<SettingsPage />} />
            <Route path='home' element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
