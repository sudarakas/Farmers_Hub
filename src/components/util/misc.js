import { Dimensions, Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
// import { name as appName } from './app.json';

//get the current orientation of the screen
export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape"
}

//get the every device dimension changes using eventListener
export const setOrientationListener = (callback) => {
    return Dimensions.addEventListener("change", callback)
}

//remove the eventLister after the component removed from the screen
export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

//get the platform of the device
export const getPlatform = () => {
    if (Platform.OS == 'ios') {
        return "iso"
    } else {
        return "android"
    }
}

//firebase authentication
export const APIKEY = `AIzaSyA89OZJuk8YYHt1Y26bgNrMRhapKnRnEu4`
export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
export const REFRESH_TOKEN_URL = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

//firebase database
export const FIREBASE_URL = `https://farmershub-d1133.firebaseio.com`;

//store the tokens inside the device
export const storeTokens = (values, callback) => {
    //current date and time
    const currentTime = new Date();
    //add 1hr to the current time
    const expireDuration = currentTime.getTime() + (3600 * 1000);

    //store the tokens inside the device storage
    AsyncStorage.multiSet([
        [`@FarmersHub@token`, values.token],
        [`@FarmersHub@refreshToken`, values.refToken],
        [`@FarmersHub@expireToken`, expireDuration.toString()],
        [`@FarmersHub@uid`, values.uid],
    ]).then(response => {
        callback();
    })
}

export const getTokens = (callback) => {
    AsyncStorage.multiGet([
        `@FarmersHub@token`,
        `@FarmersHub@refreshToken`,
        `@FarmersHub@expireToken`,
        `@FarmersHub@uid`,
    ]).then((value) => {
        callback(value)
    })
}

export const generateGridPanel = (list) => {

    /*
        create the front grid
        row 01:
            post 01 | post 02
        row 02:            
            post 03 | post 04
    */

    //to store the items
    let newItems = [];
    let items = list;

    //to track the posts in a row
    let count = 1;
    //for the single row
    let grid = {}

    //get the array count
    let listCount = items.length;

    if (items) {
        items.forEach((element,index)  => {
            if (count == 1) {
                //store block01
                grid['block01'] = element;
                count++;

                // if the array count is odd we need to
                // assign it as a single row 
                if(index == (listCount-1)){
                    newItems.push(grid);
                }

            } else {
                //store block02
                grid['block02'] = element;
                //add the row into main grid
                newItems.push(grid);

                //reset the parameters for the next row
                count = 1;
                grid = {};
            }
        });
    }

    return newItems;
}
