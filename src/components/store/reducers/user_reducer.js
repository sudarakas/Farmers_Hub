import { REGISTER_USER, LOGIN_USER, AUTO_SIGN_IN } from "../type";

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
        case AUTO_SIGN_IN:
            return {
                ...state, userData: {
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false
                }
            }
            break;
        default:
            return state
    }
}