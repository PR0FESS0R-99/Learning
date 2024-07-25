import React from 'react'
import { useState } from 'react'

import { SaveCookies, GetCookies, RemoveCookies } from './hooks/cookies'

function App() {
    const [addCookie, setAddCookie] = useState(false)
    const [removeCookie, setRemoveCookie] = useState(false)
    const [getCookies, setGetCookies] = useState(false)




    const addCookieHandler = () => {
        if (!addCookie) {
            SaveCookies('user', JSON.stringify({
                _id: "123123123123",
                name: "muhammed",
            }));




            setAddCookie(true)
        }
    };

    const getCookiesHandler = () => {
        const coki = GetCookies('user');
        setGetCookies(coki);


        console.log(getCookies);
    }

    return (
        <div>
            Cookies

            <button onClick={addCookieHandler}>Add Cookies</button>
            <button onClick={getCookiesHandler}>get Cookies</button>
            <button onClick={() => {
                RemoveCookies('user');
                setAddCookie(false);
                setGetCookies(false);
            }}>delete Cookies</button>

            {
                getCookies && (
                    <div>
                        <h1>Cooki Result</h1>
                        {getCookies?.name}
                    </div>
                )
            }
        </div>
    )
}

export default App
