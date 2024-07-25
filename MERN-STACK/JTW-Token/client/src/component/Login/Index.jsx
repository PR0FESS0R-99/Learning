import React, { useState } from 'react'
import './style.css'
import { LoginApi } from '../../api/api'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await LoginApi({username, password})
        if (response) {
            
        }
    }


    return (
        <form onClick={submitHandler}>

            <div class="container">
                <label htmlFor="username"><b>Username</b></label>
                <input type="text" value={username} onChange={ (event) => setUsername(event.target.value)} placeholder="Enter Username" name="username" required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" value={password} onChange={ (event) => setPassword(event.target.value)}  placeholder="Enter Password" name="password" required />

                <button type="submit">Login</button>
                <label>
                    <input type="checkbox" checked name="remember" /> Remember me
                </label>
            </div>

            <div class="container" style={{background: '#fff'}}>
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
    )
}

export default Login
