import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/navBar/NavBar'
import Background from './components/background/Background'
import Home from './containers/home/Home'
import Beers from './containers/beers/Beers'

const App = () => {
  return (
    <Router>
      <Nav />
      <Background />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/beers' element={<Beers />} />
      </Routes>
    </Router>
  )
}

export default App
