import React, { ChangeEvent, useState } from 'react'
import './SortBy.css'

interface ISortByProps {
  onSort: (selectedValue: string) => void
}

const SortBy: React.FC<ISortByProps> = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState('') // Default sorting criteria

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    setSelectedSort(selectedValue)
    onSort(selectedValue)
  }

  return (
    <div className='sort-by-container'>
      <label className='sort-by-label' htmlFor='sort-select'>
        Sort by:
      </label>
      <select id='sort-select' value={selectedSort} onChange={handleSortChange}>
        <option value='' disabled>Select an option...</option>
        <option value='name'>Name</option>
        <option value='abv'>ABV (Alcohol by Volume)</option>
        <option value='ibu'>IBU (International Bitterness Units)</option>
      </select>
    </div>
  )
}

export default SortBy
