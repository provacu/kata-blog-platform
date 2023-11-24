import { combineReducers } from 'redux';
import articlesReducer from '../../features/articles/articlesSlice';
import authSlice from '../../features/auth/authSlice';
import newArticleSlice from '../../features/newArticleForm/newArticleSlice';
import articleControlSlice from '../../features/articleControl/articleControlSlice';
import likesSlice from '../../components/articleInfo/likesSlice';

const rootReducer = combineReducers({
  articles: articlesReducer,
  authentication: authSlice,
  newArticle: newArticleSlice,
  articleControl: articleControlSlice,
  likes: likesSlice,
});

export default rootReducer;
