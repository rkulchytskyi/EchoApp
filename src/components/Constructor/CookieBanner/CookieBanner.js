import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import './CookieBanner.css';
import Cookies from "universal-cookie";
import {connect} from "react-redux";
import * as configActions from "../../../actions/configActions";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

class CookiesBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        this.root = document.createElement('div');
        document.body.appendChild(this.root);
    }

    componentWillUnmount(){
        document.body.removeChild(this.root);
    }

    closeModal(){
        const {configActions} = this.props;
        const cookies = new Cookies();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);

        cookies.set('cookieBanner', 'hidden', { path: '/', expires: expireDate });
        configActions && configActions.toggleCookieBanner(false);
    }

    render(){
        return ReactDOM.createPortal(
            <div className="cookie-banner">
                <div>
                    Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir
                    Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.
                    Weitere Informationen zu Cookies erhalten Sie unter <NavLink
                        to="/privacypolicy"
                    >
                        Datenschutz.
                    </NavLink>
                </div>
                <div className="close-cookie" onClick={this.closeModal}>
                    <i className="material-icons">&#xE14C;</i>
                </div>
            </div>,
            this.root
        )
    };
}

CookiesBanner.propTypes = {
    configActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(CookiesBanner);