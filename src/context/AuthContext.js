import { onAuthStateChanged } from 'firebase/auth'
import React, {useReducer, createContext, useEffect} from 'react'
import { auth } from '../config/firebase'

export const AuthContext = createContext()

const initialState = {isAuthenticated: false}

const reducer = ((state, action)=>{

switch(action.type){
    case  "LOGIN":
       return     {isAuthenticated: true}
    case "LOGOUT":
     return  {isAuthenticated: false}
    default :
    return state 
}


})



export default function AuthContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(user)
          console.log("User is signed in")
          dispatch({type:"LOGIN", payload: {user}})
          // ...
        } else {
          console.log("User is signed out")
          // ...
        }
      });
    },[])
     
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {props.children}
    </AuthContext.Provider>
  )
}
