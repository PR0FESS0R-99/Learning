import React, { useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { submitForm } from '../redux/form/formAction'

function form() {

    const [name, setname] = useState('')
    const [username, setusername] = useState('')

    const dispatch = useDispatch()

    return (
        <div className='form'>
            <form action='#'>
                <label for="fname">First Name</label>
                <input type="text" value={name} id="fname" name="name" placeholder="Your name.." onChange={(event) => setname(event.target.value)} />

                <label for="lname">Last Name</label>
                <input type="text" value={username} id="lname" name="username" placeholder="Your username name.." onChange={(event) => setusername(event.target.value)} />


                <button type="button" onClick={(event) => {
                    event.preventDefault()
                    dispatch(submitForm({name, username}))
                }} > Submit</button>
            </form>

        </div>
    )
}

export default form
