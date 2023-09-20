import background from '../../assets/background.svg'
import './Background.css'

export default function Background() {
  return (
    <div className='background-container'>
      <img id='background' src={background} alt='Beers' />
      <div className='background-color'/>
    </div>
  )
}
