import { GET_ITEMS, ADD_ITEMS } from '../type'

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
        default:
            return state;
    }
}