import { SUBMIT } from "./formTypes"

export const submitForm = ({ name, username }) => {
    return {
        type: SUBMIT,
        payload: { name, username }
    }
}