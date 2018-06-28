import initialState from './initialState';
import {
    LOGIN_POPUP,
    COOKIE_BANNER,
	TOGGLE_NAV_OVERLAY,
	SET_PASSED_COOKIE_MODAL,
    SET_RETAIL_INVESTOR,
    SET_INSTITUTIONAL_INVESTOR,
  
    INVESTMENT_PLAN_PROGRESS_BAR,
    INVESTMENT_PLAN_DATA,
} from '../constants/actionTypes';

export default function (state = initialState.config, action) {
	switch (action.type){
        case LOGIN_POPUP:
            return {...state, isLoginPopupOpen: action.payload};
        case COOKIE_BANNER:
            return {...state, isCookieBannerShow: action.payload};
		case TOGGLE_NAV_OVERLAY:
			return {...state, isNavOverlayOpen: action.payload};
		case SET_PASSED_COOKIE_MODAL:
			return {...state, isPassedCookieModal: action.payload};
        case SET_RETAIL_INVESTOR:
            return {...state, isRetailInvestor: action.payload};
        case SET_INSTITUTIONAL_INVESTOR:
            return {...state, isInstitutionalInvestor: action.payload};
        // Investment Plan Steps
        case INVESTMENT_PLAN_PROGRESS_BAR:
            return {...state, investmentPlanProgressBar: action.payload};
        case INVESTMENT_PLAN_DATA:
            return {
                ...state,
                investmentPlanData:{
                    ...state.investmentPlanData,
                    ...action.payload
                }
            };
            
		default:
			return state;
	}
}