import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Spin, Icon } from 'antd';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep91 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactMeResponse: false,
            spin: false
        };

        this.nextStep = this.nextStep.bind(this);
        this.contactMe = this.contactMe.bind(this);
    }

    // React lifecycle
    componentDidMount(){
        this.getCustomerData();
    }

    contactMe(){
        return () => {

            const {filesActions, configActions} = this.props;

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
                })
                .catch(e => {
                    console.error(e.message);
                    this.setState({ spin: false });
                });


        }
    }

    getCustomerData(){
        const {filesActions, configActions} = this.props;

        filesActions.pullCustomerDataS7()
            .then(res => {
                const data = {
                    currentStep: 'overview_1',
                };
                configActions.collectInvestmentPlanData(data);

            })
            .catch(e => {
                if(e && e.adviser) {
                    this.setState({
                        advisorName: e.adviser
                    });
                }
            });
    }

    nextStep(){
        return () => {

            const {
                configActions,
                investmentPlanProgressBar
            } = this.props;

            // Collect IP data in Redux
            const data = {
                currentStep: 'overview_2',
            };

            configActions.collectInvestmentPlanData(data);
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar + (25 / 2));

        }
    }

    render(){

        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const {advisorName, contactMeResponse, spin} = this.state;
        const {investmentPlanData:{userBeContactedAndCanProcess}} = this.props;

        return (
            <div ref={node => {this.wrapper = node}} className="investment-plan__content">
                <div>
                    <ul>
                        <li>
                            <div className="investment-plan__subtitle">
                                Information
                            </div>
                            <div className="investment-plan__subtext">
                                Für DonauCapital ist Vermögensverwaltung ein sehr individueller Prozess.
                                Anlagestrategien mit großem Potential können auch große Risiken bergen.
                                Leider müssen wir Ihnen mitteilen, dass das Risikoprofil des ausgewählten
                                Advisors nicht zu Ihren gemachten Angaben hinsichtlich Erfahrung oder
                                Risikotoleranz passt. Möchten Sie das gewählte Angebot dennoch in Anspruch nehmen,
                                bieten wir Ihnen die Möglichkeit eines ausführlichen Beratungsgesprächs durch unseren
                                gebundenen Vermittler <b>{advisorName}</b>. So können Sie sich selbst einen Eindruck von
                                potentiellen Risiken und Chancen machen.<br/><br/>

                                Alternativ können wir Ihnen eine alternative Anlagestrategie vorschlagen,
                                welche zu Ihrem Risikoprofil passt. Wie möchten Sie fortfahren?
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
                                <button className="ip-btn-lrg"
                                >
                                    <span>Ich möchte einen Alternativvorschlag</span>
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
                    {userBeContactedAndCanProcess &&
                    <div className="investment-plan__btn-area">
                        <div
                            className="investment-plan__btn btn-lrg"
                            onClick={this.nextStep()}
                        >
                            <span>Bestätigen & Fortfahren</span>
                        </div>
                    </div>
                    }

                </div>
            </div>

        )

    };
}

IpStep91.propTypes = {
    configActions: PropTypes.object.isRequired,
    filesActions: PropTypes.object.isRequired,
    investmentPlanProgressBar: PropTypes.number.isRequired,
    investmentPlanData: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        investmentPlanProgressBar: state.config.investmentPlanProgressBar,
        investmentPlanData: state.config.investmentPlanData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        filesActions: bindActionCreators(filesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpStep91);