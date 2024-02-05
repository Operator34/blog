import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import Cookies from 'js-cookie';

import { getCurrentUser, getProfile } from '../../service/requestService';
import defaultAvatar from '../post/defaultAvatar.png';
import { updateUser, logoutUser } from '../../store/mainReducer';

import s from './appHeader.module.scss';

const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.main.user);
  const isLogged = useSelector((state) => state.main.isLogged);
  // console.log('isLogged', isLogged);
  // console.log('userHeader', user);

  useEffect(() => {
    if (isLogged) {
      getProfile(user.username).then((res) => {
        dispatch(updateUser(res.data.profile));
      });
    } else if (Cookies.get('Token_Authorization')) {
      getCurrentUser().then((res) => {
        dispatch(updateUser(res.data.user));
      });
    }
  }, [isLogged]);

  return (
    <div className={s.appHeader}>
      <Link className={s.headerLink} to={'/'}>
        <h3>Realworld Blog</h3>
      </Link>
      {isLogged ? <GroupAuth user={user} /> : <GroupNoAuth />}
    </div>
  );
};
const GroupNoAuth = () => (
  <div className={s.groupNoAuth}>
    <Link className={s.signIn} to={'/sign-in'}>
      Sign In
    </Link>
    <Link className={s.signUp} to={'/sign-up'}>
      Sign Up
    </Link>
  </div>
);

const GroupAuth = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    console.error('logout');
    Cookies.remove('Token_Authorization');
    dispatch(logoutUser());
    message.success('Logout success');
    navigate('/');
  };
  return (
    <div className={s.groupAuth}>
      <Link className={s.createArticle} to={'/new-article'}>
        Create article
      </Link>
      <Link to={'/profile'} className={s.user}>
        <p className={s.userName}>{user.username}</p>
        <img src={user.image ? user.image : defaultAvatar} className={s.avatar} alt="avatar" />
      </Link>
      <button className={s.btnLogOut} onClick={onLogout}>
        {' '}
        Log Out
      </button>
    </div>
  );
};
export default AppHeader;
