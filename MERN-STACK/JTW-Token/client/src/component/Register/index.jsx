import React, { useState } from 'react'
import './style.css'
import { RegisterApi } from '../../api/api'


function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await RegisterApi({username, password})
        if (response.text) {
            console.log(response.text)
        }
    }

    return (
        <form onClick={submitHandler}>
            <div class="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" value={username} onChange={(event) => setUsername(event.target.value)} id="email" required />

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} name="psw" id="psw" required />

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
                <hr />

                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                <button type="submit" class="registerbtn">Register</button>
            </div>

            <div class="container signin">
                <p>Already have an account? <a href="#">Sign in</a>.</p>
            </div>
        </form>
    )
}

export default Register
