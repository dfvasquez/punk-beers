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
import { getAllBeers } from '../../api/Beers'
import { IApi } from '../../interfaces/Beer'
import { constants } from '../../utils/constants'
import {
  sortByName,
  sortByAbv,
  sortByIbu,
  sortById
} from '../../utils/beerDataHandler'
import SortBy from '../../components/sortBy/SortBy'
import NotFound from '../../components/notFound/NotFound'
import defaultBeerImage from '../../assets/beers.svg'
import './Beers.css'
import Pagination from '../../components/pagination/Pagination'

export default function Beers() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loadingShort } = constants
  const { beers, page, beersPerPage, totalPages, loading } = useSelector(
    (state: RootState) => state.beers
  )
  const [sortedBeers, setSortedBeers] = useState<IApi[]>()
  const [localPage, setLocalPage] = useState<number>(1)

  const handleOnClick = (beerId: string) => {
    navigate(`/beers/${beerId}`)
  }

  const handleSort = async (criteria: string) => {
    let sorted = [...beers]
    if (criteria === 'name') {
      sorted = sortByName(sorted)
    } else if (criteria === 'abv') {
      sorted = sortByAbv(sorted)
    } else if (criteria === 'ibu') {
      sorted = sortByIbu(sorted)
    } else {
      sorted = sortById(sorted)
    }
    await dispatch(setSorted(sorted))
    setLocalPage(1)
  }

  const handleBackButton = () => {
    dispatch(setLoading(true))
    getAllBeers(1)
      .then((data) => {
        dispatch(setBeers(data))
        dispatch(setTotalPages(data))
      })
      .finally(() => {
        setTimeout(() => dispatch(setLoading(false)), loadingShort)
      })
  }

  const fetchMoreBeers = () => {
    getAllBeers(page + 1).then((data) => {
      if (data.length) {
        dispatch(setPage(page + 1))
        dispatch(setMoreBeers(data))
      }
    })
  }

  useEffect(() => {
    if (page === 1) {
      setLocalPage(1)
    }
  }, [page])

  useEffect(() => {
    setSortedBeers(
      beers.slice(
        (localPage - 1) * beersPerPage,
        (localPage - 1) * beersPerPage + beersPerPage
      )
    )
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
        <div className='loading-container'>
          <div className='spinner'>
            <img className='loading-beer' src={defaultBeerImage} alt='Beers' />
          </div>
        </div>
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
              <div className='grid-container'>
                {sortedBeers &&
                  sortedBeers.map((beer: IApi, index: number) => (
                    <div
                      key={beer.id}
                      className='grid-item flex-col'
                      onClick={() => handleOnClick(beer.id)}>
                      <div className='beer-item-image-container'>
                        <img
                          className='beer-item-image'
                          src={beer.image_url ?? defaultBeerImage}
                          alt='Beer'
                        />
                      </div>
                      <div className='beer-item-footer'>
                        <h2 className='beer-item-title'>
                          {beer.name} ({beer.volume.value} {beer.volume.unit} -{' '}
                          {beer.abv} % - {beer.ibu} IBU)
                        </h2>
                        <p>{beer.tagline}</p>
                        <p className='beer-item-description'>
                          {beer.ingredients.yeast}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              {loading && (
                <div className='loading-container'>
                  <div className='spinner'>
                    <img
                      className='loading-beer'
                      src={defaultBeerImage}
                      alt='Beers'
                    />
                  </div>
                </div>
              )}
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
