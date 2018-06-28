import * as types from '../constants/actionTypes';

const toggleLoginPopup = payload => (
    {
        type: types.LOGIN_POPUP,
        payload
    }
);

const toggleCookieBanner = payload => (
    {
        type: types.COOKIE_BANNER,
        payload
    }
);

const toggleNavOverlay = payload => (
	{
		type: types.TOGGLE_NAV_OVERLAY,
		payload
	}
);

const setPassedCookieModal = payload => (
	{
		type: types.SET_PASSED_COOKIE_MODAL,
		payload
	}
);

const setRetailInvestor = payload => (
    {
        type: types.SET_RETAIL_INVESTOR,
        payload
    }
);

const setInstitutionalInvestor = payload => (
    {
        type: types.SET_INSTITUTIONAL_INVESTOR,
        payload
    }
);

// InvestmentPlan

const setInvestmentPlanProgressBar = payload => (
    {
        type: types.INVESTMENT_PLAN_PROGRESS_BAR,
        payload
    }
);

const collectInvestmentPlanData = payload => (
    {
        type: types.INVESTMENT_PLAN_DATA,
        payload
    }
);

export {
    toggleLoginPopup,
    toggleCookieBanner,
	toggleNavOverlay,
	setPassedCookieModal,
    setRetailInvestor,
    setInstitutionalInvestor,
    setInvestmentPlanProgressBar,
    collectInvestmentPlanData
}