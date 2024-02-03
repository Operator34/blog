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
  const dispatchArticles = (offset, pageSize) => {
    getAllArticles(offset, pageSize).then((res) => {
      dispatch(addAllArticles(res.data.articles));
      setArticlesCount(res.data.articlesCount.toString());
    });
  };
  useEffect(() => {
    dispatchArticles();
  }, []);

  const articles = useSelector((state) => state.main.articles);
  let article = {};
  if (articles.length) {
    article = articles.map((article, index) => <Post key={index} article={article} />);
  }
  return (
    <div className={s.postsList}>
      {articles.length ? article : <Spinner />}
      <PaginationPost className={s.pagination} articlesCount={articlesCount} dispatchArticles={dispatchArticles} />
    </div>
  );
};
export default PostsList;
export const PaginationPost = ({ articlesCount, dispatchArticles }) => {
  return (
    <Pagination
      showSizeChanger
      defaultCurrent={0}
      total={articlesCount}
      onChange={(page, pageSize) => {
        dispatchArticles(page, pageSize);
      }}
    />
  );
};
