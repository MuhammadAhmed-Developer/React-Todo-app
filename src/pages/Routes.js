import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from './Frontend'
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import { AuthContext } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';



export default function Index() {

  const {isAuthenticated} = useContext(AuthContext)


  return (
    <BrowserRouter>
          <Routes>
             <Route path="/*" element= {<Frontend/>}/>
             <Route path="/authentication/*" element= {!isAuthenticated ? <Authentication/>: <Navigate to='/dashboard'/>}/>
             <Route path="/dashboard/*" element= {<PrivateRoute Component={Dashboard}/>}/>
          </Routes>
    </BrowserRouter>
  )
}
