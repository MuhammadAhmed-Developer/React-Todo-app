import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { doc, setDoc, serverTimestamp } from "firebase/firestore/lite"; 
import { firestore } from '../../../config/firebase';
import { async } from '@firebase/util';

const initialState = {
  title: '',
  description: '',
  location: '',
}


export default function Hero() {

  const { user } = useContext(AuthContext)

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsprocessing] = useState(false);

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    let { title, location, description } = state

    title = title.trim();
    location = location.trim();
    description = description.trim();

    if(title.length < 3) {
      return window.notify("Tittle should be at least 3 characters", 'error');
    }
    if(location.length < 3) {
      return window.notify("Please Enter Location", 'error');
    }
    if(description.length < 10) {
      return window.notify("Enter Description Correctly", 'error');
    }
    
    let formData = {title, location, description}
  
    formData.dateCreated = serverTimestamp();
    formData.id = window.getRandomId();
    formData.status = 'active';
    formData.createdBy = {
      email: user.email,
      uid : user.uid,
    };
    
    createDocument(formData);
  }
  
  const createDocument = async (formData) =>{
    setIsprocessing(true)
    try{
      await setDoc(doc(firestore, "todos", formData.id), formData);
      window.notify("Todo has been successfuly Added", "success")
    }catch(err){
      console.error(err)
      window.notify("Something went wrong. Todo isn't added", "error");
    }
    setIsprocessing(false);
  }
 


  return (
    <div className="py-5 home">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col text-center">
                    <h2 className='mb-4'>Add Todo</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='title' placeholder='Enter Title' onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='location' placeholder='Enter Location' onChange={handleChange} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea name="description" id="" className='form-control' placeholder='Enter Description' rows="4" onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">

                    <button className='btn btn-danger w-100' disabled={isProcessing}>
                      {!isProcessing
                        ? "Add Todo"
                        :
                        <div className='spinner-border spinner-border-sm'></div>
                      }
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}