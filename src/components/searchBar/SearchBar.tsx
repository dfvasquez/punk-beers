import React, { ChangeEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ActionButton from '../buttons/actionButton/ActionButton'
import './SearchBar.css'
export interface ISearchBarProps {
  onSearch: (query: string) => void
}

const SearchInput: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearch = async () => {
    await onSearch(query)
    setQuery('')
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
      <ActionButton text='Search' type='primary' onClick={handleSearch} />
    </div>
  )
}

export default SearchInput
