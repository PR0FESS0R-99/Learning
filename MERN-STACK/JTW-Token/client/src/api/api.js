import axios from "axios";

const AxiosClient = axios.create({
    baseURL: 'http://localhost:3000'
});

export const LoginApi = async (value) => {
    const { data } = await AxiosClient.post('http://localhost:3000/login', value)
    return data
}

export const RegisterApi = async (value) => {
    const { data } = await AxiosClient.post('/register', value)
    return
}