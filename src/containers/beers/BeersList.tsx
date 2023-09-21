import React from 'react'
import { IApi } from '../../interfaces/Beer'
import defaultBeerImage from '../../assets/beers.svg'

interface IBeersListProps {
    sortedBeers: IApi[]
    handleOnClick: (id: string) => void
}

const BeersList: React.FC<IBeersListProps> = ({sortedBeers, handleOnClick}) => {
  return (
    <div className='grid-container'>
      {sortedBeers &&
        sortedBeers.map((beer: IApi, index: number) => (
          <div
            key={beer.id}
            className='grid-item flex-col'
            onClick={() => handleOnClick(beer.id)}>
            <div className='beer-item-image-container'>
              <img
                className='beer-item-image'
                src={beer.image_url ?? defaultBeerImage}
                alt='Beer'
              />
            </div>
            <div className='beer-item-footer'>
              <h2 className='beer-item-title'>
                {beer.name} ({beer.volume.value} {beer.volume.unit} - {beer.abv}{' '}
                % - {beer.ibu} IBU)
              </h2>
              <p>{beer.tagline}</p>
              <p className='beer-item-description'>{beer.ingredients.yeast}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BeersList
