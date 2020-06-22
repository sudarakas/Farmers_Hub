import { REGISTER_USER, LOGIN_USER, AUTO_SIGN_IN, GET_USER_ITEMS } from "../type";
import axios from "axios";
import { SIGNUP_URL, SIGNIN_URL, REFRESH_TOKEN_URL, FIREBASE_URL } from '../../util/misc';

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

export function autoSignIn(refToken) {
    const request = axios({
        method: "POST",
        url: REFRESH_TOKEN_URL,
        data: `grant_type=refresh_token&refresh_token=` + refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        return false
    })

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}

export function getUserItems(UID) {
    const request = axios(`${FIREBASE_URL}/items.json?orderBy=\"uid\"&equalTo=\"${UID}\"`)
        .then(response => {

            let items = [];

            for (let key in response.data) {
                items.push({
                    ...response.data[key],
                    id: key
                })
            }

            return items;
        })

    return {
        type: GET_USER_ITEMS,
        payload: request
    }
}

