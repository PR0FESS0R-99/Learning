import React from 'react'
import Counter from './components/Counter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewNumberCard from './components/ViewCounter'
import UserForm from './components/Form'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <>
                        <Counter />
                        <UserForm />
                    </>
                }  />

                <Route
                    path="/counter"
                    element={ <ViewNumberCard/> }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
