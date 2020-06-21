import { GET_ITEMS, ADD_ITEMS, RESET_ITEM, GET_ITEM } from '../type'

import axios from "axios";
import { FIREBASE_URL } from "../../util/misc";

//retrive item from the database
export function getItems(category) {

    let URL = `${FIREBASE_URL}/items.json`;

    //for custom category, update the URL   
    if (category !== 'All') {
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }

    const request = axios(URL)
        .then(response => {
            const items = [];

            for (let key in response.data) {
                items.push({
                    ...response.data[key],
                    id: key
                })
            }

            return items;
        })

    return {
        type: GET_ITEMS,
        payload: request
    }
}

export function uploadPostToCloud(data, token) {

    const request = axios({
        method: 'POST',
        url: `${FIREBASE_URL}/items.json?auth=${token}`,
        data
    }).then(response => {
        return response.data
    })

    return {
        type: ADD_ITEMS,
        payload: request
    }
}

export function getItem(itemID) {
    const request = axios(`${FIREBASE_URL}/items/${itemID}.json`)
        .then(response => {
            let item = { ...response.data, id: itemID }
            return item;
        })

    return {
        type: GET_ITEM,
        payload: request
    }
}

export function clearItemReducers(){
    return{
        type: RESET_ITEM,
        payload: ""
    }
}