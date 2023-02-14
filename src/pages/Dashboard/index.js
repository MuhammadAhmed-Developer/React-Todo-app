import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'

export default function index() {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='todos' element={<Todos/>} />
        </Route>
    </Routes>
  )
}
