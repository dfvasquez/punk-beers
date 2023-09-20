import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBeers, setLoading, setTotalPages } from './store/beersSlice'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    getAllBeers(1)
      .then((data) => {
        dispatch(setBeers(data))
        dispatch(setTotalPages(data))
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
              action={{
                text: 'Check out our amazing beers',
                buttonProps: {
                  text: 'here',
                  onClick: () => navigate('/beers'),
                  type: 'primary'
                }
              }}
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
