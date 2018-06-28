import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Radio, Spin } from 'antd';
import 'antd/lib/radio/style/index.css';
import 'antd/es/spin/style/index.css';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep2 extends Component {
    constructor(props) {
        super(props);

        const {
            capital,
            investmentHorizon1,
            investmentHorizon2
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            capital,
            investmentHorizon1,
            investmentHorizon2,
            errorMessage: false,
            choices1: [],
            choices2: []
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
    }

    componentDidMount(){
        this.getQuestionnaire();
    }

    getQuestionnaire(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.getQuestionnaireData(2)
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'investment_amount':
                            if(item.value){
                                this.setState({
                                    capital: item.value
                                })
                            }
                            break;
                        case 'investment_horizon':
                            if(item.value){
                                this.setState({
                                    investmentHorizon1: item.value
                                })
                            }

                            const arr1 = [];
                            let obj1 = item.choices;

                            for (let key in obj1){
                                arr1.push(obj1[key]);
                            }

                            this.setState({ choices1: arr1 });

                            break;
                        case 'investment_goal':
                            if(item.value){
                                this.setState({
                                    investmentHorizon2: item.value
                                })
                            }

                            const arr2 = [];
                            let obj2 = item.choices;

                            for (let key in obj2){
                                arr2.push(obj2[key]);
                            }

                            this.setState({ choices2: arr2 });

                            break;
                        default:
                            return;
                    }
                });
                this.setState({spin: false});
                // console.log(res);
            })
            .catch(e => {
                console.error(e.message);
                this.setState({spin: false});
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
                currentStep: 'welcome'
            };
    
            configActions.collectInvestmentPlanData(data);
    
        }
    }
    
    nextStep(){
        return () => {
    
            const {
                capital,
                investmentHorizon1,
                investmentHorizon2
            } = this.state;
            
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;

            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_2',
                capital,
                investmentHorizon1,
                investmentHorizon2
            };

            if(typeof capital === 'string'){
                const thenum = capital.replace( /^\D+/g, '').split('.').join('');
                data.capital = +thenum;
            }

            if(!data.capital
                || +data.capital < 1000
                || !data.investmentHorizon1
                || !data.investmentHorizon2) {
                this.setState({
                    errorMessage: true
                });
                return false;
            } else {
                this.setState({
                    errorMessage: false
                });
            }

            // Collect IP data for Back-en
            const dataAPI = {
                investment_amount: capital,
                investment_horizon: investmentHorizon1,
                investment_goal: investmentHorizon2
            };

            if(typeof capital === 'string'){
                const thenum = capital.replace( /^\D+/g, '').split('.').join('');
                dataAPI.investment_amount = +thenum;
            }

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.postQuestionnaireData(dataJSON, 2)
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

    render(){
        
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
    
        const {errorMessage, choices1, choices2, spin} = this.state;

        const moneyMask = createNumberMask({
            prefix: '€ ',
            thousandsSeparatorSymbol: '.',
            suffix: '' // This will put the dollar sign at the end, with a space.
        });
        
        return (
            <div className="investment-plan__content">
                {spin &&
                <div className="spin-active">
                    <Spin size="large" />
                </div>
                }
                {!spin &&
                <div>
                    <div className="investment-plan__title">Zielsetzung</div>
                    <div className="investment-plan__subline">
                        Ein umfassender Überblick über Ihre finanziellen Verhältnisse, Ziele und
                        Risikobereitschaft sind elementar, um Ihnen ein geeignetes Portfolio bieten zu können.
                    </div>
                    <ul>
                        <li>
                            <div className="investment-plan__subtitle">
                                Welchen Betrag möchten Sie gemeinsam mit DonauCapital verwalten?
                            </div>
                            <div className="investment-plan__currency">
                                <MaskedInput
                                    mask={moneyMask}
                                    className={`${(errorMessage && !this.state.capital) && "not-filled"} ant-input`}
                                    placeholder="Betrag in €"
                                    guide={false}
                                    value={this.state.capital}
                                    onChange={this.onChange('capital')}
                                />
                                <div className="investment-plan__notice">
                                    Bitte geben Sie mindestens 1.000 Euro ein.
                                </div>
                            </div>
                        </li>
                        <li className="step2-q2">
                            <div className="investment-plan__subtitle">
                                Welchen Anlagehorizont haben Sie für dieses Vermögen?
                            </div>
                            <div className="investment-plan__radio ">
                                <RadioGroup
                                    onChange={this.onChange('investmentHorizon1')}
                                    value={this.state.investmentHorizon1}
                                >
                                    {choices1.map((value, i) => {
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
                        <li className="step2-q3">
                            <div className="investment-plan__subtitle">
                                Was ist das Ziel Ihrer Geldanlage?
                            </div>
                            <div className="investment-plan__radio ">
                                <RadioGroup
                                    onChange={this.onChange('investmentHorizon2')}
                                    value={this.state.investmentHorizon2}
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
                    </ul>
                    {errorMessage &&
                    <div className="investment-plan__error">
                        Alle hier gestellten Fragen sind Pflichtangaben.
                        Bitte füllen Sie alle Punkte sorgfältig aus.
                    </div>
                    }
                    <div className="investment-plan__btn-area">
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

IpStep2.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep2);