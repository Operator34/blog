import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Checkbox } from 'antd';

import { registerUser } from '../../service/requestService';

import s from './signUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });

  //console.log(errors);
  // console.log(watch().checkbox);

  const onSubmit = (data) => {
    const { userName, email, password } = data;
    registerUser(userName, email, password).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate('/sign-in');
      }
    });
  };

  return (
    <div className={s.signUp}>
      <h3>Create new account</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className={s.form}>
        <label className={s.label} htmlFor="userName">
          Username
        </label>
        <input
          className={s.input}
          {...register('userName', {
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
          Password
        </label>
        <input
          className={s.input}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must have at least 6 characters' },
            maxLength: { value: 40, message: 'Password must contain no more than 40 characters' },
          })}
          type="password"
          id="password"
          placeholder="Password"
        />
        <p className={s.error}>{errors.password?.message}</p>
        <label className={s.label} htmlFor="password">
          Repeat Password
        </label>
        <input
          className={s.input}
          {...register('repeatPassword', {
            required: 'Repeat password is required',
            validate: (value) => value === watch().password || 'Passwords do not match',
          })}
          type="password"
          id="repeatPassword"
          placeholder="Repeat password"
        />
        <p className={s.error}>{errors.repeatPassword?.message}</p>
        <Checkbox onChange={(e) => setValue('checkbox', e.target.checked)}>
          I agree to the processing of my personal information
        </Checkbox>
        <button disabled={!isValid || !watch().checkbox} className={s.btn}>
          Create
        </button>
        <p className={s.noAccount}>
          Already have an account?
          <Link className={s.link} to="/sign-in">
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
