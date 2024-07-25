import React from 'react'
import { useSelector } from 'react-redux'

function showForm() {
    const { name, username } = useSelector((state) => state.form)

    return (
        <div>
            <br /><br /><br />
            name: {name}
            <br /><br />
            username: {username}
        </div>
    )
}

export default showForm
