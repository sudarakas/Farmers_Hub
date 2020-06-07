import { Dimensions, Platform } from "react-native";

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