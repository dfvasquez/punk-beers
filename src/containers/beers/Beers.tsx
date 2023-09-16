import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { IApi } from '../../interfaces/Beer'
import Filter from '../../components/filters/Filter'
import './Beers.css'

export default function Beers() {
  const navigate = useNavigate()
  const beers = useSelector((state: RootState): IApi[] => state.beers.beers)

  const handleOnClick = (beerId: string) => {
    navigate(`/beers/${beerId}`)
  }

  return (
    <div className='beers-container'>
      <div>
        <h2>Beers</h2>
        <Filter />
      </div>
      <div className='grid-container'>
        {beers &&
          beers.map((beer: IApi, index: number) => (
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
