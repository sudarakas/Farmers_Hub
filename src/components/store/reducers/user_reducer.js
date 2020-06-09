import { REGISTER_USER, LOGIN_USER } from "../type";

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state, userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
            break;
        case LOGIN_USER:
            return {
                ...state, userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
            break;
        default:
            return state
    }
}