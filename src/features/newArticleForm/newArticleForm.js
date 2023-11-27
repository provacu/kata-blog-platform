/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { createArticle } from './newArticleSlice';
import './newArticleForm.scss';

export default function NewArticleForm() {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [tagError, setTagError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const finalTags = inputTag
        ? [...tags, { id: uuidv4(), value: inputTag }]
        : tags;

      const articleData = {
        article: {
          title: data.title,
          description: data.description,
          body: data.text,
          tagList: finalTags.map((tag) => tag.value),
        },
      };
      await dispatch(createArticle(articleData)).unwrap();
      toast.success('Article created successfully', {
        position: 'bottom-right',
      });
      navigate('/');
      reset();
    } catch (error) {
      toast.error(error?.message || 'Could not create article', {
        position: 'bottom-right',
      });
    }
  };

  const handleTagDelete = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleTagAdd = () => {
    const trimmedInputTag = inputTag.trim();

    if (!trimmedInputTag) {
      setTagError('Tag cannot be empty or just spaces');
      return;
    }

    if (tags.some((tag) => tag.value === trimmedInputTag)) {
      setTagError('Tag is already added');
      return;
    }

    setTags([...tags, { id: uuidv4(), value: trimmedInputTag }]);
    setInputTag('');
    setTagError('');
  };

  return (
    <form className="new-article-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="new-article-form__title">Create New Article</h1>

      <div className="new-article-form__field">
        <label htmlFor="title" className="new-article-form__label">
          Title
          <input
            placeholder="Title"
            className="new-article-form__input"
            id="title"
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 250,
                message: 'Title must be less than 250 characters',
              },
              pattern: {
                value: /\S/,
                message: 'Title cannot be empty or just spaces',
              },
            })}
          />
          {errors.title && (
            <p className="new-article-form__error">{errors.title.message}</p>
          )}
        </label>
      </div>

      <div className="new-article-form__field">
        <label htmlFor="description" className="new-article-form__label">
          Short Description
          <input
            placeholder="Short description"
            className="new-article-form__input"
            id="description"
            {...register('description', {
              required: 'Short description is required',
              maxLength: {
                value: 300,
                message: 'Description must be less than 300 characters',
              },
              pattern: {
                value: /\S/,
                message: 'Short description cannot be empty or just spaces',
              },
            })}
          />
          {errors.description && (
            <p className="new-article-form__error">
              {errors.description.message}
            </p>
          )}
        </label>
      </div>

      <div className="new-article-form__field">
        <label htmlFor="text" className="new-article-form__label">
          Text
          <textarea
            placeholder="Text"
            className="new-article-form__textarea"
            id="text"
            {...register('text', {
              required: 'Text is required',
              pattern: {
                value: /\S/,
                message: 'Text cannot be empty or just spaces',
              },
            })}
          />
          {errors.text && (
            <p className="new-article-form__error">{errors.text.message}</p>
          )}
        </label>
      </div>

      <div className="new-article-form__field">
        <label htmlFor="input-tag" className="new-article-form__label">
          Tags
          <div className="new-article-form__tags">
            {tags.map((tag) => (
              <div key={tag.id} className="new-article-form__tag">
                <input
                  className="new-article-form__input"
                  type="text"
                  value={tag.value}
                  id={`tag-${tag.id}`}
                  disabled
                  {...register('tags', { pattern: /^\s*$/ })}
                />
                <Button
                  className="new-article-form__add-tag-button--delete"
                  type="default"
                  size="large"
                  style={{ color: '#F5222D', border: '1px solid #F5222D' }}
                  onClick={() => handleTagDelete(tag.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <div className="new-article-form__tag">
              <input
                type="text"
                className="new-article-form__input"
                value={inputTag}
                id="input-tag"
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setInputTag(e.target.value);
                  }
                }}
                placeholder="Add a tag"
              />
              <Button
                className="new-article-form__add-tag-button--add"
                type="default"
                size="large"
                style={{ color: '#1890FF', border: '1px solid #1890FF' }}
                onClick={handleTagAdd}
              >
                Add Tag
              </Button>
            </div>
          </div>
          {tagError && <p className="new-article-form__error">{tagError}</p>}
        </label>
      </div>

      <button className="new-article-form__submit" type="submit">
        Create Article
      </button>
    </form>
  );
}
