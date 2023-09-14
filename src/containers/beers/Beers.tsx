import Filter from '../../components/filters/Filter'
import './Beers.css'

export default function Beers() {
  return (
    <div className='beers-container'>
      <div>
        <h2>Beers</h2>
        <Filter />
      </div>
      <div className='grid-container'>
        <div className='grid-item rect1'></div>
        <div className='grid-item rect2'></div>
        <div className='grid-item rect3'></div>
        <div className='grid-item rect1'></div>
        <div className='grid-item rect2'></div>
        <div className='grid-item rect3'></div>
        <div className='grid-item rect1'></div>
        <div className='grid-item rect2'></div>
        <div className='grid-item rect3'></div>
        
      </div>
    </div>
  )
}
