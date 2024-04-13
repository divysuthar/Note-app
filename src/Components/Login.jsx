import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setpassword] = useState('')
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const navigate = useNavigate();

    let display = () => {
        alert('Your\'ve entered wrong details')
        navigate('/login')
    }

    let handle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password,
                email: email
            })
            console.log(response.data)
            { response.data.message === 'Login successful' ? navigate('/') : display() }
        } catch (error) {
            display()
            console.log(error)
        }
    }

    return (
        <div>
            <form method='POST' onSubmit={handle}>
                <input type="text"
                    value={username}
                    placeholder='Enter your username'
                    onChange={(e) => {
                        setusername(e.target.value)
                    }}
                />
                <input type="password"
                    value={password}
                    placeholder='Enter your password'
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                />
                <input type="email"
                    value={email}
                    placeholder='Enter your email'
                    onChange={(e) => {
                        setemail(e.target.value)
                    }}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Login