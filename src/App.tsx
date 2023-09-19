import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBeers, setLoading } from './store/beersSlice'
import { getAllBeers } from './api/Beers'
import { constants } from './utils/constants'
import Nav from './components/navBar/NavBar'
import Background from './components/background/Background'
import NotFound from './components/notFound/NotFound'
import Home from './containers/home/Home'
import Beers from './containers/beers/Beers'
import Beer from './containers/beer/Beer'

const RoutesComponent = () => {
  const { loadingLong } = constants
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    dispatch(setLoading(true))
    getAllBeers()
      .then((data) => {
        dispatch(setBeers(data))
      })
      .finally(() => {
        setTimeout(() => dispatch(setLoading(false)), loadingLong)
      })
  }, [dispatch, loadingLong])
  return (
    <>
      <Nav />
      <Background />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/beers' element={<Beers />} />
        <Route path='/beers/:beerId' element={<Beer />} />
        <Route
          path='*'
          element={
            <NotFound
              title='404 NOT FOUND'
              description={`OOPS! Seems the page you're trying to find doesn't exist (yet).`}
            />
          }
        />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <RoutesComponent />
    </Router>
  )
}

export default App
