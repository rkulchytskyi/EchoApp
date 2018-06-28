import React, {Component} from 'react';
import './InvestmentPlan.css';
import PropTypes from 'prop-types'
import { Progress, Menu, Dropdown, Icon  } from 'antd';
import { NavLink, Redirect } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component'
import 'antd/lib/select/style/index.css';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/input-number/style/index.css';
import 'antd/lib/progress/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import * as configActions from '../../../actions/configActions';
import * as userActions from '../../../actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import request from "../../../httpConfig";
import IpStep1 from './IpStep1/IpStep1';
import IpStep2 from './IpStep2/IpStep2';
import IpStep3 from './IpStep3/IpStep3';
import IpStep4 from './IpStep4/IpStep4';
import IpStep5 from './IpStep5/IpStep5';
import IpStep6 from './IpStep6/IpStep6';
import IpStep7 from './IpStep7/IpStep7';
import IpStep71 from './IpStep71/IpStep71';
import IpStep8 from './IpStep8/IpStep8';
import IpStep81 from './IpStep81/IpStep81';
import IpStep9 from './IpStep9/IpStep9';
import IpStep91 from './IpStep91/IpStep91';
import IpStep10 from './IpStep10/IpStep10';
import IpStep11 from './IpStep11/IpStep11';
import IpStep12 from './IpStep12/IpStep12';
import IpStep13 from './IpStep13/IpStep13';

class InvestmentPlan extends Component {
    constructor(props){
        super(props);

        this.updateWidth = this.updateWidth.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);

        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(nextProps){
        const {isRefreshToken, userActions, configActions} = nextProps;
        if(isRefreshToken){
            this.setState({
                isLogout: true
            }, () => {
                userActions.refreshToken(false);
                configActions.toggleLoginPopup(true);
            })
        }
        scrollToComponent(this.Top, { offset: 0, align: 'top', duration: 500, ease:'inCirc'});
    }

    componentDidMount(){
        // Why this cause issue in console log?
        const {configActions} = this.props;
        configActions.toggleLoginPopup(false);

        window.addEventListener('resize', this.updateWidth);
        scrollToComponent(this.Top, { offset: 0, align: 'top', duration: 500, ease:'inCirc'});
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

    onChangeLink(event){
        event.preventDefault();

        const tagA = event.target.nodeName === "a" ? event.target : event.target.closest('a');
        const newWindow = tagA && tagA.dataset.blank;
        const href = tagA && tagA.dataset.href;
        const element = document.getElementById(href);

        if(newWindow){
            window.open(window.location.origin + '/impressum/' + event.target.hash, '_blank');
            return false;
        }

        if (!element) {
            this.setState({redirectToLink: href})
        }
    }

    handleMenuClick(e){
        if (e.key === '1') {
            const {userActions} = this.props;
            this.setState({
                visible: false,
                isLogout: true
            }, () => {
                delete request.defaults.headers.common['Authorization'];
                delete request.defaults.headers['Authorization'];
                userActions.setUserToken('');
            });

        }
    };

    handleVisibleChange(flag){
        this.setState({ visible: flag });
    };
    
    render(){

        let {windowWidth, isLogout} = this.state;

        windowWidth = windowWidth || window.innerWidth;

        const isMobile = windowWidth < 768;

        let {
            investmentPlanProgressBar,
            userToken,
            isLoginPopupOpen,
            investmentPlanData:{currentStep}
        } = this.props;

        // fix cursor in right place for login modal
        const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

        iOS &&
        isLoginPopupOpen ?
            document.body.style.position = 'fixed' :
            document.body.setAttribute('style', '');

        if(isLogout) return <Redirect to="/" />;

        const { redirectToLink } = this.state;

        if (redirectToLink) return <Redirect to={`/impressum#${redirectToLink}`}/>;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="logout" /> Ausloggen</Menu.Item>
            </Menu>
        );

        return (
            <div
                ref={(div) => { this.Top = div; }}
                className="investment-plan"
            >
                <div className="investment-plan__header">
                    <div className="investment-plan__nav">
                        <div className="investment-plan__inner">
                            {(currentStep  !== 'identifikation_3') &&
                            <ul className="investment-plan__range">
                            { isMobile ?
                                <li className="active">
                                {
                                    currentStep === 'welcome'
                                        ?
                                        <div><span>1</span> Willkommen </div>
                                        :
                                        <span>1</span>
                                }
                                </li>
                                :
                                <li className={`${(
                                currentStep === 'welcome' ||
                                currentStep === 'questionnaire_1' ||
                                currentStep === 'questionnaire_2' ||
                                currentStep === 'questionnaire_3' ||
                                currentStep === 'questionnaire_4' ||
                                currentStep === 'questionnaire_5' ||
                                currentStep === 'questionnaire_6' ||
                                currentStep === 'questionnaire_6_1' ||
                                currentStep === 'questionnaire_7' ||
                                currentStep === 'questionnaire_8' ||
                                currentStep === 'overview_if_no' ||
                                currentStep === 'overview_1_before' ||
                                currentStep === 'overview_1' ||
                                currentStep === 'overview_2' ||
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}>
                                <span>1</span> Willkommen
                                </li>
                            }
                            { isMobile ?
                                <li
                                className={`${(
                                currentStep === 'questionnaire_1' ||
                                currentStep === 'questionnaire_2' ||
                                currentStep === 'questionnaire_3' ||
                                currentStep === 'questionnaire_4' ||
                                currentStep === 'questionnaire_5' ||
                                currentStep === 'questionnaire_6' ||
                                currentStep === 'questionnaire_6_1' ||
                                currentStep === 'questionnaire_7' ||
                                currentStep === 'questionnaire_8' ||
                                currentStep === 'overview_if_no' ||
                                currentStep === 'overview_1_before' ||
                                currentStep === 'overview_1' ||
                                currentStep === 'overview_2' ||
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}
                                >
                                {
                                    (
                                        currentStep === 'questionnaire_1' ||
                                        currentStep === 'questionnaire_2' ||
                                        currentStep === 'questionnaire_3' ||
                                        currentStep === 'questionnaire_4' ||
                                        currentStep === 'questionnaire_5' ||
                                        currentStep === 'questionnaire_6' ||
                                        currentStep === 'questionnaire_6_1' ||
                                        currentStep === 'questionnaire_7' ||
                                        currentStep === 'questionnaire_8'
                                    ) ?
                                        <div><span>2</span> Fragebogen</div>
                                        :
                                        <span>2</span>
                                }
                                </li>
                                :
                                <li className={`${(
                                currentStep === 'questionnaire_1' ||
                                currentStep === 'questionnaire_2' ||
                                currentStep === 'questionnaire_3' ||
                                currentStep === 'questionnaire_4' ||
                                currentStep === 'questionnaire_5' ||
                                currentStep === 'questionnaire_6' ||
                                currentStep === 'questionnaire_6_1' ||
                                currentStep === 'questionnaire_7' ||
                                currentStep === 'questionnaire_8' ||
                                currentStep === 'overview_if_no' ||
                                currentStep === 'overview_1_before' ||
                                currentStep === 'overview_1' ||
                                currentStep === 'overview_2' ||
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}>
                                <span>2</span> Fragebogen
                                </li>
                            }
                            { isMobile ?
                                <li className={`${(
                                currentStep === 'overview_if_no' ||
                                currentStep === 'overview_1_before' ||
                                currentStep === 'overview_1' ||
                                currentStep === 'overview_2' ||
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'

                            ) ? 'active': ''}`}>
                                {(
                                    currentStep === 'overview_if_no' ||
                                    currentStep === 'overview_1_before' ||
                                    currentStep === 'overview_1' ||
                                    currentStep === 'overview_2'
                                ) ?
                                    <div><span>3</span> Übersicht</div>
                                    :
                                    <span>3</span>
                                }
                                </li>
                                :
                                <li className={`${(
                                currentStep === 'overview_if_no' ||
                                currentStep === 'overview_1_before' ||
                                currentStep === 'overview_1' ||
                                currentStep === 'overview_2' ||
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}>
                                <span>3</span> Übersicht
                                </li>
                            }
                            { isMobile ?
                                <li className={`${(
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}>
                                {(
                                    currentStep === 'identifikation_1' ||
                                    currentStep === 'identifikation_2'
                                ) ?
                                    <div><span>4</span> Identifikation</div>
                                    :
                                    <span>4</span>
                                }
                                </li>
                                :
                                <li className={`${(
                                currentStep === 'identifikation_1' ||
                                currentStep === 'identifikation_2'
                            ) ? 'active': ''}`}>
                                <span>4</span> Identifikation
                                </li>
                            }
                                </ul>
                            }
                            
                            {!isMobile &&
                            <div className="investment-plan__progress">
                                <Progress percent={investmentPlanProgressBar} showInfo={false}/>
                            </div>
                            }
        
                        </div>
                    </div>
                    <div className="user-area">
                        {(userToken !== '') &&
                            <Dropdown overlay={menu}
                                      trigger={['click']}
                                      onVisibleChange={this.handleVisibleChange}
                                      visible={this.state.visible}
                                      placement="bottomRight"
                            >
        
                                <Icon type="user" />
                            </Dropdown>
                        }
                    </div>
                </div>
                
                
                <div className="investment-plan__section">
                    <div className="investment-plan__section_inner">
                        {(currentStep === 'welcome') &&
                            <IpStep1 />
                        }
                        {(currentStep === 'questionnaire_1') &&
                            <IpStep2 />
                        }
                        {(currentStep === 'questionnaire_2') &&
                            <IpStep3 />
                        }
                        {(currentStep === 'questionnaire_3') &&
                            <IpStep4 />
                        }
                        {(currentStep === 'questionnaire_4') &&
                            <IpStep5 />
                        }
                        {(currentStep === 'questionnaire_5') &&
                            <IpStep6 />
                        }
                        {(currentStep === 'questionnaire_6') &&
                            <IpStep7 />
                        }
                        {(currentStep === 'questionnaire_6_1') &&
                            <IpStep71 />
                        }
                        {(currentStep === 'questionnaire_7') &&
                            <IpStep8 />
                        }
                        {(currentStep === 'overview_if_no') &&
                            <IpStep81 />
                        }
                        {(currentStep === 'overview_1_before') &&
                            <IpStep91 />
                        }
                        {(currentStep === 'overview_1') &&
                            <IpStep9 />
                        }
                        {(currentStep === 'overview_2') &&
                            <IpStep10 />
                        }
                        {(currentStep === 'identifikation_1') &&
                            <IpStep11 />
                        }
                        {(currentStep === 'identifikation_2') &&
                            <IpStep12 />
                        }
                        {(currentStep === 'identifikation_3') &&
                            <IpStep13 />
                        }
                        
                    </div>
                </div>
                <div className="footer-mini">
                    <ul className="footer-mini__nav">
                        <li>
                            <NavLink to="/impressum" target="_blank">IMPRESSUM <span>| </span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/privacypolicy" target="_blank">DATENSCHUTZ <span>| </span></NavLink>
                        </li>
                        <li>
                            <a
                                data-href='risikohinweis'
                                data-blank='new-window'
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
                            target="_blank"
                        >
                            <img src="img/Wortmarke_Powered.svg" alt=""/>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    };
}

InvestmentPlan.propTypes = {
    configActions: PropTypes.object.isRequired,
    investmentPlanProgressBar: PropTypes.number.isRequired,
    investmentPlanData: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        investmentPlanProgressBar: state.config.investmentPlanProgressBar,
        investmentPlanData: state.config.investmentPlanData,
        userToken: state.userSetting.userToken,
        isRefreshToken: state.userSetting.isRefreshToken,
        userActions: state.userSetting.userActions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentPlan);