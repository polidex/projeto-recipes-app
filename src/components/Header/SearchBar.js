import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Context from '../../context/Context';
import SearchOptions from './SearchOptions';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { handleSearch } = useContext(Context);
  const location = useLocation();

  const handleChange = (evt) => {
    const { target } = evt;
    const LAST_CHAR = -1;

    if (target.type === 'radio') {
      setSearchRadio(target.value);
      setSearchValue('');
      return;
    }

    setSearchValue(
      searchRadio === 'first-letter'
        ? target.value.slice(LAST_CHAR)
        : target.value,
    );
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (searchValue.length > 1 && searchRadio === 'first-letter') {
      global.alert('A busca por primeira letra só pode ter 1 caractere');
    } else {
      const searchObj = {
        type: location.pathname.replace('/', ''),
        option: searchRadio,
        value: searchValue,
      };
      handleSearch(searchObj);
      setRedirect(true);
    }
  };

  return (
    <>
      { redirect && <Redirect to="/foods/search" /> }
      <div id="search">
        <form onSubmit={ handleSubmit }>
          <div>
            <input
              type="text"
              id="search-input"
              name="search-input"
              value={ searchValue }
              onChange={ handleChange }
              data-testid="search-input"
            />
          </div>
          <SearchOptions option={ searchRadio } handleChange={ handleChange } />
          <div>
            <button
              type="submit"
              id="exec-search-btn"
              name="exec-search-btn"
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
