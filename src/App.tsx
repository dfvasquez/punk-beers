import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBeers } from './store/beersSlice'
import { getAllBeers } from './api/Beers'
import Nav from './components/navBar/NavBar'
import Background from './components/background/Background'
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
      </Routes>
    </Router>
  )
}

export default App
