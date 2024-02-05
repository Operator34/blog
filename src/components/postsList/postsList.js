import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';

import Spinner from '../spin/spinner';
import Post from '../post/post';
import { getAllArticles } from '../../service/requestService';

import s from './postsList.module.scss';

const PostsList = () => {
  const isLogged = useSelector((state) => state.main.isLogged);
  console.log(isLogged);
  const [articlesCount, setArticlesCount] = useState(1);
  const [articles, setArticles] = useState([]);

  const dispatchArticles = (offset, pageSize) => {
    getAllArticles(offset, pageSize).then((res) => {
      setArticles(res.data.articles);
      setArticlesCount(res.data.articlesCount.toString());
    });
  };
  useEffect(() => {
    dispatchArticles();
  }, [isLogged]);

  let article = {};
  if (articles.length) {
    article = articles.map((article) => <Post key={article.slug} article={article} isLogged={isLogged} />);
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
