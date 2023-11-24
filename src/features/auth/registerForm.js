/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from './authSlice';
import './registerForm.scss';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('Account is successfully created!', {
        position: 'bottom-right',
      });
      navigate('/sign-in');
    } catch (error) {
      const errorMessage = error?.message || 'Unknown registration error';
      toast.error(errorMessage, { position: 'bottom-right' });
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="register-form__title">Create new account</h1>
      <div className="register-form__container">
        <label className="register-form__label" htmlFor="username">
          Username
          <input
            placeholder="Username"
            className="register-form__input"
            id="username"
            {...register('username', {
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message:
                  'You can only use lowercase English letters and numbers',
              },
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must have at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must have no more than 20 characters',
              },
            })}
          />
        </label>
        {errors.username && (
          <p className="register-form__error">{errors.username.message}</p>
        )}
      </div>

      <div className="register-form__container">
        <label className="register-form__label" htmlFor="email">
          Email address
          <input
            placeholder="Email address"
            className="register-form__input"
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
          <p className="register-form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="register-form__container">
        <label className="register-form__label" htmlFor="password">
          Password
          <input
            placeholder="Password"
            className="register-form__input"
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must have no more than 40 characters',
              },
            })}
          />
        </label>
        {errors.password && (
          <p className="register-form__error">{errors.password.message}</p>
        )}
      </div>

      <div className="register-form__container">
        <label className="register-form__label" htmlFor="repeatPassword">
          Repeat Password
          <input
            placeholder="Repeat password"
            className="register-form__input"
            id="repeatPassword"
            type="password"
            {...register('repeatPassword', {
              validate: (value) =>
                value === watch('password') || 'The passwords do not match',
            })}
          />
        </label>
        {errors.repeatPassword && (
          <p className="register-form__error">
            {errors.repeatPassword.message}
          </p>
        )}
      </div>

      <div className="register-form__container">
        <label className="register-form__checkbox" htmlFor="agree">
          <input
            className="register-form__input"
            id="agree"
            type="checkbox"
            {...register('agree', {
              required: 'You must agree to the terms',
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agree && (
          <p className="register-form__error">{errors.agree.message}</p>
        )}
      </div>

      <button className="register-form__button" type="submit">
        Create
      </button>
      <Link className="register-form__link" to="/sign-in">
        Already have an account? <span>Sign in.</span>
      </Link>
    </form>
  );
}

export default RegisterForm;
