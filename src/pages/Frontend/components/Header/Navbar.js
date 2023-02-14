import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../../config/firebase'
import { AuthContext } from '../../../../context/AuthContext'


export default function Navbar() {

 const {isAuthenticated, dispatch} = useContext(AuthContext)

 
//  console.log(dispatch)

 const handleLogout = () =>{
 
  signOut(auth)
   .then(()=>{
     dispatch({type:"LOGOUT"})

   }).catch((err)=>{
     console.log(err)
   })
 }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container">
      <Link to='/' className="navbar-brand">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to='/' className="nav-link active">Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/about' className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to='/contact' className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to='/todos' className="nav-link">Todos</Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li> */}
        </ul>
        <div className="d-flex">
          {!isAuthenticated
          ?
          <Link to='/authentication/login' className="btn btn-primary" type="submit">Login</Link>
          :
          <>
          <Link to='/dashboard' className="btn btn-primary" type="submit">Dashboard</Link>
          <button className='btn btn-danger ms-2' onClick={handleLogout}>Logout</button>
          </>
          }
        </div>
      </div>
    </div>
  </nav>
  )
}
