import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { conversionStr } from '../../service/helpFunction';
import { toggleFavoriteArticle } from '../../service/requestService';

import defaultAvatar from './defaultAvatar.png';
import heart from './heart.svg';
import heartOn from './heartOn.svg';
import s from './post.module.scss';

const Post = ({ article, isLogged }) => {
  //const isLogged = useSelector((state) => state.main.isLogged);
  console.log('articleFavorite', article.favorited);
  const [likeCount, setLikeCount] = useState(article.favoritesCount);
  const [like, setLike] = useState(article.favorited);
  const { tagList = [] } = article;
  const articleTagList = tagList.filter((tag, index) => index < 10);
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

  return (
    <article className={s.postContainer}>
      <div className={s.post}>
        <div className={s.titleLike}>
          <p className={s.title}>
            <Link className={s.title} to={`articles/${article.slug}`}>
              {conversionStr(article.title, 65)}
            </Link>
          </p>
          <button disabled={!isLogged} onClick={() => onClickFavorite(article.slug)} className={s.btn}>
            <img className={s.heartOn} src={imgLike} alt="Like" />
          </button>
          <p className={s.countLike}>{likeCount}</p>
        </div>
        <div className={s.tags}>
          {
            /* eslint-disable */
            articleTagList.length
              ? articleTagList.map((tag, index) => (
                  <div key={index} className={s.tag}>
                    {tag}
                  </div>
                ))
              : null
            /* eslint-disable */
          }
        </div>
        <p className={s.postDescription}>{conversionStr(article.description, 300)}</p>
      </div>
      <div className={s.user}>
        <div className={s.userInfo}>
          <h6 className={s.name}>{article.author.username}</h6>
          <p className={s.date}>{format(new Date(article.updatedAt), 'PP')}</p>
        </div>
        <img className={s.userAvatar} src={article.author.image ? article.author.image : defaultAvatar} alt="Avatar" />
      </div>
    </article>
  );
};

export default Post;
