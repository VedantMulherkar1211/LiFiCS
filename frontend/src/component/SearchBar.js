import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon } from 'lucide-react'; // You can use any icon library you want
import '../css/searchbar.css'; // Keep CSS separate

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get('https://mocki.io/v1/d2bb5a74-cd9a-461e-8801-8eee22756992');
      const allAreas = response.data.areas;
      const filteredSuggestions = allAreas.flatMap(area => {
        return area.hotels.flatMap(hotel => {
          return hotel.menu.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(item => ({
            hotel: hotel.hotel_name,
            item: item.item,
            price: item.price,
            area: area.area_name
          }));
        });
      });

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <SearchIcon size={17} className="search-input-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="small-search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(e.target.value.length >= 2 && suggestions.length > 0);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => setShowSuggestions(query.length >= 2 && suggestions.length > 0)}
        />
      </div>

      {isLoading && (
        <div className="small-loading">Loading...</div>
      )}

      {showSuggestions && !isLoading && (
        <ul className="small-suggestion-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="small-suggestion-item">
              <strong>{suggestion.item}</strong> - ₹{suggestion.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
