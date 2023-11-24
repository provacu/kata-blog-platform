import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import ArticlesList from './features/articles/articlesList';
import ArticlePage from './features/articlePage/articlePage';
import RegisterForm from './features/auth/registerForm';
import LoginForm from './features/auth/loginForm';
import ProfileForm from './features/auth/profileForm';
import Header from './components/header/header';
import NewArticleForm from './features/newArticleForm/newArticleForm';
import EditArticleForm from './features/articleControl/articleControlForm';
import { fetchCurrentUser } from './features/auth/authSlice';
import './App.scss';

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.authentication);
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
  }, [dispatch, token]);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/sign-in" element={<LoginForm />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <NewArticleForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <EditArticleForm />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

PrivateRoute.defaultProps = {
  children: null,
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
