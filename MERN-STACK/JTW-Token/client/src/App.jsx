import React from 'react'
import Register from './component/Register'
import Login from './component/Login/Index'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './component/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={ < Register />}/>
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
