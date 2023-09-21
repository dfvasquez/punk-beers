import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import {
  setBeers,
  setPage,
  setMoreBeers,
  setSorted,
  setLoading,
  setTotalPages
} from '../../store/beersSlice'
import { getAllBeers, getBeersByName } from '../../api/Beers'
import { IApi } from '../../interfaces/Beer'
import { constants } from '../../utils/constants'
import { sliceBeers, sortBeers } from '../../utils/beerDataHandler'
import SortBy from '../../components/sortBy/SortBy'
import NotFound from '../../components/notFound/NotFound'
import Loading from '../../components/loading/Loading'
import Pagination from '../../components/pagination/Pagination'
import BeersList from './BeersList'
import './Beers.css'

export default function Beers() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loadingShort } = constants
  const { beers, beersSearch, page, beersPerPage, totalPages, loading } =
    useSelector((state: RootState) => state.beers)
  const [sortedBeers, setSortedBeers] = useState<IApi[]>()
  const [localPage, setLocalPage] = useState<number>(1)

  const handleOnClick = (beerId: string) => {
    navigate(`/beers/${beerId}`)
  }

  const handleSort = async (criteria: string) => {
    const sorted = sortBeers([...beers], criteria)
    await dispatch(setSorted(sorted))
    setLocalPage(1)
  }

  const handleBackButton = () => {
    dispatch(setLoading(true))
    getAllBeers(1)
      .then((data) => {
        dispatch(setPage(1))
        dispatch(setBeers(data))
        dispatch(setTotalPages(data))
      })
      .finally(() => {
        setTimeout(() => dispatch(setLoading(false)), loadingShort)
      })
  }

  const fetchMoreBeers = () => {
    if (beersSearch) {
      getBeersByName(beersSearch, page + 1).then((data) => {
        if (data.length) {
          dispatch(setPage(page + 1))
          dispatch(setMoreBeers(data))
        }
      })
    } else {
      getAllBeers(page + 1).then((data) => {
        if (data.length) {
          dispatch(setPage(page + 1))
          dispatch(setMoreBeers(data))
        }
      })
    }
  }

  useEffect(() => {
    if (page === 1) {
      setLocalPage(1)
    }
  }, [page])

  useEffect(() => {
    setSortedBeers(sliceBeers(beers, localPage, beersPerPage))
  }, [beers, beersPerPage, localPage])

  useEffect(() => {
    if (localPage >= totalPages - 1) {
      fetchMoreBeers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localPage])

  useEffect(() => {
    dispatch(setTotalPages(beers))
  }, [beers, dispatch])

  const onPageChange = (newPage: number) => {
    setLocalPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className='beers-container'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {sortedBeers?.length ? (
            <div className='beers-full-container'>
              <div className='filters-container'>
                <SortBy onSort={handleSort} />
              </div>
              <Pagination
                currentPage={localPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
              <BeersList
                sortedBeers={sortedBeers}
                handleOnClick={handleOnClick}
              />
              <Pagination
                currentPage={localPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          ) : (
            <div className='empty-container'>
              <NotFound
                title={`BEERS NOT FOUND`}
                description={`We couldn't find a beer that includes the parameters of your search`}
                action={{
                  text: 'Check out our amazing beers',
                  buttonProps: {
                    text: 'here',
                    onClick: handleBackButton,
                    type: 'primary'
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
