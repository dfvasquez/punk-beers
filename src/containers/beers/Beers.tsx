import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { setBeers, setLoading } from '../../store/beersSlice'
import { getAllBeers } from '../../api/Beers'
import { IApi } from '../../interfaces/Beer'
import { constants } from '../../utils/constants'
import { sortByName, sortByAbv, sortByIbu } from '../../utils/beerDataHandler'
import SortBy from '../../components/sortBy/SortBy'
import NotFound from '../../components/notFound/NotFound'
import defaultBeerImage from '../../assets/beers.svg'
import './Beers.css'

export default function Beers() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loadingShort } = constants
  const loading = useSelector(
    (state: RootState): boolean => state.beers.loading
  )
  const beers = useSelector((state: RootState): IApi[] => state.beers.beers)
  const [sortedBeers, setSortedBeers] = useState<IApi[]>()

  const handleOnClick = (beerId: string) => {
    navigate(`/beers/${beerId}`)
  }

  const handleButton = () => {
    dispatch(setLoading(true))
    getAllBeers()
      .then((data) => {
        dispatch(setBeers(data))
      })
      .finally(() => {
        setTimeout(() => dispatch(setLoading(false)), loadingShort)
      })
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
      {loading ? (
        <div className='loading-container'>
          <div className='spinner'>
            <img className='loading-beer' src={defaultBeerImage} alt='Beers' />
          </div>
        </div>
      ) : (
        <>
          {sortedBeers?.length ? (
            <>
              <div className='filters-container'>
                <SortBy onSort={handleSort} />
              </div>
              <div className='grid-container'>
                {sortedBeers &&
                  sortedBeers.map((beer: IApi, index: number) => (
                    <div
                      key={index}
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
                          {beer.name} ({beer.volume.value} {beer.volume.unit} -{' '}
                          {beer.abv} % - {beer.ibu} IBU)
                        </h2>
                        <p>{beer.tagline}</p>
                        <p className='beer-item-description'>
                          {beer.ingredients.yeast}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className='empty-container'>
              <NotFound
                title={`BEERS NOT FOUND`}
                description={`We couldn't find a beer that includes the parameters of your search`}
                action={{
                  text: 'Check out our amazing beers',
                  buttonProps: {
                    text: 'here',
                    onClick: handleButton,
                    type: 'primary'
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
