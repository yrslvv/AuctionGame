import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GifSearch.css';

const GifSearch = ({ username, onGifSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() === '') {
        setGifs([]);
        return;
      }
      try {
        const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=AIzaSyCfPz-AXvOA8cnneQlgqNTJPgpyvSNF-1w&client_key=my_test_app&limit=8`;
        console.log("Search URL:", searchUrl); // Add this line
        const response = await axios.get(searchUrl);
        setGifs(response.data.results);
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="gif-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GIFs"
      />
      <div className="gif-results">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.media_formats.nanogif.url}
            alt={gif.content_description}
            onClick={() => onGifSelect(gif.media_formats.gif.url, username)}
            className="gif-item"
          />
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
