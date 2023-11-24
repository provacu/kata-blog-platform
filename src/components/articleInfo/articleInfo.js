import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { v4 } from 'uuid';
import {
  getAuthorName,
  getFormattedDate,
  getImageSrc,
  getShortString,
} from '../../helpers/helpersArticle';
import notApplicable from '../../helpers/Not_applicable.png';
import './articleInfo.scss';

function ArticleInfo({ article, onLikeUnlike, isLiked }) {
  const authorName = getAuthorName(article.author);
  const formattedDate = getFormattedDate(article.createdAt);
  const imageSrc = getImageSrc(article.author, notApplicable);
  const isArticlePage = window.location.pathname.includes(
    `/articles/${article.slug}`,
  );

  const handleLikeUnlikeClick = (e) => {
    e.preventDefault();
    onLikeUnlike(article.slug);
  };
  const maxDescriptionLength = window.innerWidth <= 500 ? 10 : 40;
  const maxTitleLength = window.innerWidth <= 500 ? 10 : 35;

  const displayDescription = isArticlePage
    ? article.description
    : getShortString(article.description, maxDescriptionLength);
  const displayTitle = isArticlePage
    ? article.title
    : getShortString(article.title, maxTitleLength);

  return (
    <div className="article-info">
      <div className="article-info__content">
        <div className="article-info__like-section">
          <h1 className="article-info__title" title={article.title}>
            {displayTitle}
          </h1>
          <div className="article-info__likes">
            <Button
              style={{ border: 'none' }}
              icon={
                isLiked ? (
                  <HeartFilled
                    style={{ color: 'red', padding: '0px', boxShadow: 'none' }}
                  />
                ) : (
                  <HeartOutlined
                    style={{ padding: '0px', boxShadow: 'none' }}
                  />
                )
              }
              onClick={handleLikeUnlikeClick}
            />
            <span className="article-info__likes-count">
              {article.favoritesCount}
            </span>
          </div>
        </div>
        <div className="article-info__tags">
          {article.tagList &&
            article.tagList.map((tag) => (
              <Tag
                title={tag}
                style={{ border: '1px solid #00000080' }}
                key={v4()}
              >
                {getShortString(tag, 10)}
              </Tag>
            ))}
        </div>
        <div className="article-info__description" title={article.description}>
          {displayDescription}
        </div>
      </div>
      <div className="article-info__author-info">
        <div className="article-info__author" title="author">
          {authorName}
        </div>
        <div className="article-info__date" title="date">
          {formattedDate}
        </div>
        <img className="article-info__avatar" src={imageSrc} alt={authorName} />
      </div>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
    createdAt: PropTypes.string,
  }).isRequired,
  onLikeUnlike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

export default ArticleInfo;
