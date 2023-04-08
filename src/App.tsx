import React, { useState, createContext } from 'react';
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
import UserQuestionsPage from './pages/UserQuestionsPage';
import FollowPage from './pages/FollowPage';
import SearchResultPage from './pages/SearchResultPage';

//Admin pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPostsPage from './pages/AdminPostsPage';
import AdminUsersPage from './pages/AdminUsersPage';

//首頁根路由
const basename = process.env.PUBLIC_URL;

export const ModalOpenContext = createContext({
  isModalClosed: true,
  setIsModalClosed: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});

const App: React.FC = () => {
  const [isModalClosed, setIsModalClosed] = useState(false);

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <ModalOpenContext.Provider value={{ isModalClosed, setIsModalClosed }}>
          <Routes>
            <Route path="*" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/regist" element={<RegistPage />} />
            <Route path="/admin_login" element={<AdminLoginPage />} />
            <Route path="/admin_home" element={<AdminPostsPage />} />
            <Route path="/admin_users" element={<AdminUsersPage />} />

            <Route path="/front" element={<Layout />}>
              <Route path="settings" element={<SettingsPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="hot_issue" element={<HotIssuePage />} />
              <Route path="active_users" element={<ActiveUsersPage />} />
              <Route
                path="profile"
                element={<UserProfilePage isOnOthersPage={false} />}
              />
              <Route
                path="profile_others"
                element={<UserProfilePage isOnOthersPage={true} />}
              />
              <Route path="reply" element={<ReplyPage />} />
              <Route
                path="user/all_questions"
                element={<UserQuestionsPage />}
              />
              <Route
                path="user/liked_questions"
                element={<UserQuestionsPage />}
              />
              <Route
                path="user/replied_questions"
                element={<UserQuestionsPage />}
              />
              <Route path="user/follow" element={<FollowPage />} />
              <Route path="search_results" element={<SearchResultPage />} />
            </Route>
          </Routes>
        </ModalOpenContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
