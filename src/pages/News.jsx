import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-05-21&sortBy=publishedAt&apiKey=6883f8fd380e42908cd9578c2cdc170f`);
                console.log(res)
                if (res.data && res.data.articles) {
                    setArticles(res.data.articles);
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error Fetchning news: {error.message}</p>

    return (
        <>
            <div>
                <h1>Top Headline</h1>
                <ul>
                    {articles && articles.length > 0 ? (
                        articles.map((article, index) => (
                            <li key={index}>
                                <h2>{article.title}</h2>
                                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100px' }} />}
                                <p>{article.description}</p>
                                <p>Author: {article.author}</p>
                                <p>Source: {article.source.name}</p>
                                <p>Published at: {new Date(article.publishedAt).toLocaleString()}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read more
                                </a>
                            </li>
                        ))
                    ) : (
                        <p>No articles found</p>
                    )}
                </ul>
            </div>
        </>
    )
}

export default News;