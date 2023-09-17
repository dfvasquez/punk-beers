import React, { ChangeEvent, useState, useEffect } from 'react'
import { saveSortingPreference } from '../../utils/localStorageHandler'
import ActionButton from '../buttons/actionButton/ActionButton'
import './SortBy.css'

interface ISortByProps {
  onSort: (selectedValue: string) => void
}

const SortBy: React.FC<ISortByProps> = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState<string>('')

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    setSelectedSort(newValue)
    saveSortingPreference(newValue)
    onSort(newValue)
  }

  const clearUserPreferences = () => {
    localStorage.removeItem('sortingOption')
    setSelectedSort('')
    onSort('')
  }

  useEffect(() => {
    const savedSortingOption = localStorage.getItem('sortingOption')
    if (savedSortingOption) {
      setSelectedSort(savedSortingOption)
      onSort(savedSortingOption)
    } else {
      setSelectedSort('')
      saveSortingPreference('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort])

  return (
    <div className='sort-by-container'>
      <div className='sort-by-sub-container'>
        <label className='sort-by-label' htmlFor='sort-select'>
          Sort by:
        </label>
        <select
          id='sort-select'
          value={selectedSort}
          onChange={handleSortChange}>
          <option className='sort-by-option' value='' disabled>
            Select an option...
          </option>
          <option className='sort-by-option' value='name'>
            Name
          </option>
          <option className='sort-by-option' value='abv'>
            ABV (Alcohol by Volume)
          </option>
          <option className='sort-by-option' value='ibu'>
            IBU (International Bitterness Units)
          </option>
        </select>
      </div>

      <ActionButton
        onClick={clearUserPreferences}
        text='Clear preferences'
        type='inactive'
      />
    </div>
  )
}

export default SortBy
