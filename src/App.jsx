import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './components/CreatePost'

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
      </Routes> */}

      <CreatePost/>
      
      
    </div>
  )
}

export default App