import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const Note = () => {
    let { id } = useParams()

    let [note, setnote] = useState(null)

    useEffect(() => {
        change()
    }, [id])

    let change = async () => {
        let response = await fetch(`http://127.0.0.1:8000/get/${id}`)
        let data = await response.json()
        setnote(data)
        console.log(note)
    }

    let handle = async () => {
        if (id === 'new' && note !== null) {
            createNote()
        } else if (id !== 'new' && !note.body) {
            deleteNote()
        } else if (id !== 'new' && note !== null) {
            updateNote()
        }
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:8000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date().toLocaleDateString() })
        })
    }

    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    // http://127.0.0.1:8000/create/
    let createNote = async () => {
        await fetch(`http://127.0.0.1:8000/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date().toLocaleDateString(), 'created' : new Date().toLocaleDateString() })
        })
    }

    return (
        <>
            <div className='w-[100vw] h-[90vh]'>
                <div className='flex justify-around'>
                    <h3>
                        <Link to="/"> <FaArrowLeft onClick={handle} /> </Link>
                    </h3>
                    {id !== 'new' ? (<Link to={'/'}><button onClick={deleteNote}>DELETE</button></Link>) : (<Link to={'/'}> <button onClick={createNote}>DONE</button> </Link>)}
                </div>
                <textarea className='w-full h-full' onChange={(e) => { setnote({ ...note, 'body': e.target.value }) }} value={note?.body}>
                </textarea>
            </div>
        </>
    )
}

export default Note