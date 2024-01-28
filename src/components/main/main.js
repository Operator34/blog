import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PostDescription from '../postDescription/postDescription';
import PostsList from '../postsList';

import s from './main.module.scss';

const Main = () => {
  return (
    <div className={s.main}>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="articles/:slug" element={<PostDescription />} />
      </Routes>
      {/* <PostsList /> */}
    </div>
  );
};

export default Main;
