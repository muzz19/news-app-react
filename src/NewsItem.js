import React from 'react';

export default function NewsItem({ title, description, url, urlToImage }) {
  return (
    <div className="card my-3" style={{ width: '18rem' }}>
      <img
        src={urlToImage ? urlToImage : "https://via.placeholder.com/150"}
        className="card-img-top"
        alt="News"
      />
      <div className="card-body">
        <h5 className="card-title">{title ? title : "No Title Available"}</h5>
        <p className="card-text">{description ? description : "No Description Available"}</p>
        <a href={url} className="btn btn-primary bg-dark" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
}
