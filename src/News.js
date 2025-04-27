import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Navbar from './Navbar';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      let url = '';

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&pageSize=6&apiKey=418b69b31eea4a34bcd6afd50b6e5a81`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=6&apiKey=418b69b31eea4a34bcd6afd50b6e5a81`;
      }

      setLoading(true);

      try {
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery, page]); 

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchQuery('');
    setPage(1); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); 
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Navbar onCategoryChange={handleCategoryChange} activeCategory={category} onSearch={handleSearch} />
      <div className='container my-3'>
        <h3 className='text-center'>
          NewsDaily - {searchQuery ? `Results for "${searchQuery}"` : `Top ${category.charAt(0).toUpperCase() + category.slice(1)} News`}
        </h3>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className='row'>
            {articles.length > 0 ? (
              articles.map((element, index) => (
                <div className='col-md-4 my-3' key={index}>
                  <NewsItem
                    title={element.title ? element.title : ''}
                    description={element.description ? element.description : ''}
                    url={element.url}
                    urlToImage={element.urlToImage}
                  />
                </div>
              ))
            ) : (
              <h5 className='text-center my-5'>No news found.</h5>
            )}
          </div>
        )}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary btn-dark" onClick={handlePrev} disabled={page === 1}>
          <i className="fas fa-arrow-left"></i> Previous
          </button>
          <button className="btn btn-primary btn-dark" onClick={handleNext}>
            Next <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
