import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Radio, InputNumber, Spin} from 'antd';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/input-number/style/index.css';
import 'antd/es/spin/style/index.css';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filesActions from "../../../../actions/filesActions";

class IpStep6 extends Component {
    constructor(props) {
        super(props);

        const {
            returnExpectationPerAnnum,
            receiveAdHocInformation,
            readyToDelegateInvestmentDecisions
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            returnExpectationPerAnnum,
            receiveAdHocInformation,
            readyToDelegateInvestmentDecisions,
            errorMessage: false,
            choices2: []
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeInputNumber = this.onChangeInputNumber.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
    }

    // React lifecycle
    componentDidMount(){
        this.getQuestionnaire();
    }

    getQuestionnaire(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.getQuestionnaireData(4.2)
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'return_expectation':
                            if(item.value){
                                this.setState({
                                    returnExpectationPerAnnum: item.value
                                })
                            }
                            break;
                        case 'loss_ad_hoc_information':
                            if(item.value){
                                this.setState({
                                    receiveAdHocInformation: item.value
                                })
                            }

                            const arr2 = [];
                            let obj2 = item.choices;

                            for (let key in obj2){
                                arr2.push(obj2[key]);
                            }

                            this.setState({ choices2: arr2 });

                            break;

                        case 'delegate_decisions': this.setState({ readyToDelegateInvestmentDecisions: item.value });
                        break;

                        default:
                            return;
                    }
                });
                this.setState({spin: false});
                // console.log(res);
            })
            .catch(e => {
                this.setState({spin: false});
                console.error(e.message);
            });
    }
    
    previousStep(){
        return () => {
            const {
                configActions,
                investmentPlanProgressBar
            } = this.props;
        
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar - (25 / 7));
        
            // Collect IP data in Redux
            let data = {
                currentStep: 'questionnaire_4'
            };
        
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
        
            const {
                returnExpectationPerAnnum,
                receiveAdHocInformation,
                readyToDelegateInvestmentDecisions
            } = this.state;
        
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar,
            } = this.props;
        
            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_6',
                returnExpectationPerAnnum,
                receiveAdHocInformation,
                readyToDelegateInvestmentDecisions
            };
        
            if(!data.returnExpectationPerAnnum
                || !data.receiveAdHocInformation
                || data.readyToDelegateInvestmentDecisions === undefined) {
            
                this.setState({
                    errorMessage: true
                });
                return false;
            } else {
                this.setState({
                    errorMessage: false
                });
            }

            // Collect IP data for Back-end
            const dataAPI = {
                return_expectation: returnExpectationPerAnnum,
                loss_ad_hoc_information: receiveAdHocInformation,
                delegate_decisions: readyToDelegateInvestmentDecisions
            };

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.postQuestionnaireData(dataJSON, 4.2)
                .then(res => {
                    // console.log(res);
                    configActions.collectInvestmentPlanData(data);
                    configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar + (25 / 7));
                })
                .catch(e => {
                    // console.error(e.message);
                });
        }
    }
    
    onChange(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            })
        }
    }
    
    onChangeInputNumber(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }
    
    
    render(){
        
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        
        const {errorMessage, choices2, spin} = this.state;
        
        return (
            <div className="investment-plan__content">
                {spin &&
                <div className="spin-active">
                    <Spin size="large" />
                </div>
                }
                {!spin &&
                <div>
                    <ul>
                        <li>
                            <div className="investment-plan__subtitle">
                                Meine Renditeerwartung per Annum liegt bei
                            </div>
                            <div className="investment-plan__inputNumber">
                                <InputNumber
                                    className={`${(errorMessage && !this.state.returnExpectationPerAnnum)
                                    && "not-filled"}`}
                                    defaultValue={0}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    value={this.state.returnExpectationPerAnnum}
                                    onChange={this.onChangeInputNumber('returnExpectationPerAnnum')}
                                />
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Ab welchem Verlust möchten Sie eine Ad-Hoc-Information erhalten?
                            </div>
                            <p>Erhöhte Renditechancen bedeuten unter Umständen größere Wertschwankungen
                                des Depots als bei sehr konservativen Anlagen. Damit Sie stets Kontrolle
                                über Ihre Vermögenswerte behalten, informieren wir Sie, sobald der Wert
                                Ihres Depots 10 Prozent verlieren würde. Möchten Sie früher informiert
                                werden?</p>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('receiveAdHocInformation')}
                                    value={this.state.receiveAdHocInformation}
                                >
                                    {choices2.map((value, i) => {
                                        return <RadioButton
                                            value={i + 1}
                                            key={i + 1}
                                        >
                                            {value}
                                        </RadioButton>
                                    })}
                                </RadioGroup>
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Sind Sie bereit, Anlageentscheidungen zu delegieren?
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('readyToDelegateInvestmentDecisions')}
                                    value={this.state.readyToDelegateInvestmentDecisions}
                                >
                                    <RadioButton value={true}> Ja</RadioButton>
                                    <RadioButton value={false}>Nein</RadioButton>
                                </RadioGroup>
                            </div>
                        </li>
                    </ul>
                    {errorMessage &&
                    <div className="investment-plan__error">
                        Alle hier gestellten Fragen sind Pflichtangaben.
                        Bitte füllen Sie alle Punkte sorgfältig aus.
                    </div>
                    }
                    <div className="investment-plan__btn-area">
                        <div
                            onClick={this.previousStep()}
                            className="investment-plan__btn-back"
                        >
                            <span>ZURÜCK</span>
                        </div>
                        <div
                            className="investment-plan__btn"
                            onClick={this.nextStep()}
                        >
                            <span>Weiter</span>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
        
    };
}

IpStep6.propTypes = {
    configActions: PropTypes.object.isRequired,
    filesActions: PropTypes.object.isRequired,
    investmentPlanProgressBar: PropTypes.number.isRequired,
    investmentPlanData: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        investmentPlanProgressBar: state.config.investmentPlanProgressBar,
        investmentPlanData: state.config.investmentPlanData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        filesActions: bindActionCreators(filesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpStep6);