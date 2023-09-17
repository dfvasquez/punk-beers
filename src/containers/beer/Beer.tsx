import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import NotFound from '../../components/notFound/NotFound'
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
              <h2 className='beer-main-description'>
                {beer.tagline} ({beer.volume.value} {beer.volume.unit} -{' '}
                {beer.abv} % - {beer.ibu} IBU)
              </h2>
              <p className='beer-long-description'>{beer.description}</p>
              {beer.brewers_tips && (
                <p className='beer-long-description italic'>
                  "{beer.brewers_tips}"
                </p>
              )}
              <div className='food-pairing-container'>
                <h2 className='food-pairing-title'>Food pairing</h2>
                <p className='food-pairing-description'>
                  {beer.food_pairing.join(', ')}.
                </p>
              </div>

              {beer.ingredients.yeast && (
                <div className='food-pairing-container'>
                  <h2 className='food-pairing-title'>Yeast</h2>
                  <p className='food-pairing-description'>
                    {beer.ingredients.yeast}.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='food-ingredients-container'>
            <div className='food-ingredients-malt-container'>
              <h2 className='food-pairing-title'>Malt ingredients</h2>
              <div className='food-ingredients-sub-container'>
                {beer.ingredients.malt.map((ingredient, index: number) => (
                  <p key={index} className='food-ingredient'>
                    {ingredient.name} ({ingredient.amount.value}{' '}
                    {ingredient.amount.unit})
                  </p>
                ))}
              </div>
            </div>

            <div className='food-ingredients-hops-container'>
              <h2 className='food-pairing-title'>Hops ingredients</h2>
              <div className='food-ingredients-sub-container'>
                {beer.ingredients.hops.map((ingredient, index: number) => (
                  <p key={index} className='food-ingredient'>
                    {ingredient.name} ({ingredient.amount.value}{' '}
                    {ingredient.amount.unit})
                  </p>
                ))}
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
