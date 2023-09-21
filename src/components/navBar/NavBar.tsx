import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getBeersByName } from '../../api/Beers'
import { constants } from '../../utils/constants'
import SearchInput from '../searchBar/SearchBar'
import './NavBar.css'
import {
  setBeers,
  setLoading,
  setPage,
  setTotalPages
} from '../../store/beersSlice'

export default function NavBar() {
   const dispatch = useDispatch()
const { loadingShort } = constants
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

   const handleSearch = (query: string) => {
    dispatch(setLoading(true))
    dispatch(setPage(1))
    getBeersByName(query, 1)
      .then((data) => {
        dispatch(setBeers(data))
        dispatch(setTotalPages(data))
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
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  )
}
