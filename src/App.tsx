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
import HotIssuePage from './pages/HotIssuePage';
import ActiveUsersPage from './pages/ActiveUsersPage';
import UserProfilePage from './pages/UserProfilePage';
import ReplyPage from './pages/ReplyPage';
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
            <Route path='hot_issue' element={<HotIssuePage />} />
            <Route path='active_users' element={<ActiveUsersPage />} />
            <Route path='profile' element={<UserProfilePage />} />
            <Route path='reply' element={<ReplyPage
              title='關於....解法?'
              category='國中一年級數學'
              likedCount={500}
              isLiked={false}
              avatar='1234'
              userName='Peggy'
              account='peggy_test'
              identity='學生'
              createdAt='5秒前'
              content='123456789'
              replyCount={7}
            />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
