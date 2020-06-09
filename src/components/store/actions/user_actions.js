import { REGISTER_USER, LOGIN_USER } from "../type";
import axios from "axios";
import { SIGNUP_URL, SIGNIN_URL } from '../../util/misc';

export function signUp(data) {

    //use axios to send a post request
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
        //console.log(response.data)
        return response.data
    }).catch(e => {
        return false
    })

    return {
        //for the reducers
        type: REGISTER_USER,
        payload: request
    }
}

export function signIn(data) {
    const request = axios({
        method: "POST",
        url: SIGNIN_URL,
        data: {
            email: data.email,
            password: data.email,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    })

    return {
        type: LOGIN_USER,
        payload: request
    }
}