import React, { useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { articlesFetcher, actions } from './articlesSlice';
import {
  likeArticle,
  unlikeArticle,
} from '../../components/articleInfo/likesSlice';
import ArticleCard from './articleCard';
import './articlesList.scss';

function ArticlesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error, currentPage, pageSize, totalCount } =
    useSelector((state) => state.articles);
  const currentUser = useSelector((state) => state.authentication.user);

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page);
    window.history.pushState({}, '', `?${searchParams.toString()}`);

    dispatch(actions.setCurrentPage(page));
    const offset = (page - 1) * pageSize;
    dispatch(articlesFetcher({ offset, pageSize }));
  };

  const handleLikeUnlike = (slug) => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    const article = items.find((item) => item.slug === slug);

    if (article.favorited) {
      dispatch(unlikeArticle(slug));
    } else {
      dispatch(likeArticle(slug));
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(actions.setCurrentPage(page));
    const offset = (page - 1) * pageSize;
    dispatch(articlesFetcher({ offset, pageSize }));
  }, [dispatch, pageSize]);

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  if (error)
    return (
      <div>
        <Alert
          message="Error loading articles:"
          description={`${error}`}
          type="error"
          showIcon
        />
      </div>
    );
  return (
    <div className="articles-list">
      {items.map((article) => (
        <ArticleCard
          key={uuidv4()}
          article={article}
          onLikeUnlike={() => handleLikeUnlike(article.slug)}
          isLiked={article.favorited}
        />
      ))}
      <div className="articles-list__pagination">
        <Pagination
          current={currentPage}
          pageSize={5}
          total={totalCount}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ArticlesList;
