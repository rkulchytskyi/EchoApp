import * as types from '../constants/actionTypes';

const setUserToken = payload => (
    {
        type: types.USER_TOKEN,
        payload
    }
);

const refreshToken = payload => (
    {
        type: types.REFRESH_TOKEN,
        payload
    }
);

export {
    setUserToken,
    refreshToken
}