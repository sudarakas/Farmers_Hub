import { Dimensions } from "react-native";

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