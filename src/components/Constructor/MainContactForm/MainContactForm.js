import React, { Component } from 'react';
import './MainContactForm.css';
import PropTypes from 'prop-types'
import * as filesActions from '../../../actions/filesActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import localization from 'moment/locale/de'
import 'react-datepicker/dist/react-datepicker.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MainContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
	        feedbackToggle: false,
            successFormSend: false,
            isFormVisible: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.localeGermany = this.localeGermany.bind(this);
        this.onFeedbackToggle = this.onFeedbackToggle.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.closeThankModel = this.closeThankModel.bind(this);
    }
    
    componentDidMount() {
        this.localeGermany();
    }
    
    localeGermany(){
        moment().locale("de", localization).format('LLL')
    }

    // Enable/disable fields in contact form
	onFeedbackToggle(feedbackToggle) {
	    return e => {
	        e.preventDefault();
	        this.setState({feedbackToggle})
        }
    }
    
    handleChanges(type) {
        return e => {
            this.setState({
                [type]: e.target.value
            })
        }
    }
    
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    
    sendFormData(event){
        event.preventDefault();
        
        const {filesActions} = this.props;
        const {feedbackToggle} = this.state;
        
        let data = {
            email_address: this.state.email,
            name: this.state.name,
            message: this.state.message,
            company: this.state.company
        };
        
        if(feedbackToggle){
            data.phone_number = this.state.phone;
            data.datetime = this.state.startDate ? this.state.startDate.format('LLL') : '';
        }
        
        const formJSON = JSON.stringify(data);
        
        filesActions.sendContactFormData(formJSON)
            .then(res => {
                this.setState({
                    successFormSend: res.message,
                    failedFormSend: false,
                    isFormVisible: false,
                    email: '',
                    name: '',
                    message: '',
                    company: '',
                    phone: '',
                    startDate: ''
                })
            })
            .catch(e => {
                this.setState({
                    successFormSend: false,
                    failedFormSend: e.message,
                    isFormVisible: false
                });
            });
    }
    
    closeThankModel(){
        this.setState({
            isFormVisible: true,
            failedFormSend: false,
            successFormSend: false
        })
    }

    render() {

        const {feedbackToggle, isFormVisible, successFormSend, failedFormSend} = this.state;
        
        return (
            <div className={`contact-form-main ${this.props.align}`}>
                <div className="contact-container">
                    <div className="contact-texts"><img src="img/Heading%20Line.svg" alt=""/>
                        <h3 className="secondary-title head-line-small white-text">Kontakt</h3>
                        <p className="paragraph white-text">Für Fragen stehen wir jederzeit zur Verfügung. Sie können sich während unserer Telefonzeiten gerne persönlich bei uns melden, uns eine E-Mail schreiben oder sich über das Kontaktformular bei uns melden.
                            <br/>Wir freuen uns von Ihnen zu hören!
                            <br/>
                            <br/><span className="span-contact">RB Capital GmbH </span>
                            <br/><span className="span-contact-small">(Radenbrock)<br/></span>
                            <br/>T_ <a className="raden__contact-phone" href="tel:+49 (0) 69 348 735 25">+49 (0) 69 348 735 25</a>
                            <br/>M_ service@radenbrock.com
                            <br/>
                            <br/>Montag-Freitag: 09:00-19:00 Uhr</p>
                    </div>
                    <div className="contact-form-block w-form">
                        {isFormVisible &&
                        <form
                            id="email-form"
                            name="email-form"
                            className="w-clearfix"
                            onSubmit={this.sendFormData}
                        >
                            <label htmlFor="name" className="field-label">Felder mit einem * müssen ausgefüllt werden</label>
                            <input
                                type="text"
                                className="input w-input"
                                maxLength="256"
                                name="name"
                                placeholder="Ihr Name*"
                                id="name"
                                required
                                value={this.state.name || ''}
                                onChange={this.handleChanges('name')}
                            />
                            <input
                                type="email"
                                className="input w-input"
                                maxLength="256"
                                name="email"
                                placeholder="Ihre E-Mail-Adresse*"
                                id="email"
                                required
                                value={this.state.email || ''}
                                onChange={this.handleChanges('email')}
                            />
                            <input
                                type="text"
                                className="input w-input"
                                maxLength="256"
                                name="company"
                                placeholder="Firma"
                                id="company"
                                value={this.state.company || ''}
                                onChange={this.handleChanges('company')}
                            />
                            <div className="yes-or-no-flexbox">
                                <label htmlFor="name" className="text-label">Möchten Sie zurückgerufen werden?</label>
                                <a href="/" className={`${feedbackToggle ? 'active' : ''} true-button w-button`} onClick={this.onFeedbackToggle(true)}>ja</a>
                                <a href="/" className={`${feedbackToggle ? '' : 'active'} false-button w-button`} onClick={this.onFeedbackToggle(false)}>Nein</a>
                            </div>
                            <div className="w-embed">
                                <input
                                    className="input w-input feedback-field"
                                    maxLength="256"
                                    name="feedback-field-1"
                                    placeholder="Ihre Telefonnummer*"
                                    type="text"
                                    value={this.state.phone || ''}
                                    onChange={this.handleChanges('phone')}
                                    disabled={!feedbackToggle}
                                />
                            </div>
                            
                            <div className="w-embed">
                                <DatePicker
                                    selected={(feedbackToggle && this.state.startDate) || null}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    locale="de"
                                    disabled={!feedbackToggle && true}
                                    placeholderText="Verfügbare Zeit"
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="LLL"
                                    shouldCloseOnSelect={false}
                                    timeCaption="Zeit"
                                />
                            </div>
                            
                            <textarea
                                id="field"
                                name="field"
                                placeholder="Ihre Nachricht*"
                                maxLength="5000"
                                required
                                className="input text-area w-input"
                                value={this.state.message || ''}
                                onChange={this.handleChanges('message')}
                            >
                                
                            </textarea>
                            <button
                                type="submit"
                                className="submit-button btn-arrow-small w-button"
                            >
                                Absenden
                            </button>
                        </form>
                        }
                        {successFormSend &&
                            <div className="success-message w-form-done">
                                <div
                                    className="close thick"
                                    onClick={this.closeThankModel}
                                >
                                </div>
                                <div className="success-message__content">
                                    <h3>Vielen Dank!</h3>
                                    <p className="paragraph white-text">{this.state.successFormSend}</p>
                                </div>
                            </div>
                        }
                        {failedFormSend &&
                            <div className="success-message w-form-done">
                                <div
                                    className="close thick"
                                    onClick={this.closeThankModel}
                                >
                                </div>
                                <div className="success-message__content">
                                    <p className="paragraph white-text">
                                        {this.state.failedFormSend}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

MainContactForm.propTypes = {
    filesActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        filesActions: bindActionCreators(filesActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MainContactForm)

