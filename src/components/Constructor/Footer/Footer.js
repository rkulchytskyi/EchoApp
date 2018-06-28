import React, { Component } from 'react'
import './Footer.css'
import PropTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component'
import * as filesActions from '../../../actions/filesActions';
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Footer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        
        this.onChangeLink = this.onChangeLink.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.closeThankModel = this.closeThankModel.bind(this);
    }

    onChangeLink(event){
        event.preventDefault();
        const tagA = event.target.nodeName === "a" ? event.target : event.target.closest('a');
        const href = tagA && tagA.dataset.href;
        const element = document.getElementById(href);
        
        if (!element) {
            this.setState({redirectToLink: href})
        }
        scrollToComponent(element, { offset: -60, align: 'top', duration: 500, ease:'inCirc'});
        setTimeout(() => window.location.hash = href, 500);
    }
    
    sendFormData(event){
        event.preventDefault();
        
        const {filesActions} = this.props;
        
        const data = {
            email_address: this.state.email
        };
        
        const formJSON = JSON.stringify(data);
        
        filesActions.subscription(formJSON)
        .then(res => {
            this.setState({
                isSubscribed: res.message,
                isFailed: false,
                email: ''
            })
        })
        .catch(e => {
            this.setState({
                isFailed: e.message,
                isSubscribed: false
            });
        });
    }
    
    closeThankModel(){
        this.setState({
            isSubscribed: false
        })
    }
    
    handleChanges(type) {
        return e => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    render() {
        
        const { redirectToLink, isSubscribed, isFailed } = this.state;
        const { biggerPagging } = this.props;
        
        if (redirectToLink) return <Redirect to={`/impressum#${redirectToLink}`}/>;
        
        return (
            <div className={`footer ${biggerPagging && 'footer-top-fix'}`}>
                <div className="footer-container">
                    <div className="footer-menus">
                        <ul className="unordered-list w-list-unstyled">
                            <li>
                                <h4 className="footer-menu-title">Rechtliches</h4>
                            </li>
                            <li>
                                <a
                                    data-href='risikohinweis'
                                    href="#risikohinweis"
                                    className="footer-menu-link"
                                    onClick={this.onChangeLink}
                                >
                                    <span>Risikohinweise</span>
                                </a>
                                
                            </li>
                            <li>
                                <NavLink to="/privacypolicy" className="footer-menu-link">Datenschutz</NavLink>
                            </li>
                            <li>
                                <NavLink to="/impressum" className="footer-menu-link">Impressum</NavLink>
                            </li>
                            <li>
                                <h4 className="footer-menu-title">Schnellzugriff</h4>
                            </li>
                            <li>
                                <NavLink to="/retail" className="footer-menu-link">Managed Accounts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="footer-menu-link">Produkte</NavLink>
                            </li>
                            <li>
                                <NavLink to="/career" className="footer-menu-link">Karriere</NavLink>
                            </li>
                            
                        </ul>
                        <div>
                            <div className="footer-form w-form">
                                <form
                                    id="subscription"
                                    name="subscription"
                                    className="form w-clearfix"
                                    onSubmit={this.sendFormData}
                                >
                                    <label
                                        htmlFor="subscription-email"
                                        className="footer-menu-title">
                                        In Kontakt bleiben
                                    </label>
                                    <input
                                        type="email"
                                        className="input w-input"
                                        maxLength="256"
                                        name="subscription"
                                        placeholder="Ihre E-Mail-Adresse*"
                                        id="subscription-email"
                                        required
                                        value={this.state.email || ''}
                                        onChange={this.handleChanges('email')}
                                    />
                                    {isSubscribed &&
                                    <p className="subscription-response paragraph success-text">
                                        {this.state.isSubscribed}
                                    </p>
                                    }
                                    {isFailed &&
                                    <p className="subscription-response paragraph red-text">
                                        {this.state.isFailed}
                                    </p>
                                    }
                                    <input
                                        type="submit"
                                        value="Absenden "
                                        className="submit-button w-button white-submit"
                                    />
                                </form>
                                <form>
                                    <label htmlFor="email-3" className="footer-menu-title w-hidden-medium w-hidden-small w-hidden-tiny">Sprache</label>
                                    <div className="w-embed w-hidden-medium w-hidden-small w-hidden-tiny">
                                        <select className="dropdown input w-select" id="field-2" name="field-2">
                                            <option value="" >Deutsch | €</option>
                                            <option value="First" >Deutsch | €</option>
                                            <option value="Second" >Deutsch | €</option>
                                            <option value="Third" >Deutsch | €</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="footer-about">
                            <p className="paragraph-2">
                                Inhalte der Website stellen keine Anlageberatung oder Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten dar. Die RB Capital GmbH weist ausdrücklich darauf hin, dass der Handel mit Finanzinstrumenten nicht nur mit Chancen, sondern auch mit erheblichen Risiken verbunden ist.
                                <br /><br />
                                <strong>RB Capital GmbH</strong>
                                <br/>Bockenheimer Landstraße 2-4
                                <br/>60306 Frankfurt am Main
                                <br/>T_ <a className="raden__contact-phone" href="tel:+49 (0) 69 348 735 25">+49 (0) 69 348 735 25</a>
                                <br/>M_ service@radenbrock.com
                                <br/>
                                <br/>Copyright © RB Capital GmbH | Alle Rechte vorbehalten.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Footer.propTypes = {
    filesActions: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch) {
    return {
        filesActions: bindActionCreators(filesActions, dispatch),
        configActions: bindActionCreators(configActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Footer)
