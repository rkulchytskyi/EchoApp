import request from '../httpConfig';

const sendContactFormData = data => (
    async dispatch => {
	    try {
		    const res = await request.post('/contact', data);
		    return res.data;
	    } catch(e) { throw e.response && e.response.data }
    }
);

const contactMeOnAdviserManager = data => (
    async dispatch => {
        try {
            const res = await request.post('/contact/customer', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const subscription = data => (
    async dispatch => {
        try {
            const res = await request.post('/contact/newsletter', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const userRegister = data => (
    async dispatch => {
        try {
            const res = await request.post('/accounts', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const userActivate = data => (
    async dispatch => {
        try {
            const res = await request.patch('/accounts', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const userLogin = data => (
    async dispatch => {
        try {
            const res = await request.post('/accounts/login', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const resetPassword = data => (
    async dispatch => {
        try {
            const res = await request.post('/accounts/reset-password', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const resetPasswordActivate = data => (
    async dispatch => {
        try {
            const res = await request.put('/accounts/reset-password', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

// Investment Plan
const adviserManagers = () => (
    async dispatch => {
        try {
            const res = await request.get('/investment-plan/step-1');
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pushAdviserManager = data => (
    async dispatch => {
        try {
            const res = await request.post('/investment-plan/step-1', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pullCustomerData = () => (
    async dispatch => {
        try {
            const res = await request.get('/investment-plan/step-5');
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pushCustomerData = data => (
    async dispatch => {
        try {
            const res = await request.post('/investment-plan/step-5', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const getQuestionnaireData = id => (
    async dispatch => {
        try {
            const res = await request.get(`/investment-plan/step-${id}`);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const postQuestionnaireData = (data, id) => (
    async dispatch => {
        try {
            const res = await request.post(`/investment-plan/step-${id}`, data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pullCustomerDataS6 = () => (
    async dispatch => {
        try {
            const res = await request.get('/investment-plan/step-6');
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pushCustomerDataS6 = data => (
    async dispatch => {
        try {
            const res = await request.post('/investment-plan/step-6', data);
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);

const pullCustomerDataS7 = () => (
    async dispatch => {
        try {
            const res = await request.get('/investment-plan/step-7');
            return res.data;
        } catch(e) { throw e.response && e.response.data }
    }
);



export {
    sendContactFormData,
    contactMeOnAdviserManager,
    subscription,
    userRegister,
    userActivate,
    userLogin,
    resetPassword,
    resetPasswordActivate,
    adviserManagers,
    pushAdviserManager,
    pullCustomerData,
    pushCustomerData,
    getQuestionnaireData,
    postQuestionnaireData,
    pullCustomerDataS6,
    pushCustomerDataS6,
    pullCustomerDataS7
}