import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Notepagelist from './Components/Notepagelist'
import Note from './Components/Note'
import Login from './Components/Login'
import Logout from './Components/Logout'

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Notepagelist/>}/>
            <Route path='/:id' element = {<Note/>} />
            <Route path='/login' element = {<Login></Login>} />
            <Route path='/logout' element = {<Logout/>} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={routes}/>
    </React.StrictMode>,
)
