import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { logout } from '../../features/auth/authSlice';
import './header.scss';
import notApplicable from '../../helpers/Not_applicable.png';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication) || {};

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You logged out successfully!', {
      position: 'bottom-right',
    });
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          Realworld Blog
        </Link>
        <div className="header__links">
          {user ? (
            <>
              <Button
                href="/new-article"
                className="header__create-article-button"
                type="default"
                size="large"
                style={{ color: '#52C41A', border: '1px solid #52C41A' }}
              >
                Create article
              </Button>
              <Button
                href="/profile"
                className="header__username"
                style={{
                  boxShadow: 'none',
                  marginRight: '10px',
                  border: 'none',
                  fontSize: '18px',
                }}
              >
                {user.username}
              </Button>
              <Link to="/profile">
                <img
                  src={user.image || notApplicable}
                  alt="Avatar"
                  className="header__user-avatar"
                />
              </Link>
              <Button
                onClick={handleLogout}
                className="header__logout-button"
                type="default"
                size="large"
                style={{ color: 'black', border: '1px solid black' }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <div className="header__buttons">
              {location.pathname !== '/sign-in' && (
                <Button
                  href="/sign-in"
                  className="header__sign-in-button"
                  type="button"
                  size="large"
                  style={{ marginRight: '10px' }}
                >
                  Sign In
                </Button>
              )}
              {location.pathname !== '/sign-up' && (
                <Button
                  href="/sign-up"
                  className="header__sign-up-button"
                  type="default"
                  size="large"
                  style={{ color: '#52C41A', border: '1px solid #52C41A' }}
                >
                  Sign Up
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
