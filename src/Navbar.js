import React, { useState, useEffect } from 'react';
import "./Darkmode.css"

export default function Navbar({ onCategoryChange, activeCategory, onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      onSearch(searchText);
      setSearchText('');
    }
  };

  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">NewsDaily</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {categories.map((cat) => (
              <li className="nav-item" key={cat}>
                <button
                  className={`btn nav-link ${activeCategory === cat ? 'text-primary' : 'text-light'}`}
                  onClick={() => onCategoryChange(cat)}
                  style={{ background: 'none', border: 'none', padding: '8px 12px', fontSize: '16px' }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          {/* Search Box */}
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-Dark" type="submit">Search</button>
          </form>

          {/* Dark Mode Toggle */}
          <button className="btn  btn-sm btn-outline-dark" onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}
