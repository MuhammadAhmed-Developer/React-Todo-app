import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'


export default function Topbar() {

  const [currentTime , setCurrentTime] = useState("")

 useEffect(()=>{
     setInterval(()=>{
     setCurrentTime( dayjs().format('dddd, MMMM D - YYYY, HH:mm:ss A'))
     })
 }, [])

  return (
    
      <div className="container-fluid bg-primary">
        <div className="row">
          <div className="col text-center text-white py-1">
            <p className="mb-0">{currentTime}</p>
          </div>
        </div>
      </div>
    
  )
}
