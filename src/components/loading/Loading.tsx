import React from 'react'
import defaultBeerImage from '../../assets/beers.svg'
import './Loading.css'

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='spinner'>
        <img className='loading-beer' src={defaultBeerImage} alt='Beers' />
      </div>
    </div>
  )
}
