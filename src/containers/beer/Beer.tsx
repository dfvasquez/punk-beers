import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import NotFound from '../../components/notFound/NotFound'
import Definition from '../../components/definition/Definition'
import './Beer.css'

const Beer = () => {
  const { beerId } = useParams()
  const navigate = useNavigate()
  const beer = useSelector((state: RootState) =>
    state.beers.beers.find((beer) => beer.id.toString() === beerId)
  )

  const handleButton = () => {
    navigate('/beers')
  }

  return (
    <div className='beer-container'>
      {beer ? (
        <div className='beer-sub-container'>
          <h1 className='beer-title'>{beer.name}</h1>
          <div className='beer-content-container'>
            <div className='beer-image-container'>
              <img className='beer-image' src={beer.image_url} alt='Beer' />
            </div>
            <div className='beer-description-container'>
              <Definition
                title={`${beer.tagline} (${beer.volume.value} ${beer.volume.unit} - ${beer.abv} % - ${beer.ibu} IBU)`}
                description={
                  <>
                    <p>{beer.description}</p>
                    {beer.brewers_tips && (
                      <p className='italic'>"{beer.brewers_tips}"</p>
                    )}
                  </>
                }
              />
              <Definition
                title={`Food pairing`}
                description={<p>{beer.food_pairing.join(', ')}.</p>}
              />

              {beer.ingredients.yeast && (
                <Definition
                  title={`Yeast`}
                  description={<p>{beer.ingredients.yeast}.</p>}
                />
              )}

              <div>
                <div>
                  <Definition
                    title={`Malt ingredients`}
                    description={
                      <div>
                        {beer.ingredients.malt.map(
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
                        {beer.ingredients.hops.map(
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
