import React, { Component } from 'react'
import './DashboardMenu.css'
import { NavLink, Redirect } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component'
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import request from "../../../httpConfig";
import * as userActions from "../../../actions/userActions";

class DashboardMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.toggleMenu = this.toggleMenu.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), { offset: 0, align: 'middle', duration: 500, ease:'inCirc'});
        window.addEventListener('resize', this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

    toggleMenu(){
        const {configActions, isNavOverlayOpen} = this.props;
        configActions.toggleNavOverlay(!isNavOverlayOpen);
    }

    logout(e){
        e.preventDefault();
        const {userActions, isNavOverlayOpen, configActions} = this.props;

        this.setState({
            isLogout: true
        }, () => {
            delete request.defaults.headers.common['Authorization'];
            delete request.defaults.headers['Authorization'];
            userActions.setUserToken('');
            isNavOverlayOpen && configActions.toggleNavOverlay(!isNavOverlayOpen);
        });
    };

    render() {
        const {
            isNavOverlayOpen
        } = this.props;

        let {windowWidth, isLogout} = this.state;

        windowWidth = windowWidth || window.innerWidth;

        const isMobile = windowWidth < 768;

        if(isLogout) return <Redirect to="/" />;

        return (
            <div id="main-menu" className={`main-menu`}>
                <div className={`fixed-nav w-nav`}>
                    {!isMobile &&
                    <div className="last-button w-inline-block" onClick={this.logout}>
                        <div className="w-hidden-small w-hidden-tiny">AUSLOGGEN</div>
                        <div className="last-button-line w-hidden-small w-hidden-tiny"/>
                        <img alt="" src="https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/59944aa60ffdc50001cc3834_Investieren_Button.svg" className="w-hidden-main w-hidden-medium"/>
                    </div>
                    }
                    <nav className={`nav-menu w-nav-menu ${isNavOverlayOpen ? 'slide-down' : 'slide-up'}`}>
                        <div className="nav-menu__content">
                            <a href="/" className="invest-menu w-hidden-main w-inline-block" onClick={this.logout}>
                                <div>AUSLOGGEN</div>
                                <div className="invest-underline"/>
                            </a>
                            <NavLink to="/dashboard" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>DASHBOARD</span></NavLink>
                            <NavLink to="/portfolio" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>Portfolio</span></NavLink>
                            <NavLink to="/transaction" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>TRANSAKTIONEN</span></NavLink>
                            <NavLink to="/settings" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>EINSTELLUNGEN</span></NavLink>
                        </div>
                    </nav>
                    <div className="container w-container">
                        {isMobile &&
                        <NavLink to="/" className="logo-mobile">
                            <img alt="" src="img/Radenbrock_Wortmarke.svg"/>
                        </NavLink>
                        }
                        <div onClick={this.toggleMenu} className={`${isNavOverlayOpen ? 'active' : ''} menu-button w-nav-button`}>
                            <div className="nav-top-line"/>
                            <div className="nav-middle-line" />
                            <div className="nav-bottom-line" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu)
