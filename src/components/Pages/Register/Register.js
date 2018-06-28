import React, {Component} from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { Popover, Button, Spin, Icon } from 'antd';
import { NavLink, Redirect } from 'react-router-dom'
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../actions/filesActions';
import * as configActions from '../../../actions/configActions';
import * as userActions from '../../../actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import modalStyles from '../../Modals/modalStyles'

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            passwordStatus: false,
            passwordConfirmStatus: false,
            errorConfirmPassword: false,
            errorPassword: false,
            isInfoBox: true,
            passwordConfirmValidIcon: false,
            passwordValidIcon: false,
            redirectToInvestmentPlan: false
        };
        
        this.closePopup = this.closePopup.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.userRegister = this.userRegister.bind(this);
        this.handleChangesConfirmPass = this.handleChangesConfirmPass.bind(this);
        this.handleBlurEmail = this.handleBlurEmail.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }
    
    closePopup(){
        const {configActions, isLoginPopupOpen} = this.props;
        isLoginPopupOpen && configActions.toggleLoginPopup(false);
    }
    
    handleChanges(type) {
        return e => {
            this.setState({
                [type]: e.target.value
            })
        }
    }
    
    handleBlurEmail() {
        const {email} = this.state;
        
        if(!email){
            this.setState({
                errorEmail: true
            });
        } else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if(!re.test(email)){
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
    
    userRegister(event){
        event.preventDefault();
        
        const {filesActions} = this.props;
        const {confirmPassword, email, password} = this.state;
        
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
            email,
            password,
            // provider: 'donaucapital'
        };
        
        const formJSON = JSON.stringify(data);
        
        filesActions.userRegister(formJSON)
        .then(res => {
            // console.log(res);
            this.setState({
                registerMessage: res.message,
                email: '',
                password: '',
                confirmPassword: '',
                passwordStatus: false,
                passwordConfirmStatus: false,
                spin: false
            })
        })
        .catch(e => {
            // console.error(e);
            this.setState({
                registerMessage: e.message,
                spin: false
            });
        });
    }
    
    render(){
        let { windowWidth } = this.state;
        windowWidth = windowWidth || window.innerWidth;
        // Change menu layout on width size
        
        const isDesktop = windowWidth > 1024;
        const isTablet = windowWidth <= 1024 && windowWidth > 768;
        const isMobile = windowWidth <= 768;
        
        const { closeModal } = this.props;
        const { errorConfirmPassword, registerMessage, spin, passwordStatus, passwordConfirmStatus, errorPassword,
            isInfoBox, passwordConfirmValidIcon, passwordValidIcon, redirectToInvestmentPlan, errorEmail,
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
                style={(isDesktop && modalStyles.desktopUmbrella) || (isTablet && modalStyles.tabletUmbrella) || (isMobile && modalStyles.mobileUmbrella)}
            >
                <div className="signup__inner">
                    <div className="signup__wrapper">
                        <div className="signup__bg" style={{backgroundImage: "url('img/shutterstock_334391150_small.jpg')"}}>

                        </div>
                        <NavLink
                            to="/"
                            className="close-popup"
                            onClick={this.closePopup}
                        >
                            <i className="material-icons">&#xE14C;</i>
                        </NavLink>
                        <div className="signup__form">
                            <div className="signup__form_content">
                                <div className="signup__form_login-content">
                                    <div className="signup__form_nav">
                                        <NavLink
                                            to="/dc-login"
                                            className={`signup__form_tab`}
                                        >
                                            ANMELDEN
                                        </NavLink>
                                        <NavLink
                                            to="/dc-register"
                                            className={`signup__form_tab`}
                                        >
                                            REGISTRIEREN
                                        </NavLink>
                                    </div>
                                    <form
                                        className="signup__form_inner"
                                        onSubmit={this.userRegister}
                                        noValidate
                                    >
                                        <div className="signup__form_float">
                                            <div className="field-group">
                                                <input
                                                    type="email"
                                                    placeholder="Ihre E-Mail-Adresse*"
                                                    value={this.state.email || ''}
                                                    onChange={this.handleChanges('email')}
                                                    onBlur={this.handleBlurEmail}
                                                />
                                            </div>
                                            <div className="field-group">
                                                <input
                                                    className="password-st"
                                                    name="regPassword"
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
                                            {registerMessage &&
                                            <div className="validation-message">
                                                {registerMessage}
                                            </div>
                                            }
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn-submit size2"
                                        >
                                            <span>REGISTRIEREN</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    };
}

Register.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)