import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../reducers/articleSlice";
import "./pages.css";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// Default image URL for articles without images
const DEFAULT_IMAGE = "https://example.com/default-image.jpg";

const NewsList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&page=${page}&pageSize=10&q=${searchQuery}&apiKey=6883f8fd380e42908cd9578c2cdc170f`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        if (response.status === 200) {
          dispatch(setArticles(response.data.articles));
        } else {
          throw new Error(`Error fetching news: ${response.status}`);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, page, searchQuery, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;

  return (
    <div className="news-list">
      <h1>Top Headlines</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="article-list">
        {articles.map((article, index) => (
          <li key={index} className="article-item">
            <div className="content-container">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link to={`/article/${index}`} className="read-more">
                Read more
              </Link>
            </div>
            <div className="image-container">
              <img
                src={article.urlToImage ? article.urlToImage : DEFAULT_IMAGE}
                alt={article.title}
                style={{ width: '100%' }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((page) => page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default NewsList;
