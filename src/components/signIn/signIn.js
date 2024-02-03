import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import { addLoginUser } from '../../store/mainReducer';
import { loginUser } from '../../service/requestService';

import s from './signIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });

  //console.log(errors);
  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password).then((res) => {
      Cookies.set('Token_Authorization', `${res.data.user.token}`);
      dispatch(addLoginUser(res.data.user));
      if (res.status === 200) {
        navigate('/');
      }
    });
  };
  return (
    <div className={s.signIn}>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className={s.form}>
        <div className={s.inputGroup}>
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
        </div>
        <div className={s.inputGroup}>
          <label className={s.label} htmlFor="password">
            Password
          </label>
          <input
            className={s.input}
            {...register('password', { required: 'Password is required' })}
            type="password"
            id="password"
            placeholder="Password"
          />
          <p className={s.error}>{errors.password?.message}</p>
        </div>
        <button disabled={!isValid} className={s.btn}>
          Login
        </button>
        <p className={s.noAccount}>
          Don’t have an account?
          <Link className={s.link} to="/sign-up">
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;