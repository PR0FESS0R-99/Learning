import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementBy5 } from '../redux/counter/counterAction'

function Counter() {

    const count = useSelector((state) => {
        return state.counter.count
    })

    const count2 = useSelector((state) => {
        return state.counter.count2
    })



    const dispatch = useDispatch()

    return (
        <div>
            Count <p>{count}</p> <button
            onClick={ () => {
                dispatch(increment())
            }}
            >Increment</button>
            <button onClick={ () => {
                dispatch(decrement())
            }}>decrement</button>


            <p>count2  : {count2}</p>
            <button onClick={() => {
                dispatch(incrementBy5(10))
            }}>
                add by 5
            </button>



            
        </div>
    )
}

export default Counter
