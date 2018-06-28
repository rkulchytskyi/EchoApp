import React, {Component, Fragment} from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Home from './components/Pages/Home/Home'
import Dashboard from './components/Pages/Dashboard/Dashboard'
import Portfolio from './components/Pages/Portfolio/Portfolio'
import Transaction from './components/Pages/Transaction/Transaction'
import CorporateView from './components/Pages/CorporateView/CorporateView'
import Faq from './components/Pages/Faq/Faq'
import Imprint from './components/Pages/Imprint/Imprint'
import InvestmentPlan from './components/Pages/InvestmentPlan/InvestmentPlan'
import PrivacyPolicy from './components/Pages/PrivacyPolicy/PrivacyPolicy'
import Fonds from './components/Pages/Fonds/Fonds'
import Career from './components/Pages/Career/Career'
import About from './components/Pages/About/About'
import Strategy from './components/Pages/Strategy/Strategy'
import Products from './components/Pages/Products/Products'
import Page404 from './components/Pages/Page404/Page404'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import CookieBanner from './components/Constructor/CookieBanner/CookieBanner';
import ScrollToTop from './components/WebActions/ScrollToTop/ScrollToTop'
import * as filesActions from './actions/filesActions';
import * as configActions from './actions/configActions';
import * as userActions from './actions/userActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import request from './httpConfig';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import Cookies from "universal-cookie";
import Settings from "./components/Pages/Settings/Settings";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {showCookieBanner: true};

        this.activateRegistration = this.activateRegistration.bind(this);

        request.interceptors.response.use(undefined, e => {
            // Do something with response error
            if (e.response && e.response.status === 401) {
                this.props.userActions.refreshToken(true);

            }
            // Trow errr again (may be need for some other catch)
            return Promise.reject(e);
        });
    }

    componentWillMount() {
        const {
            configActions,
            userToken
        } = this.props;

        if (userToken) {
            request.defaults.headers.common['Authorization'] = `JWT ${userToken}`;
        }

        configActions.setPassedCookieModal(false);
    }

    componentDidMount() {
        const {
            configActions,
        } = this.props;

        const url = window.location.href;
        const match = url.match(/activate/g);
        const matchResetPassword = url.match(/reset-password/g);
        const pos = url.indexOf("=");
        const token = url.substr(pos + 1);

        match && this.setState({
            token
        }, () => {
            configActions.toggleLoginPopup(true);
            this.activateRegistration();
        });

        // show login popup if we getting reset password token
        matchResetPassword && configActions.toggleLoginPopup(true);

        const cookies = new Cookies();
        if (!cookies.get('cookieBanner')) {
            configActions.toggleCookieBanner(true);
        }
    };

    activateRegistration() {
        const {filesActions} = this.props;
        const {token} = this.state;

        let data = {
            token
        };

        const dataJSON = JSON.stringify(data);

        filesActions.userActivate(dataJSON)
            .then(res => {
                console.log(res.message);
            })
            .catch(e => {
                console.error(e.message);
            });
    }

    render() {
        const {userToken, isCookieBannerShow} = this.props;
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={props => (
                userToken ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        );

        return (
            <Fragment>
                <Router>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path="/" component={CorporateView}/>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route exact path="/portfolio" component={Portfolio}/>
                            <Route exact path="/transaction" component={Transaction}/>
                            <Route exact path="/activate" component={CorporateView}/>
                            <Route exact path="/reset-password" component={CorporateView}/>
                            <PrivateRoute exact path="/investment-plan" component={InvestmentPlan}/>
                            <Route exact path="/faq" component={Faq}/>
                            <Route exact path="/retail" component={Home}/>
                            <Route exact path="/impressum" component={Imprint}/>
                            <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
                            <Route exact path="/fonds" component={Fonds}/>
                            <Route exact path="/career" component={Career}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/products" component={Products}/>
                            <Route exact path="/strategy" component={Strategy}/>
                            <Route exact path="/settings" component={Settings}/>
                            <Route exact path="/not-found" component={Page404}/>
                            <Route exact path="/dc-login" component={Login}/>
                            <Route exact path="/dc-register" component={Register}/>
                            <Route exact path="/dc-activate" component={Login}/>
                            <Route exact path="/dc-reset-password" component={Login}/>
                            <Redirect from='*' to='/not-found'/>
                        </Switch>
                        {isCookieBannerShow &&
                        <CookieBanner/>
                        }
                    </ScrollToTop>
                </Router>
            </Fragment>
        );
    }
}

App.propTypes = {
    isPassedCookieModal: PropTypes.bool.isRequired,
    isCookieBannerShow: PropTypes.bool.isRequired,
    isRetailInvestor: PropTypes.bool.isRequired,
    isInstitutionalInvestor: PropTypes.bool.isRequired,
    filesActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoginPopupOpen: state.config.isLoginPopupOpen,
        isCookieBannerShow: state.config.isCookieBannerShow,
        isPassedCookieModal: state.config.isPassedCookieModal,
        isRetailInvestor: state.config.isRetailInvestor,
        isInstitutionalInvestor: state.config.isInstitutionalInvestor,
        userToken: state.userSetting.userToken,
        isRefreshToken: state.userSetting.isRefreshToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        filesActions: bindActionCreators(filesActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);