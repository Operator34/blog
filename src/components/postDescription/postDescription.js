import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { format } from 'date-fns';

import { getArticleId } from '../../service/requestService';
import Spinner from '../spin/spinner';

import heart from './heart.svg';
import defaultAvatar from './defaultAvatar.png';
import s from './postDescription.module.scss';

const PostDescription = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  useEffect(() => {
    getArticleId(slug).then((res) => {
      setArticle(res.data.article);
    });
  }, []);
  console.log(article);
  return <>{article ? <Article article={article} /> : <Spinner />}</>;
};

const Article = ({ article }) => {
  console.log(article);
  return (
    <article className={s.postWrapper}>
      <div className={s.postContainer}>
        <div className={s.post}>
          <div className={s.titleLike}>
            <p className={s.title}>{article.title}</p>
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
          <img
            className={s.userAvatar}
            src={article.author.image ? article.author.image : defaultAvatar}
            alt="Avatar"
          />
        </div>
      </div>
      <div className={s.postText}>
        <p>{<Markdown>{article.body}</Markdown>}</p>
      </div>
    </article>
  );
};
export default PostDescription;
