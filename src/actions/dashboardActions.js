import * as types from '../constants/actionTypes';

const setDaysArea = payload => (
    {
        type: types.DAYS_AREA,
        payload
    }
);

const setMonthsArea = payload => (
    {
        type: types.MONTHS_AREA,
        payload
    }
);

const setYearsArea = payload => (
    {
        type: types.YEARS_AREA,
        payload
    }
);

export {
    setDaysArea,
    setMonthsArea,
    setYearsArea
}