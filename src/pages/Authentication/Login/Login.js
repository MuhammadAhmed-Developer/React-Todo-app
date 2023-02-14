import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../../config/firebase'
// import { useNavigate } from 'react-router-dom';

const initialState = {
  email:"",
  password:"",
}
export default function Login() {

 const navigate = useNavigate()

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = e =>{
    setState(s =>({...s,[e.target.name]:e.target.value}))
 
  }

  const handleLogin = e =>{
    e.preventDefault()
    let {email, password} = state

    setIsProcessing(true)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)

    navigate("/dashboard")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    // ..
  }).finally(()=>{
    setIsProcessing(false)

  })

    setIsProcessing(true)
  }

  return (
    <div className='auth'>
       <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
             <div className="card p-2 p-md-3 p-lg-4">
               <div className="row">
                <div className="col">
                   <h3 className='mb-4'>Login</h3>
                </div>
               </div>
              <form onSubmit={handleLogin}>
              <div className="row mb-3">
                <div className="col">
                   <label htmlFor="email">Email</label>
                  <input type="email" className='form-control' placeholder='Enter Your Email'  name='email' onChange={handleChange}/>
                </div>
               </div>
               <div className="row mb-4">
                <div className="col">
                   <label htmlFor="password">Password</label>
                  <input type="password" className='form-control' placeholder='Enter Your Password'  name='password' onChange={handleChange}/>
                </div>
               </div>
               <div className="row mb-4">
                <div className="col">
                  <button className=' w-100' disabled={isProcessing}>
                    {!isProcessing
                    ? "Login":
                    <div className='spinner-grow spinner-grow-sm'></div>
                    }
                  </button>
                </div>
               </div>
              </form>
               <div className="row">
                <div className="col">
                  <p className="mb-0 text-center">Need an Account? <Link to='/authentication/register' className=''>Register</Link></p>
                </div>
               </div>
             </div>
          </div>
        </div>
       </div>
    </div>
  )
}
