import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/navBar/NavBar'
import Background from './components/background/Background'
import Home from './containers/home/Home'

const App = () => {
  return (
    <Router>
      <Nav />
      <Background />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
