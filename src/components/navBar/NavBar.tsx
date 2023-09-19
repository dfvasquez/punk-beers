import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getFilteredBeers } from '../../api/Beers'
import { constants } from '../../utils/constants'
import SearchInput from '../searchBar/SearchBar'
import './NavBar.css'
import { setBeers, setLoading } from '../../store/beersSlice'

export default function NavBar() {
  const dispatch = useDispatch()
  const { loadingShort } = constants
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  const handleSearch = (query: string) => {
    dispatch(setLoading(true))
    getFilteredBeers(query)
      .then((data) => {
        dispatch(setBeers(data))
      })
      .finally(() => {
        setTimeout(() => dispatch(setLoading(false)), loadingShort)
      })
  }

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
        {/* <Link to='/beers' className='not-link navbar-item'>
          <h2 className='logo'>Beers</h2>
        </Link> */}
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  )
}
