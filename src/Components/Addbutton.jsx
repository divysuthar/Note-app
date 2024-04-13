import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";

const Addbutton = () => {
  return (
    <Link to={'/new'}>
        <FaPlus />
    </Link>
  )
}

export default Addbutton