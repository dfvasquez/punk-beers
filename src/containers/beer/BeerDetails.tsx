import React from 'react'
import { IApi } from '../../interfaces/Beer'
import defaultBeerImage from '../../assets/beers.svg'
import Definition from '../../components/definition/Definition'
import './Beer.css'

interface IBeerDetailsProps {
  foundBeer: IApi
}

const BeerDetails: React.FC<IBeerDetailsProps> = ({ foundBeer }) => {
  return (
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
  )
}

export default BeerDetails
