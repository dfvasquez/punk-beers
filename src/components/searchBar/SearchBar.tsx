import React, { ChangeEvent, useState } from 'react'

export interface ISearchBarProps {
  onSearch: (query: string) => void
}

const SearchInput: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Search for beers...'
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchInput
