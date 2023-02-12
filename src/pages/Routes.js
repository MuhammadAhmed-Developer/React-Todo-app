import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from './Frontend'
export default function Index() {
  return (
    <BrowserRouter>
          <Routes>
             <Route index="/*" element= {<Frontend/>}/>
          </Routes>
    </BrowserRouter>
  )
}
