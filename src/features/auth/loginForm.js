/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './authSlice';
import './loginForm.scss';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('You logged in successfully!', {
        position: 'bottom-right',
      });
      navigate('/articles');
    } catch (error) {
      const errorMessage = error?.message || 'Unknown login error';
      toast.error(errorMessage, { position: 'bottom-right' });
    }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login-form__title">Sign In</h1>

      <div className="login-form__container">
        <label className="login-form__label" htmlFor="email">
          Email address
          <input
            placeholder="Email address"
            className="login-form__input"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email is not in correct format',
              },
            })}
          />
        </label>
        {errors.email && (
          <p className="login-form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="login-form__container">
        <label className="login-form__label" htmlFor="password">
          Password
          <input
            placeholder="Password"
            className="login-form__input"
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
          />
        </label>
        {errors.password && (
          <p className="login-form__error">{errors.password.message}</p>
        )}
      </div>

      <button className="login-form__button" type="submit">
        Login
      </button>
      <Link className="login-form__link" to="/sign-up">
        Don&apos;t have an account? <span>Sign Up.</span>
      </Link>
    </form>
  );
}
