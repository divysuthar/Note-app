import React, { useEffect, useState } from 'react'
import Item from './Item'
import Addbutton from './Addbutton'

const Notepagelist = () => {

  const [notes, setnotes] = useState([])

  useEffect(() => {
    getnotes()
    console.log(notes)
  }, [])

  let getnotes = async () => {
    let response = await fetch('http://127.0.0.1:8000/view/')
    let data = await response.json()
    setnotes(data)
  }

  return (
    <>
      <div className='h-full'>
        <div className='border-black border-y'>
          {
            notes.map((note, index) => (
              <Item key={index} note={note} />
            ))
          }
        </div>
        <div>
          <Addbutton></Addbutton>
        </div>
      </div>
    </>
  )
}

export default Notepagelist