import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { updateUser } from '../../store/mainReducer';
import { errorHandling, updateCurrentUser } from '../../service/requestService';
import { removeEmptyFields } from '../../service/helpFunction';

import s from './profile.module.scss';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.main.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    setValue('username', user.username);
    setValue('email', user.email);
  }, [user]);

  const onSubmit = (data) => {
    // console.log('onSubmit', data);
    const filterData = removeEmptyFields(data);
    updateCurrentUser(filterData).then((res) => {
      if (res instanceof Error) {
        errorHandling(res);
      } else {
        dispatch(updateUser(res.data.user));
        message.success('Profile updated');
        navigate('/');
      }
    });
  };
  return (
    <div className={s.profile}>
      <h3>Edit profile</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className={s.form}>
        <label className={s.label} htmlFor="username">
          Username
        </label>
        <input
          className={s.input}
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must have at least 3 characters' },
            maxLength: { value: 20, message: 'Username must contain no more than 20 characters' },
          })}
          type="text"
          id="userName"
          placeholder="Username"
        />

        <p className={s.error}>{errors.userName?.message}</p>
        <label className={s.label} htmlFor="email">
          Email address
        </label>
        <input
          className={s.input}
          {...register('email', { required: 'Email is required' })}
          type="email"
          id="email"
          placeholder="Email address"
        />
        <p className={s.error}>{errors.email?.message}</p>
        <label className={s.label} htmlFor="password">
          New password
        </label>
        <input
          className={s.input}
          {...register('password', {
            minLength: { value: 6, message: 'Password must have at least 6 characters' },
            maxLength: { value: 40, message: 'Password must contain no more than 40 characters' },
          })}
          type="password"
          id="password"
          placeholder="New password"
        />
        <p className={s.error}>{errors.password?.message}</p>
        <label className={s.label} htmlFor="image">
          Avatar image(url)
        </label>
        <input className={s.input} {...register('image')} type="url" id="image" placeholder="Avatar image" />
        <p className={s.error}>{errors.repeatPassword?.message}</p>

        <button disabled={!isValid} className={s.btn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
