import initialState from './initialState';
import {
    USER_TOKEN,
    REFRESH_TOKEN
} from '../constants/actionTypes';

export default function (state = initialState.userSetting, action) {
    switch (action.type){
        case USER_TOKEN:
            return {...state, userToken: action.payload};
        case REFRESH_TOKEN:
            return {...state, isRefreshToken: action.payload};
        
        default:
            return state;
    }
}