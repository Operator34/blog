import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Popconfirm, message } from 'antd';
import { useSelector } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import { format } from 'date-fns';

import { deleteAnArticle, getArticleId, errorHandling, toggleFavoriteArticle } from '../../service/requestService';
import Spinner from '../spin/spinner';

import heart from './heart.svg';
import heartOn from './heartOn.svg';
import defaultAvatar from './defaultAvatar.png';
import s from './postDescription.module.scss';

const PostDescription = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const isLogged = useSelector((state) => state.main.isLogged);
  useEffect(() => {
    console.log('useEffect');
    getArticleId(slug).then((res) => {
      console.log(res.data.article);
      setArticle(res.data.article);
    });
  }, []);
  return <>{article ? <Article article={article} isLogged={isLogged} /> : <Spinner />}</>;
};

const Article = ({ article, isLogged }) => {
  console.log(article, isLogged);
  const [likeCount, setLikeCount] = useState(article.favoritesCount);
  const [like, setLike] = useState(article.favorited);
  const navigate = useNavigate();
  const userName = useSelector((state) => state.main.user.username);
  const isCurrentUserArticle = userName === article.author.username;

  const imgLike = like && isLogged ? heartOn : heart;
  const onClickFavorite = (slug) => {
    const method = like ? 'delete' : 'post';
    toggleFavoriteArticle(slug, method).then((res) => {
      if (res.status === 200) {
        setLikeCount((prev) => (prev = like ? prev - 1 : prev + 1));
        setLike((prev) => !prev);
      }
    });
  };

  const onDelete = (article) => {
    deleteAnArticle(article.slug).then((res) => {
      if (res instanceof Error) {
        errorHandling(res);
      } else {
        message.success('This post has been deleted');
      }
    });
    navigate('/');
  };

  return (
    <article className={s.postWrapper}>
      <div className={s.postContainer}>
        <div className={s.post}>
          <div className={s.titleLike}>
            <div className={s.title}>{article.title}</div>
            <button onClick={() => onClickFavorite(article.slug)} className={s.btn}>
              <img src={imgLike} alt="Like" />
              <p className={s.countLike}>{likeCount}</p>
            </button>
          </div>
          <div className={s.tags}>
            {
              /* eslint-disable */
              article.tagList.length
                ? article.tagList.map((tag, index) => (
                    <div key={index} className={s.tag}>
                      {tag}
                    </div>
                  ))
                : null
              /* eslint-disable */
            }
          </div>

          <p className={s.postDescription}>{article.description}</p>
        </div>
        <div className={s.user}>
          <div className={s.userInfo}>
            <div className={s.userNameDate}>
              <h6 className={s.name}>{article.author.username}</h6>
              <p className={s.date}>{format(new Date(article.updatedAt), 'PP')}</p>
            </div>
            <img
              className={s.userAvatar}
              src={article.author.image ? article.author.image : defaultAvatar}
              alt="Avatar"
            />
          </div>
          {isCurrentUserArticle && (
            <div className={s.btnGroup}>
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this post?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(article)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Link to={`/articles/${article.slug}/edit`} className={s.btnEdit}>
                {' '}
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={s.postText}>
        <div>{<Markdown>{article.body}</Markdown>}</div>
      </div>
    </article>
  );
};
export default PostDescription;
