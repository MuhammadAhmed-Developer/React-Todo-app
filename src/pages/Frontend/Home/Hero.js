import React, {useState} from 'react';

const initialState  = {
  title:'',
  description:'',
  location:'',
}


export default function Hero() {

 const [state, setState] = useState(initialState);
const [isProcessing, setIsprocessing] = useState(false)

 const handleChange = e =>{
  setState(s=>({...s, [e.target.name]: e.target.value}))
 }

  const handleSubmit = e =>{
    e.preventDefault()
    setIsprocessing(true)
    console.log(state)


    setIsprocessing(false)
  }



  return (
    <div className="py-5 home">
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <div className="card p-3 p-md-4 p-lg-5">
                       <form onSubmit= {handleSubmit} >
                          <div className="row">
                            <div className="col text-center">
                            <h2 className='mb-4'>Add Todo</h2>
                            </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-6 mb-3">
                                <input type="text" className='form-control'  name='title' placeholder='Enter Title' onChange={handleChange}/>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <input type="text" className='form-control'  name='location' placeholder='Enter Location' onChange={handleChange}/>
                              </div>
                          </div>
                              <div className="row mb-4">
                               <div className="col">
                                <textarea name="description" id="" className='form-control'  placeholder='Enter Description' rows="4" onChange={handleChange}></textarea>
                              </div>
                            </div>
                             <div className="row">
                              <div className="col">
                                
                                 <button className='btn btn-danger w-100' disabled={isProcessing}>
                                  {!isProcessing
                                  ?"Add Todo"
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