import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <>
            <div className='m-5 border-b-[3px] border-black'>
                <Link to={`http://localhost:5173/${props.note.id}`}>
                    <div className='bg-white'>
                        {/* <h1> {props.note.id} </h1> */}
                        <h3> {props.note.body} </h3>
                        <h4> {props.note.updated} </h4>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Item