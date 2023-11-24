import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './articleCard.scss';
import ArticleInfo from '../../components/articleInfo/articleInfo';

function ArticleCard({ article, onLikeUnlike, isLiked }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.location.href = `/articles/${article.slug}`;
    }
  };

  return (
    <Link
      to={`/articles/${article.slug}`}
      role="article"
      className="article-card"
      tabIndex="0"
      onKeyPress={handleKeyPress}
    >
      <ArticleInfo
        article={article}
        onLikeUnlike={(slug) => onLikeUnlike(slug)}
        isLiked={isLiked}
      />
    </Link>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
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

export default ArticleCard;
