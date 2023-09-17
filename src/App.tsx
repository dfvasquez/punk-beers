import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBeers } from './store/beersSlice'
import { getAllBeers } from './api/Beers'
import Nav from './components/navBar/NavBar'
import Background from './components/background/Background'
import NotFound from './components/notFound/NotFound'
import Home from './containers/home/Home'
import Beers from './containers/beers/Beers'
import Beer from './containers/beer/Beer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAllBeers().then((data) => {
      dispatch(setBeers(data))
    })
  }, [dispatch])
  return (
    <Router>
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
    </Router>
  )
}

export default App
