import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Spin, Icon } from 'antd';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from "../../../../actions/userActions";
import request from "../../../../httpConfig";

class IpStep81 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactMeResponse: false,
            spin: false
        };

        this.previousStep = this.previousStep.bind(this);
        this.contactMe = this.contactMe.bind(this);
        this.dontContactMe = this.dontContactMe.bind(this);
    }

    contactMe(){
        return () => {

            const {filesActions, configActions, userActions} = this.props;

            this.setState({ spin: true });

            // Collect IP data for Back-end
            const dataAPI = {
                reason: "investment_plan"
            };
            const dataJSON = JSON.stringify(dataAPI);

            filesActions.contactMeOnAdviserManager(dataJSON)
                .then(res => {
                    console.log(res);
                    this.setState({
                        contactMeResponse: res.message,
                        spin: false
                    });
                    const data = {
                        userBeContactedAndCanProcess: true
                    };
                    configActions.collectInvestmentPlanData(data);

                    setTimeout(() => {
                        const data = {
                            currentStep: 'questionnaire_7',
                        };

                        configActions.collectInvestmentPlanData(data);

                        delete request.defaults.headers.common['Authorization'];
                        delete request.defaults.headers['Authorization'];
                        userActions.setUserToken('');
                    }, 3000)
                })
                .catch(e => {
                    // console.error(e.message);
                    this.setState({ spin: false });
                });
        }
    }

    dontContactMe(){
        const {userActions, configActions} = this.props;

        const data = {
            currentStep: 'questionnaire_7',
        };

        configActions.collectInvestmentPlanData(data);

        delete request.defaults.headers.common['Authorization'];
        delete request.defaults.headers['Authorization'];
        userActions.setUserToken('');
    }

    previousStep(){
        return () => {
            const {
                configActions
            } = this.props;

            const data = {
                currentStep: 'questionnaire_7',
            };

            configActions.collectInvestmentPlanData(data);
        }
    }

    render(){

        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const {contactMeResponse, spin} = this.state;

        return (
            <div ref={node => {this.wrapper = node}} className="investment-plan__content">
                <div>
                    <ul>
                        <li>
                            <div className="investment-plan__subtitle">
                                Information
                            </div>
                            <div className="investment-plan__subtext">
                                Während des Registrierungsprozesses haben Sie angegeben, keine Anlageentscheidungen
                                delegieren zu wollen. Um Ihnen eine bestmögliche Vermögensverwaltung bieten zu können,
                                ist dies allerdings notwendig. Unsere Mitarbeiter treffen Anlageentscheidungen nur in
                                Ihrem Interesse und nach vorher festgelegten Risiko-und Anlageparametern.Möchten Sie
                                diesen Service in Anspruch nehmen, gehen Sie bitte zurück und ändern Sie Ihre Angaben.
                                Möchten Sie weiterhin keine Anlageentscheidungen delegieren, können wir Ihnen diesen
                                Service leider nicht zur Verfügung stellen. Gegebenenfallskönnen wir Sie jedoch im
                                Rahmen der Anlageberatung unterstützen. Möchten Siehierzu kontaktiert werden? Nach
                                Ihrer Auswahl werden Sie automatisch ausgeloggt.
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__group">
                                <button
                                    className="ip-btn-lrg"
                                    onClick={this.contactMe()}
                                >
                                    <span>Ich möchte kontaktiert werden</span>
                                </button>
                                <button
                                    className="ip-btn-lrg"
                                    onClick={this.dontContactMe}
                                >
                                    <span>Ich möchte nicht kontaktiert warden</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                    {spin &&
                    <Spin indicator={antIcon} />
                    }
                    {contactMeResponse &&
                    <div className="response-message">
                        {contactMeResponse}
                    </div>
                    }
                    <div className="investment-plan__btn-area">
                        <div
                            onClick={this.previousStep()}
                            className="investment-plan__btn-back"
                        >
                            <span>ZURÜCK</span>
                        </div>
                    </div>
                </div>
            </div>

        )

    };
}

IpStep81.propTypes = {
    configActions: PropTypes.object.isRequired,
    filesActions: PropTypes.object.isRequired,
    investmentPlanProgressBar: PropTypes.number.isRequired,
    investmentPlanData: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        investmentPlanProgressBar: state.config.investmentPlanProgressBar,
        investmentPlanData: state.config.investmentPlanData,
        userActions: state.userSetting.userActions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        filesActions: bindActionCreators(filesActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpStep81);