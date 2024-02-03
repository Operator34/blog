import React, { Fragment, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { getArticleId, updateAnArticle, errorHandling } from '../../service/requestService';

import s from './editArticle.module.scss';

const EditArticle = () => {
  const [tag, setTag] = useState('');
  const { slug } = useParams();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.main.isLogged);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (!isLogged) {
      navigate('/sign-in');
    }
    getArticleId(slug).then((res) => {
      setValue('title', res.data.article.title);
      setValue('description', res.data.article.description);
      setValue('body', res.data.article.body);
      setValue('tagList', res.data.article.tagList);
    });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  const addTag = () => {
    append(tag);
    setTag('');
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
  };

  const removeTag = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    updateAnArticle(slug, data).then((res) => {
      if (res instanceof Error) {
        errorHandling(res);
      } else {
        message.success('Post updated');
        navigate('/');
      }
    });
  };

  return (
    <article className={s.article}>
      <h3>Edit Article</h3>
      <form className={s.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className={s.inputGroup}>
          <label className={s.label} htmlFor="title">
            Title
          </label>
          <input
            className={s.input}
            {...register('title', {
              required: 'Title is required',
              maxLength: { value: 65, message: 'Title must contain no more than 65 characters' },
            })}
            type="text"
            id="title"
            placeholder="Title"
          />
          <p className={s.error}>{errors.title?.message}</p>
        </div>
        <div className={s.inputGroup}>
          <label className={s.label} htmlFor="description">
            Short description
          </label>
          <input
            className={s.input}
            {...register('description', {
              required: 'Short description is required',
              maxLength: { value: 150, message: 'Short description must contain no more than 150 characters' },
            })}
            type="text"
            id="description"
            placeholder="Short description"
          />
          <p className={s.error}>{errors.description?.message}</p>
        </div>
        <div className={s.inputGroup}>
          <label className={s.label} htmlFor="body">
            Text
          </label>
          <textarea
            className={s.textarea}
            {...register('body', {
              required: 'Description is required',
              maxLength: { value: 1100, message: 'Description must contain no more than 1100 characters' },
            })}
            type="text"
            id="body"
            placeholder="Text"
            rows={10}
          />
          <p className={s.error}>{errors.body?.message}</p>
        </div>
        <div className={s.inputGroup}>
          <label className={s.label} htmlFor="tags">
            Tags
          </label>

          {fields.map((item, index) => (
            <Fragment key={uuidv4()}>
              <div className={s.inputBtn}>
                <Controller
                  render={({ field }) => <p className={s.textTag}>{field.value}</p>}
                  name={`tagList[${index}]`}
                  control={control}
                />
                <Button onClick={() => removeTag(index)} className={s.btn} danger>
                  Delete
                </Button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className={s.inputGroup}>
          <div className={s.inputBtn}>
            <input
              className={`${s.input} ${s.inputTag}`}
              {...register('tag', {
                minLength: { value: 2, message: 'The tag must be at least 2 character long' },
                maxLength: { value: 15, message: 'Tag must contain no more than 15 characters' },
                onChange: onChangeTag,
              })}
              value={tag}
              type="text"
              id="tag"
              placeholder="Tag"
            />
            <Button disabled={errors.tag} onClick={addTag} className={`${s.btn} ${s.btnAdd}`}>
              Add Tag
            </Button>
          </div>
          <p className={s.error}>{errors.tag?.message}</p>
        </div>
        <button disabled={!isValid} className={s.btnSend}>
          Send
        </button>
      </form>
    </article>
  );
};

export default EditArticle;
