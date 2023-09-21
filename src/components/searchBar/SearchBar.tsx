import React, { ChangeEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ActionButton from '../buttons/actionButton/ActionButton'
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setBeersSearch } from '../../store/beersSlice'
import { RootState } from '../../store/store'
export interface ISearchBarProps {
  onSearch: (query: string) => void
  onClean: () => void
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch, onClean }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { beersSearch } = useSelector((state: RootState) => state.beers)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearch = async () => {
    if (query) {
      await onSearch(query)
      dispatch(setBeersSearch(query))
      if (location.pathname !== '/beers') navigate('/beers')
    }
  }

  const handleClean = async () => {
    if (beersSearch) await onClean()
    dispatch(setBeersSearch(''))
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
      <div className='buttons-container'>
        <div className='button-container'>
          <ActionButton text='Search' type='primary' onClick={handleSearch} />
        </div>
        <div className='button-container'>
          <ActionButton
            text='Clean Search'
            type='inactive'
            onClick={handleClean}
            disabled={!query}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
