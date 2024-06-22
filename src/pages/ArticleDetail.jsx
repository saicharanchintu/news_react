import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../reducers/favoritesSlice';
import './pages.css';
import DefaultImage from '../assets/default_news.png';

const ArticleDetail = () => {
  const { id } = useParams();
  const articles = useSelector(state => state.articles.list);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const article = articles[id];

  const isFavorite = favorites.some(fav => fav.title === article.title);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(article));
    } else {
      dispatch(addFavorite(article));
    }
  };

  if (!article) return <p>Article not found</p>;

  return (
    <div className='article-detail'>
      <h1>{article.title}</h1>
      <img 
        src={article.urlToImage ? article.urlToImage : DefaultImage} 
        alt={article.title} 
        style={{ width: '100%' }} 
      />
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read original article</a>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ArticleDetail;
