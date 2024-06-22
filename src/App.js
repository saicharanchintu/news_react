import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './pages/newsList';
import ArticleDetail from './pages/ArticleDetail';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>News App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NewsList setArticles={setArticles} />} />
            <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
