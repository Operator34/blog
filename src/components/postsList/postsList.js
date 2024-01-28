import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import Spinner from '../spin/spinner';
import Post from '../post/post';
import { getAllArticles } from '../../service/requestService';
import { addAllArticles } from '../../store/mainReducer';

import s from './postsList.module.scss';

const PostsList = () => {
  const [articlesCount, setArticlesCount] = useState(1);
  const dispatch = useDispatch();
  const dispatchArticles = (offset) => {
    getAllArticles(offset).then((res) => {
      //console.log(res.data.articles);
      dispatch(addAllArticles(res.data.articles));
      setArticlesCount(res.data.articlesCount.toString());
    });
  };
  useEffect(() => {
    dispatchArticles();
    // getAllArticles().then((res) => {
    //   //console.log(res.data.articles);
    //   dispatch(addAllArticles(res.data.articles));
    //   setArticlesCount(res.data.articlesCount.toString());
    // });
  }, []);

  const articles = useSelector((state) => state.main.articles);
  let article = {};
  if (articles.length) {
    article = articles.map((article, index) => <Post key={index} article={article} />);
  }
  return (
    <div className={s.postsList}>
      {articles.length ? article : <Spinner />}
      {/* <Post />
      <Post />
      <Post />
      <PostDescription /> */}
      <PaginationPost articlesCount={articlesCount} dispatchArticles={dispatchArticles} />
    </div>
  );
};
export default PostsList;
export const PaginationPost = ({ articlesCount, dispatchArticles }) => {
  return (
    <Pagination
      pageSize={20}
      defaultCurrent={1}
      total={articlesCount}
      onChange={(page, pageSize) => {
        dispatchArticles(page + pageSize);
      }}
    />
  );
};
