import UserActionTypes from './user.types';

const initialState = {
    currentUser : null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case UserActionTypes.SIGN_OUT:
            return {
                ...state,
                currentUser: null
            }
        default:
            return state;
    }
}

export default userReducer;