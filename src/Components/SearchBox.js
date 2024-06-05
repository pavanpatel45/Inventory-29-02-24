import React from 'react';
import { useState } from 'react';
import search1 from '../Icons/search.png';

function SearchBox({ search, setSearch }) {
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className='border border-1 border-r mr-4 flex flex-row items-center relative box-style'
      style={{ borderRadius: '100px' }}
      onClick={handleSearchClick}
    >
      <img src={search1} alt='icon' className='ml-3' />
      <input
        type='text'
        className='pl-2 txt-style'
        style={{
          width: isSearchClicked ? '330px' : '190px',
          fontSize: '14px',
          color: '#A2A1A1'
        }}
        placeholder={isSearchClicked ? 'Type here to search' : 'Search'}
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBox;
