import React, { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'

import Sidebar from './Component/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  const [sidebar, setSidebar] = useState(true)
  return (
    <div>
     
      <Navbar  setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/home' element={<Home sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
  {/* <Home/> removed: already rendered via Routes */}
    </div>
  ) 
}

export default App
