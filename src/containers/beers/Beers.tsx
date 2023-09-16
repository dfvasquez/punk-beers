import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { IApi } from '../../interfaces/Beer'
import Filter from '../../components/filters/Filter'
import SortBy from '../../components/sortBy/SortBy'
import { sortByName, sortByAbv, sortByIbu } from '../../utils/beerDataHandler'
import './Beers.css'

export default function Beers() {
  const navigate = useNavigate()
  const beers = useSelector((state: RootState): IApi[] => state.beers.beers)
  const [sortedBeers, setSortedBeers] = useState<IApi[]>()

  const handleOnClick = (beerId: string) => {
    navigate(`/beers/${beerId}`)
  }

  const handleSort = (criteria: string) => {
    let sorted = [...beers]
    if (criteria === 'name') {
      sorted = sortByName(sorted)
    } else if (criteria === 'abv') {
      sorted = sortByAbv(sorted)
    } else {
      sorted = sortByIbu(sorted)
    }
    setSortedBeers(sorted)
  }

  useEffect(() => {
    if (beers) {
      setSortedBeers(beers)
    }
  }, [beers])

  return (
    <div className='beers-container'>
      <div className='filters-container'>
        <Filter />
        <SortBy onSort={handleSort} />
      </div>
      <div className='grid-container'>
        {sortedBeers &&
          sortedBeers.map((beer: IApi, index: number) => (
            <div
              key={index}
              className='grid-item'
              onClick={() => handleOnClick(beer.id)}>
              <div className='beer-item-image-container'>
                <img
                  className='beer-item-image'
                  src={beer.image_url}
                  alt='Beer'
                />
              </div>
              <div className='beer-item-footer'>
                <h2 className='beer-item-title'>
                  {beer.name} ({beer.volume.value} {beer.volume.unit} -{' '}
                  {beer.abv} %)
                </h2>
                <p>{beer.tagline}</p>
                <p className='beer-item-description'>
                  {beer.ingredients.yeast}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
