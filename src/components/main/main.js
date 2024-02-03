import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PostDescription from '../postDescription/postDescription';
import PostsList from '../postsList';
import SignUp from '../signUp';
import SignIn from '../signIn';
import Profile from '../profile/profile';
import CreateArticle from '../createArticle';
import EditArticle from '../editArticle';

import s from './main.module.scss';

const Main = () => {
  return (
    <div className={s.main}>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="articles/:slug" element={<PostDescription />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
      </Routes>
      {/* <PostsList /> */}
    </div>
  );
};

export default Main;
