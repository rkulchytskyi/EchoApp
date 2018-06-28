import initialState from './initialState';
import {
    DAYS_AREA,
    MONTHS_AREA,
    YEARS_AREA
} from '../constants/actionTypes';

export default function (state = initialState.dashboardSetting, action) {
    switch (action.type){
        case DAYS_AREA:
            return {...state, showDaysArea: action.payload};
        case MONTHS_AREA:
            return {...state, showMonthsArea: action.payload};
        case YEARS_AREA:
            return {...state, showYearsArea: action.payload};

        default:
            return state;
    }
}