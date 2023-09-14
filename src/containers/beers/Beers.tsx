import { useEffect, useState } from 'react'
import Filter from '../../components/filters/Filter'
import { getAllBeers } from '../../api/Beers'
import { IBeer } from '../../interfaces/Beer'
import { cleanBeersData } from '../../utils/beerDataHandler'
import './Beers.css'

export default function Beers() {
  const [beers, setBeers] = useState<Array<IBeer>>([])

  useEffect(() => {
    getAllBeers().then((data) => {
      setBeers(cleanBeersData(data))
    })
  }, [])

  return (
    <div className='beers-container'>
      <div>
        <h2>Beers</h2>
        <Filter />
      </div>
      <div className='grid-container'>
        {beers.map((beer, index: number) => (
          <div key={index} className='grid-item'>
            <div className='beer-item-image-container'>
              <img
                className='beer-item-image'
                src={beer.image_url}
                alt='Beer'
              />
            </div>
            <div className='beer-item-footer'>
              <h2 className='beer-item-title'>
                {beer.name} - {beer.abv}%
              </h2>
              <p className='beer-item-description'>{beer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
