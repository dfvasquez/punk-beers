import background from '../../assets/background.svg'
import './Background.css'

export default function Background() {
  return (
    <div id='background-container'>
      <img id='background' src={background} alt='Beers' />
    </div>
  )
}
