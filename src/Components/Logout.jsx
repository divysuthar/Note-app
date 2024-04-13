import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    // let logout = async () => {
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/logout/')
    //         {response.data.message === 'Logout successful' ? navigate('/') : navigate('logout')}
    //         console.log(response.data.message)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }    

    const logout = async () => {
        console.log("hello")
        try {
            const response = await axios.post('http://127.0.0.1:8000/logout/');
            if (response.data.message === 'Logout successful') {
                navigate('/login');
            } else {+
                console.log('Logout failed');
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <p>Are you sure you want to Logout</p>
            <button onClick={logout} >Logout</button>
        </div>
    )
}

export default Logout