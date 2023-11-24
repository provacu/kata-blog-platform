import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { Spin, Button, Popconfirm } from 'antd';
import './articlePage.scss';
import ArticleInfo from '../../components/articleInfo/articleInfo';
import { articleFetcher } from '../articles/articlesSlice';
import { deleteArticle } from '../articleControl/articleControlSlice';
import {
  likeArticle,
  unlikeArticle,
} from '../../components/articleInfo/likesSlice';

function ArticlePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authentication.user);
  const article = useSelector(
    (state) =>
      state.articles.selectedArticle ||
      state.articles.items.find((item) => item.slug === slug),
  );

  useEffect(() => {
    if (!article) {
      dispatch(articleFetcher(slug));
    }
  }, [slug, article, dispatch]);

  const handleLikeUnlike = () => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    if (article && article.favorited) {
      dispatch(unlikeArticle(slug));
    } else {
      dispatch(likeArticle(slug));
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteArticle(slug)).unwrap();
      toast.success('Article deleted successfully', {
        position: 'bottom-right',
      });
      navigate('/');
    } catch (deleteError) {
      toast.error(deleteError?.message || 'Failed to delete article', {
        position: 'bottom-right',
      });
    }
  };

  if (!article) {
    return <Spin className="article-page__loading" size="large" />;
  }

  return (
    <div className="article-page">
      <ArticleInfo
        article={article}
        onLikeUnlike={handleLikeUnlike}
        isLiked={article.favorited}
      />
      {currentUser && currentUser.username === article.author.username && (
        <div className="article-actions">
          <Popconfirm
            onConfirm={handleDelete}
            title="Delete the article"
            description="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="article-actions__delete-button"
              type="button"
              style={{ color: '#F5222D', border: '1px solid #F5222D' }}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            className="article-actions__edit-button"
            type="button"
            onClick={() => navigate(`/articles/${slug}/edit`)}
            style={{ color: '#52C41A', border: '1px solid #52C41A' }}
          >
            Edit
          </Button>
        </div>
      )}

      <div className="article-page__content">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticlePage;
