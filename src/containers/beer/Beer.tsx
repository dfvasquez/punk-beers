import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import NotFound from '../../components/notFound/NotFound'
import { useEffect, useState } from 'react'
import { setLoading } from '../../store/beersSlice'
import { getBeerById } from '../../api/Beers'
import { IApi } from '../../interfaces/Beer'
import { constants } from '../../utils/constants'
import './Beer.css'
import BeerDetails from './BeerDetails'

const Beer = () => {
  const { beerId } = useParams()
  const { loadingShort } = constants
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const beer = useSelector((state: RootState) =>
    state.beers.beers.find((beer) => beer.id.toString() === beerId)
  )
  const [foundBeer, setFoundBeer] = useState<IApi>()

  const handleButton = () => {
    navigate('/beers')
  }

  useEffect(() => {
    if (!beer) {
      dispatch(setLoading(true))
      getBeerById(beerId)
        .then((data) => {
          if (data.length > 0) setFoundBeer(data[0])
        })
        .finally(() => {
          setTimeout(() => dispatch(setLoading(false)), loadingShort)
        })
    } else {
      setFoundBeer(beer)
    }
  }, [beer, dispatch, loadingShort, beerId])

  return (
    <div className='beer-container'>
      {foundBeer ? (
        <BeerDetails foundBeer={foundBeer} />
      ) : (
        <div className='empty-beer-container'>
          <NotFound
            title='BEER NOT FOUND'
            description={`OOPS! Seems the beer you're trying to find doesn't exist (yet).`}
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
    </div>
  )
}

export default Beer
