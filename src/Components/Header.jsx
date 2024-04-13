import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className=''>
        <div className='font-bold text-yellow-900 text-[3vw] p-0 bg-slate-500 text-center'>Note</div>
        <Link to={'login'} ><div>Login</div> </Link>
        <Link to={'logout'}> <div>Logout</div> </Link>
      </div>
    </>
  )
}

export default Header