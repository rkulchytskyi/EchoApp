import React, {Component} from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { Popover, Button, Spin, Icon } from 'antd';
import { Redirect } from 'react-router-dom'
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../actions/filesActions';
import * as configActions from '../../actions/configActions';
import * as userActions from '../../actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import request from "../../httpConfig";
import modalStyles from './modalStyles'

class LoginModal extends Component {
    constructor(props){
        super(props);
        
	    this.state = {
		    signupToggle: true,
            forgotPassword: false,
            passwordStatus: false,
            passwordConfirmStatus: false,
            errorConfirmPassword: false,
            errorPassword: false,
            isInfoBox: true,
            passwordConfirmValidIcon: false,
            passwordValidIcon: false,
            forgotPassMessage: false,
            writeYourEmail: true,
            resetPassword: false,
            redirectToInvestmentPlan: false
	    };
	    this.onSignupToggle = this.onSignupToggle.bind(this);
	    this.onForgotPassword = this.onForgotPassword.bind(this);
    
        this.updateWidth = this.updateWidth.bind(this);
        this.userRegister = this.userRegister.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.handleChangesConfirmPass = this.handleChangesConfirmPass.bind(this);
        this.handleBlurEmail = this.handleBlurEmail.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.resetPasswordConfirm = this.resetPasswordConfirm.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
    
        const url = window.location.href;
        const matchResetPassword = url.match(/reset-password/g);
    
        matchResetPassword && this.setState({
            forgotPassword: true,
            writeYourEmail: false,
            resetPassword: true
        });
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

	onSignupToggle(signupToggle) {
		return e => {
			e.preventDefault();
			this.setState({signupToggle})
		}
	}
	
    onForgotPassword(forgotPassword){
        return e => {
            e.preventDefault();
            this.setState({
                forgotPassword
            })
        }
    }
    
    handleChanges(type) {
        return e => {
            this.setState({
                [type]: e.target.value
            })
        }
    }
    
    handleBlurEmail() {
        const {username} = this.state;
        
        if(!username){
            this.setState({
                errorEmail: true
            });
        } else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if(!re.test(username)){
                this.setState({
                    errorEmail: true
                });
            } else {
                this.setState({
                    errorEmail: false
                });
            }
        }
    }
    
    handleChangesPass(type) {
        return e => {
    
            if(!e.target.value){
                this.setState({
                    errorPassword: false,
                    passwordValidIcon: false,
                    isInfoBox: true
                })
            } else {
                
                const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
                
                if(reg.test(e.target.value)){
                    this.setState({
                        passwordStatus: true,
                        errorPassword: false
                    })
                } else {
                    this.setState({
                        passwordStatus: false,
                        errorPassword: true
                    })
                }
                
                this.setState({
                    passwordValidIcon: true,
                    isInfoBox: false
                })
            }
            
            this.setState({
                [type]: e.target.value
            }, () => {
                const {confirmPassword, password} = this.state;
                if (confirmPassword !== password) {
                    this.setState({
                        passwordConfirmStatus: false
                    })
                } else {
                    this.setState({
                        passwordConfirmStatus: true
                    })
                }
            });
        }
    }
    
    handleChangesConfirmPass(type) {
        return e => {
            
            if(!e.target.value){
                this.setState({
                    errorConfirmPassword: false,
                    passwordConfirmValidIcon: false,
                    [type]: e.target.value
                })
            } else {
                this.setState({
                    [type]: e.target.value
                }, () => {
                    const {confirmPassword, password} = this.state;
                    if (confirmPassword !== password) {
                        this.setState({
                            passwordConfirmStatus: false,
                            errorConfirmPassword: true
                        })
                    } else {
                        this.setState({
                            passwordConfirmStatus: true,
                            errorConfirmPassword: false
                        })
                    }
                    this.setState({
                        passwordConfirmValidIcon: true
                    })
                });
            }
        }
    }
    
    forgotPassword(event){
        event.preventDefault();
    
        const {filesActions} = this.props;
        const {email} = this.state;
    
        this.setState({
            forgotPassMessage: false,
            passwordConfirmMessage: false,
            spin: true
        });
    
        let data = {
            email_address: email
        };
    
        const formJSON = JSON.stringify(data);
    
        filesActions.resetPassword(formJSON)
        .then(res => {
            // console.log(res);
            this.setState({
                forgotPassMessage: res.message,
                email: '',
                spin: false
            })
        })
        .catch(e => {
            // console.error(e);
            this.setState({
                forgotPassMessage: e.message,
                spin: false
            });
        });
    }
    
    resetPasswordConfirm(event){
        event.preventDefault();
    
        const url = window.location.href;
        const pos = url.indexOf("=");
        const token = url.substr(pos + 1);
        
        const {filesActions} = this.props;
        const {password} = this.state;
            
        this.setState({
            passwordConfirmMessage: false,
            spin: true
        });
    
        let data = {
            token,
            password
        };
    
        const formJSON = JSON.stringify(data);
    
        filesActions.resetPasswordActivate(formJSON)
        .then(res => {
            // console.log(res);
            this.setState({
                passwordConfirmMessage: res.message,
                password: '',
                confirmPassword: '',
                spin: false,
                resetPassword: false,
                writeYourEmail: true
            });
    
            
        })
        .catch(e => {
            this.setState({
                passwordConfirmMessage: e.message,
                spin: false
            });
        });
    }
    
    userRegister(event){
        event.preventDefault();
        
        const {filesActions} = this.props;
        const {confirmPassword, username, password} = this.state;
    
        this.setState({
            registerMessage: false,
            spin: true
        });
        
        if (confirmPassword !== password) {
            this.setState({
                spin: false,
                errorConfirmPassword: true,
                registerMessage: false
            });
            return false;
        } else {
            this.setState({
                errorConfirmPassword: false
            })
        }
        
        let data = {
            email: username,
            password
        };
        
        const formJSON = JSON.stringify(data);
        
        filesActions.userRegister(formJSON)
        .then(res => {
            this.setState({
                registerMessage: res.message,
                username: '',
                password: '',
                confirmPassword: '',
                passwordStatus: false,
                passwordConfirmStatus: false,
                spin: false
            })
        })
        .catch(e => {
            this.setState({
                registerMessage: e.message,
                spin: false
            });
        });
    }
    
    userLogin(event){
        event.preventDefault();
        const {filesActions, userActions} = this.props;
        const {username, loginPassword} = this.state;
        
        this.setState({
            loginMessage: false,
            spin: true
        });
        
        let data = {
            email: username,
            password: loginPassword
        };

        const formJSON = JSON.stringify(data);
        
        filesActions.userLogin(formJSON)
        .then(res => {
            userActions.setUserToken(res.token);
            request.defaults.headers.common['Authorization'] = `JWT ${res.token}`;
            userActions.refreshToken(false);

            this.setState({
                username: '',
                loginPassword: '',
                spin: false,
                redirectToInvestmentPlan: true
            });

        })
        .catch(e => {
            this.setState({
                loginMessage: e.message,
                spin: false
            });
        });
    }

    render(){
        let {windowWidth} = this.state;
        windowWidth = windowWidth || window.innerWidth;
        
        const isDesktop = windowWidth > 1024;
        const isTablet = windowWidth <= 1024 && windowWidth > 768;
        const isMobile = windowWidth <= 768;

        const {closeModal} = this.props;
	    const {signupToggle, errorConfirmPassword, registerMessage, loginMessage,
            spin, passwordStatus, passwordConfirmStatus, errorPassword, isInfoBox, passwordConfirmValidIcon,
            passwordValidIcon, redirectToInvestmentPlan, errorEmail, forgotPassMessage, writeYourEmail, resetPassword,
            passwordConfirmMessage,
	    } = this.state;
	    
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const content_info = (
                <div className="signup__info_content">
                    <p>Ihr Passwort muss mindestens enthalten:  </p>
                    <ul>
                        <li>- 8 Zeichen</li>
                        <li> - Groß- und Kleinbuchstaben </li>
                        <li>- Zahlen</li>
                    </ul>
                </div>
            );

        if(redirectToInvestmentPlan) return <Redirect to="/investment-plan" />;
        
        return (
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                contentLabel="ConfirmModal"
                style={(isDesktop && modalStyles.desktop) ||
                (isTablet && modalStyles.tablet) ||
                (isMobile && modalStyles.mobile)}
            >
                <div className="signup__inner">
                    <div className="signup__wrapper">
                        <div
                            className="signup__bg"
                            style={{backgroundImage: "url('img/architecture-columnar-building-ornament-161277.jpg')"}}
                        >
                            <div style={{backgroundImage: "url('img/Liniengrafik_XL_Safety.svg')"}}/>
                        </div>
                        <div className="close-popup" onClick={closeModal}>
                            <i className="material-icons">&#xE14C;</i>
                        </div>
                        <div className="signup__form">
                            <div className="signup__form_content">
                                {this.state.forgotPassword &&
                                    <div className="signup__form_reset-content">
                                        <div className="signup__form_nav">
                                            <a
                                                href="/"
                                                className="signup__form_tab"
                                                onClick={this.onForgotPassword(false)}
                                            >
                                                ZURÜCK
                                            </a>
                                        </div>
                                        {resetPassword &&
                                        <form
                                            className="signup__form_inner"
                                            onSubmit={this.resetPasswordConfirm}
                                            noValidate
                                        >
                                            <div className="signup__form_float">
                                                <div className="signup__form_reset-pass">
                                                    Um Ihr altes Passwort zurückzusetzen, geben Sie bitte nachfolgend
                                                    ein neues ein und bestätigen Sie dieses.
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        name="password"
                                                        className="password-st"
                                                        type="password"
                                                        placeholder="Ihr Passwort*"
                                                        value={this.state.password || ''}
                                                        onChange={this.handleChangesPass('password')}
                                                    />
                                                    {passwordValidIcon &&
                                                    <div className="password-status">
                                                        {passwordStatus &&
                                                        <Icon type="check" />
                                                        }
                                                        {!passwordStatus &&
                                                        <Icon type="close" />
                                                        }
                                                    </div>
                                                    }
                                                    { isInfoBox &&
                                                    <Popover
                                                        content={content_info}
                                                        placement="bottomRight"
                                                        trigger="click"
                                                        overlayClassName="signup__form_info"
                                                    >
                                                        <Button className="signup__form_tooltip">i</Button>
                                                    </Popover>
                                                    }
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        name="confirm-password"
                                                        type="password"
                                                        placeholder="Ihr Passwort wiederholen*"
                                                        value={this.state.confirmPassword || ''}
                                                        onChange={this.handleChangesConfirmPass('confirmPassword')}
                                                    />
                                                    {passwordConfirmValidIcon &&
                                                    <div className="password-status">
                                                        {passwordConfirmStatus &&
                                                        <Icon type="check" />
                                                        }
                                                        {!passwordConfirmStatus &&
                                                        <Icon type="close" />
                                                        }
                                                    </div>
                                                    }
                                                </div>

                                                <div className="validation-place">
                                                    {spin &&
                                                    <Spin indicator={antIcon} />
                                                    }
                                                    {errorPassword &&
                                                    <div className="validation-message">
                                                        Stelle sicher, dass dieses Feld mindestens 8 Zeichen lang ist.
                                                    </div>
                                                    }
                                                    {errorConfirmPassword &&
                                                    <div className="validation-message">
                                                        Die angegebenen Passwörter stimmen
                                                        nicht überein. Bitte überprüfen Sie Ihre
                                                        Angaben.
                                                    </div>
                                                    }
                                                    {passwordConfirmMessage &&
                                                    <div className="validation-message">
                                                        {passwordConfirmMessage}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            <button type="submit" className="btn-submit size3">
                                                <span>ZURÜCKSETZEN</span>
                                            </button>
                                        </form>
                                        }
                                        {writeYourEmail &&
                                        <form
                                            className="signup__form_inner"
                                            onSubmit={this.forgotPassword}
                                            noValidate
                                        >
                                            <div className="signup__form_float">
                                                <div className="signup__form_reset-pass">
                                                    Sie haben Ihr Passwort vergessen? Bitte geben Sie
                                                    Ihre E-Mail-Adresse in das aufgeführte  Feld ein und wir
                                                    senden Ihnen einen Link zum  Zurücksetzen des Passworts zu.
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        placeholder="Ihre E-Mail-Adresse"
                                                        value={this.state.email || ''}
                                                        onChange={this.handleChanges('email')}
                                                    />
                                                </div>
                                                <div className="validation-place">
                                                    {spin &&
                                                    <Spin indicator={antIcon} />
                                                    }
                                                    {forgotPassMessage &&
                                                    <div className="validation-message">
                                                        {forgotPassMessage}
                                                    </div>
                                                    }
                                                    {passwordConfirmMessage &&
                                                    <div className="validation-message">
                                                        {passwordConfirmMessage}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            <button type="submit" className="btn-submit size3">
                                                <span>ZURÜCKSETZEN</span>
                                            </button>
                                        </form>
                                        }
                                    </div>
                                }
                                {!this.state.forgotPassword &&
                                    <div className="signup__form_login-content">
                                        <div className="signup__form_nav">
                                            <a href="/" className={`${signupToggle ? 'active' : ''} signup__form_tab`}
                                               onClick={this.onSignupToggle(true)}>ANMELDEN</a>
                                            <a href="/" className={`${signupToggle ? '' : 'active'} signup__form_tab`}
                                               onClick={this.onSignupToggle(false)}>REGISTRIEREN</a>
                                        </div>
                                        {!this.state.signupToggle &&
                                        <form
                                            className="signup__form_inner"
                                            onSubmit={this.userRegister}
                                            noValidate
                                        >
                                            <div className="signup__form_float">
                                                <div className="field-group">
                                                    <input
                                                        name="username"
                                                        type="text"
                                                        placeholder="Ihre E-Mail-Adresse*"
                                                        value={this.state.username || ''}
                                                        onChange={this.handleChanges('username')}
                                                        onBlur={this.handleBlurEmail}
                                                    />
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        className="password-st"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Ihr Passwort*"
                                                        value={this.state.password || ''}
                                                        onChange={this.handleChangesPass('password')}
                                                    />
                                                    {passwordValidIcon &&
                                                        <div className="password-status">
                                                            {passwordStatus &&
                                                            <Icon type="check" />
                                                            }
                                                            {!passwordStatus &&
                                                            <Icon type="close" />
                                                            }
                                                        </div>
                                                    }
                                                    { isInfoBox &&
                                                        <Popover
                                                            content={content_info}
                                                            placement="bottomRight"
                                                            trigger="click"
                                                            overlayClassName="signup__form_info"
                                                        >
                                                            <Button className="signup__form_tooltip">i</Button>
                                                        </Popover>
                                                    }
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        type="password"
                                                        name="regRePassword"
                                                        placeholder="Ihr Passwort wiederholen*"
                                                        value={this.state.confirmPassword || ''}
                                                        onChange={this.handleChangesConfirmPass('confirmPassword')}
                                                    />
                                                    {passwordConfirmValidIcon &&
                                                    <div className="password-status">
                                                        {passwordConfirmStatus &&
                                                        <Icon type="check" />
                                                        }
                                                        {!passwordConfirmStatus &&
                                                        <Icon type="close" />
                                                        }
                                                    </div>
                                                    }
                                                </div>
                                                <div className="validation-place">
                                                    {spin &&
                                                        <Spin indicator={antIcon} />
                                                    }
                                                    {errorEmail &&
                                                        <div className="validation-message">
                                                            Gib eine gültige E-Mail Adresse an.
                                                        </div>
                                                    }
                                                    {errorPassword &&
                                                        <div className="validation-message">
                                                            Stelle sicher, dass dieses Feld mindestens 8 Zeichen lang
                                                            ist.
                                                        </div>
                                                    }
                                                    {errorConfirmPassword &&
                                                        <div className="validation-message">
                                                            Die angegebenen Passwörter stimmen
                                                            nicht überein. Bitte überprüfen Sie Ihre
                                                            Angaben.
                                                        </div>
                                                    }
                                                    {registerMessage &&
                                                    <div className="validation-message">
                                                        {registerMessage}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn-submit size2"
                                            >
                                                <span>REGISTRIEREN</span>
                                            </button>
                                        </form>
                                        }
                                        {this.state.signupToggle &&
                                        <form
                                            className="signup__form_inner"
                                            onSubmit={this.userLogin}
                                        >
                                            <div className="signup__form_float">
                                                <div className="field-group">
                                                    <input
                                                        name="username"
                                                        type="text"
                                                        placeholder="Ihre E-Mail-Adresse*"
                                                        value={this.state.username || ''}
                                                        onChange={this.handleChanges('username')}
                                                    />
                                                </div>
                                                <div className="field-group">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        placeholder="Ihr Passwort*"
                                                        value={this.state.loginPassword || ''}
                                                        onChange={this.handleChanges('loginPassword')}
                                                    />
                                                </div>
                                                <div className="field-group">
                                                    <div className="forgotPassword">
                                                        <a
                                                            href="/"
                                                            onClick={this.onForgotPassword(true)}
                                                            className="forgot-field"
                                                        >
                                                            Passwort vergessen?
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="validation-place">
                                                    {spin &&
                                                        <Spin indicator={antIcon} />
                                                    }
                                                    {loginMessage &&
                                                    <div className="validation-message">
                                                        {loginMessage}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn-submit size1"
                                            >
                                                <span>ANMELDEN</span>
                                            </button>
                                        </form>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    };
}

LoginModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    filesActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        userActions: state.userSetting.userActions,
        userToken: state.userSetting.userToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filesActions: bindActionCreators(filesActions, dispatch),
        configActions: bindActionCreators(configActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)