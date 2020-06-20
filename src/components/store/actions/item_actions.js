import { GET_ITEMS } from '../type'

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

export function uploadPostToCloud() {
    console.log('uploaded')
    const status = 'success'
    return status
}