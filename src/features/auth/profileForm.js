/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from './authSlice';
import './profileForm.scss';

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication) || {};
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      image: data.image,
      password: data.newPassword,
    };

    try {
      await dispatch(updateUserProfile(userData)).unwrap();
      navigate('/');
      toast.success('Your profile was updated!', {
        position: 'bottom-right',
      });
    } catch (error) {
      const errorMessage = error?.message || 'Failed to update profile';

      toast.error(errorMessage, { position: 'bottom-right' });
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="profile-form__title">Edit Profile</h1>

      <div className="profile-form__field">
        <label htmlFor="username" className="profile-form__label">
          Username
          <input
            placeholder="Username"
            className="profile-form__input"
            id="username"
            defaultValue={user.username}
            {...register('username', {
              required: true,
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message:
                  'You can only use lowercase English letters and numbers',
              },
              minLength: {
                value: 3,
                message: 'Username must have at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must have no more than 20 characters',
              },
            })}
          />{' '}
        </label>
        {errors.username && (
          <p className="profile-form__error">Put a valid username</p>
        )}
      </div>

      <div className="profile-form__field">
        <label htmlFor="email" className="profile-form__label">
          Email address
          <input
            placeholder="Email address"
            className="profile-form__input"
            id="email"
            defaultValue={user.email}
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </label>
        {errors.email && (
          <p className="profile-form__error">Email is required</p>
        )}
      </div>

      <div className="profile-form__field">
        <label htmlFor="password" className="profile-form__label">
          New password (optional)
          <input
            placeholder="New password"
            className="profile-form__input"
            id="password"
            type="password"
            {...register('newPassword', {
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
      </div>

      <div className="profile-form__field">
        <label htmlFor="image" className="profile-form__label">
          Avatar image (url)
          <input
            placeholder="Avatar image (url)"
            className="profile-form__input"
            id="image"
            defaultValue={user.image}
            {...register('image', {
              pattern: {
                value: /^(http|https):\/\/[^ "]+$/,
                message: 'Please enter a valid URL',
              },
            })}
          />
        </label>
        {errors.image && (
          <p className="profile-form__error">Please enter a valid URL</p>
        )}
      </div>

      <button className="profile-form__submit" type="submit">
        Save
      </button>
    </form>
  );
}
