import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import './NavBar.css'

export default function NavBar() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const currentPosition = window.scrollY
      setIsScrolling(currentPosition > scrollTop && currentPosition > 60)
      setScrollTop(currentPosition)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollTop])

  return (
    <div
      className={classNames('navbar active', {
        hidden: isScrolling,
        scrollingBack: scrollTop > 61
      })}>
      <div className='logo-container'>
        <Link to='/' className='not-link navbar-logo'>
          <h2 className='logo'>Punk Beers</h2>
        </Link>
      </div>
      <div className='pages-container'>
        <Link to='/beers' className='not-link navbar-item'>
          <h2 className='logo'>Beers</h2>
        </Link>
        <Link to='/beers' className='not-link navbar-item'>
          <h2 className='logo'>My favorite beers</h2>
        </Link>
      </div>
    </div>
  )
}
