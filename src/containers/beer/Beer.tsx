import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Beer.css'

const Beer = () => {
  const { beerId } = useParams()
  const beer = useSelector((state: RootState) =>
    state.beers.beers.find((beer) => beer.id.toString() === beerId)
  )
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
                {beer.abv} %)
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
                  <p className='food-ingredient'>
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
                  <p className='food-ingredient'>
                    {ingredient.name} ({ingredient.amount.value}{' '}
                    {ingredient.amount.unit})
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* {beer.method.mash_temp.map((mash, index: number) => (
              <div>
                <p className='beer-item-description'>Mash</p>
                <p>
                  Temperature: {mash.temp.value} {mash.temp.unit}
                </p>
                <p>Duration: {mash.duration}</p>
              </div>
            ))} */}
          {/*  <div>
              <p className='beer-item-description'>Fermentation</p>
              <p>
                Temperature: {beer.method.fermentation.temp.value}{' '}
                {beer.method.fermentation.temp.unit}
              </p>
            </div> */}
          {/*   {beer.method.twist && <p>Twist: {beer.method.twist}</p>} */}
        </div>
      ) : (
        <div> BEER NOT FOUND</div>
      )}
    </div>
  )
}

export default Beer
