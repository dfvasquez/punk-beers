import React, { ChangeEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ActionButton from '../buttons/actionButton/ActionButton'
import './SearchBar.css'
import { useDispatch } from 'react-redux'
import { setBeersSearch } from '../../store/beersSlice'
export interface ISearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearch = async () => {
    await onSearch(query)
    dispatch(setBeersSearch(query))
    if (location.pathname !== '/beers') navigate('/beers')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch()
  }

  return (
    <div className='search-bar-container'>
      <input
        type='text'
        placeholder='Search for beers...'
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className='buttons-container'>
        <div className='button-container'>
          <ActionButton text='Search' type='primary' onClick={handleSearch} />
        </div>
        <div className='button-container'>
          <ActionButton text='Clean Search' type='inactive' onClick={handleSearch} disabled={!query} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
