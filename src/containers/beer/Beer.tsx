import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import NotFound from '../../components/notFound/NotFound'
import Definition from '../../components/definition/Definition'
import { useEffect, useState } from 'react'
import { setLoading } from '../../store/beersSlice'
import { getBeerById } from '../../api/Beers'
import { IApi } from '../../interfaces/Beer'
import { constants } from '../../utils/constants'
import defaultBeerImage from '../../assets/beers.svg'
import './Beer.css'

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
        <div className='beer-sub-container'>
          <h1 className='beer-title'>{foundBeer.name}</h1>
          <div className='beer-content-container'>
            <div className='beer-image-container'>
              <img
                className='beer-image'
                src={foundBeer.image_url ?? defaultBeerImage}
                alt='Beer'
              />
            </div>
            <div className='beer-description-container'>
              <Definition
                title={`${foundBeer.tagline} (${foundBeer.volume.value} ${foundBeer.volume.unit} - ${foundBeer.abv} % - ${foundBeer.ibu} IBU)`}
                description={
                  <>
                    <p>{foundBeer.description}</p>
                    {foundBeer.brewers_tips && (
                      <p className='italic'>"{foundBeer.brewers_tips}"</p>
                    )}
                  </>
                }
              />
              <Definition
                title={`Food pairing`}
                description={<p>{foundBeer.food_pairing.join(', ')}.</p>}
              />

              {foundBeer.ingredients.yeast && (
                <Definition
                  title={`Yeast`}
                  description={<p>{foundBeer.ingredients.yeast}.</p>}
                />
              )}

              <div>
                <div>
                  <Definition
                    title={`Malt ingredients`}
                    description={
                      <div>
                        {foundBeer.ingredients.malt.map(
                          (ingredient, index: number) => (
                            <p key={index}>
                              {ingredient.name} ({ingredient.amount.value}{' '}
                              {ingredient.amount.unit})
                            </p>
                          )
                        )}
                      </div>
                    }
                  />
                </div>

                <div>
                  <Definition
                    title={`Hops ingredients`}
                    description={
                      <div>
                        {foundBeer.ingredients.hops.map(
                          (ingredient, index: number) => (
                            <p key={index}>
                              {ingredient.name} ({ingredient.amount.value}{' '}
                              {ingredient.amount.unit})
                            </p>
                          )
                        )}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Beer
