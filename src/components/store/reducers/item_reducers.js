import { GET_ITEMS, ADD_ITEMS, RESET_ITEM, GET_ITEM } from '../type'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state, list: action.payload
            }
            break;
        case ADD_ITEMS:
            return {
                ...state, newItem: action.payload
            }
            break;
        case GET_ITEM:
            return {
                ...state, list: action.payload
            }
            break;
        case RESET_ITEM:
            return {
                ...state, newItem: action.payload
            }
            break;
        default:
            return state;
    }
}