import './App.css'
import Toprated from './Toprated'
import Home from './Home'
import Trending from './Trending'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Navbar'
import SearchMovies from './search'

function App() {
// media:{mobile:"768px",tab:"998px"},
  return (

    <BrowserRouter>
    <Nav/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/search' element={<SearchMovies/>}/>
  <Route path='/trending' element={<Trending/>}/>  
  <Route path='/toprated' element={<Toprated/>}/>
  </Routes>
  <Footer/>
    </BrowserRouter>
  
  );
}

export default App
