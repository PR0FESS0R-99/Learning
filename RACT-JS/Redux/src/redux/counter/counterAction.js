import { DECREMENT, INCREMENT, INCREMENTBY5 } from "./counterType"

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

export const incrementBy5 = (payload) => {
    return {
        type: INCREMENTBY5,
        payload: payload
    }
}