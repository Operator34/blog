import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import heart from './heart.svg';
import defaultAvatar from './defaultAvatar.png';
import s from './post.module.scss';

const Post = ({ article }) => {
  return (
    <article className={s.postContainer}>
      <div className={s.post}>
        <div className={s.titleLike}>
          <p className={s.title}>
            <Link className={s.title} to={`articles/${article.slug}`}>
              {article.title}
            </Link>
          </p>
          <button className={s.btn}>
            <img src={heart} alt="Like" />
          </button>
          <p className={s.countLike}>{article.favoritesCount}</p>
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
          <h6 className={s.name}>{article.author.username}</h6>
          <p className={s.date}>{format(new Date(article.updatedAt), 'PP')}</p>
        </div>
        <img className={s.userAvatar} src={article.author.image ? article.author.image : defaultAvatar} alt="Avatar" />
      </div>
    </article>
  );
};

export default Post;