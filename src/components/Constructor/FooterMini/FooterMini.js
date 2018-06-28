import React, {Component} from 'react';
import './FooterMini.css';
import {Redirect, NavLink } from 'react-router-dom'
import * as configActions from '../../../actions/configActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class FooterMini extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onChangeLink = this.onChangeLink.bind(this);
    }

    onChangeLink(event){
        event.preventDefault();
        const tagA = event.target.nodeName === "a" ? event.target : event.target.closest('a');
        const href = tagA && tagA.dataset.href;
        const element = document.getElementById(href);

        if (!element) {
            this.setState({redirectToLink: href})
        }
    }

    render() {
        const { redirectToLink } = this.state;
        if (redirectToLink) return <Redirect to={`/impressum#${redirectToLink}`}/>;

        return (
            <div className="footer-mini">
                <ul className="footer-mini__nav">
                    <li>
                        <NavLink to="/impressum">IMPRESSUM <span>| </span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/privacypolicy" >DATENSCHUTZ <span>| </span></NavLink>
                    </li>
                    <li>
                        <a
                            data-href='risikohinweis'
                            href="#risikohinweis"
                            onClick={this.onChangeLink}
                        >
                            RISIKOHINWEIS
                        </a>
                    </li>
                </ul>
                <div className="footer-mini__logo">
                    <NavLink
                        to="/"
                    >
                        <img src="img/Wortmarke_Powered.svg" alt=""/>
                    </NavLink>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(FooterMini)

