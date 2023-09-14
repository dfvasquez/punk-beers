import beers from '../../assets/beers.svg'
import './Home.css'

export default function Home() {
  return (
    <div>
      <h1 id='title'>Find the beer that match with you.</h1>
      <div>
        <img className='beers-image' src={beers} alt='3 Beers' />
      </div>
    </div>
  )
}
