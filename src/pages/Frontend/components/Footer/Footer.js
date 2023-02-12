import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()


  return (
    <footer>
        <div className="container-fluid bg-dark">
            <div className="row">
                <div className="col p-2 text-center text-white">
                   <p className="mb-0">&copy; {year} All Right Reserved By Muhammad Ahmed</p>
                </div>
            </div>
        </div>
    </footer>
  )
}
