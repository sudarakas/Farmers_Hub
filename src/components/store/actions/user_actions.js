import { REGISTER_USER } from "../type";
import axios from "axios";
import { SIGNUP_URL } from '../../util/misc';

export function signUp(data) {
    const request = axios({
        method: "POST",
        url: SIGNUP_URL,
        data: {
            email: data.email,
            password: data.email,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    });

    return {
        type: REGISTER_USER,
        payload: false
    }
}