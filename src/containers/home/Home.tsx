import beers from '../../assets/beers.svg'
import ActionButton from '../../components/buttons/actionButton/ActionButton'
import './Home.css'

export default function Home() {
  return (
    <div className='home-container'>
      <div className='home-sub-container'>
        <h1 id='title'>Find the beer that match with you.</h1>
        <ActionButton
          text='Browse our beers!'
          type='secondary'
          onClick={() => console.log('Clicked')}
        />
      </div>
      <div className='home-content-container'>
        <img className='beers-image' src={beers} alt='3 Beers' />
        <div className='content'>
          <div className='sub-content'>
            Have you ever wanted to search through Brewdog's expansive back
            catalogue of beer in a programmatic way? Maybe build a tool that
            pairs beer with food, or search beers with an abv of more than 4%?
            Well now your prayers have been answered!
          </div>
        </div>
      </div>
    </div>
  )
}
