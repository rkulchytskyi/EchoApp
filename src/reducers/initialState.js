export default {
	config: {
		isLoginPopupOpen: false,
		isCookieBannerShow: true,
		isNavOverlayOpen: false,
		isPassedCookieModal: false,
		isRetailInvestor: false,
		isInstitutionalInvestor: false,
        // Investment Plan Steps
        investmentPlanProgressBar: 25,
        investmentPlanData: {
		    currentStep: 'questionnaire_1',
			userBeContactedAndCanProcess: false
        }
	},
	userSetting: {
		userToken: '',
		isRefreshToken: false
	},
	dashboardSetting: {
		showDaysArea: true,
		showMonthsArea: false,
		showYearsArea: false
	}
}