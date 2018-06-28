import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Radio, Spin } from 'antd';
import MaskedInput from 'react-text-mask'
import 'antd/lib/radio/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep5 extends Component {
    constructor(props) {
        super(props);

        const {
            nonSelfEmployment,
            selfEmployed,
            rental,
            capitalAssets,
            additionalInflowsOfCapital,
            availableCertainFunds,
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            errorMessage: false,
            availableCertainFundsCheckbox: availableCertainFunds === 'Nein',
            additionalInflowsOfCapitalCheckbox: additionalInflowsOfCapital === 'Nein',
            nonSelfEmployment,
            selfEmployed,
            rental,
            capitalAssets,
            additionalInflowsOfCapital,
            availableCertainFunds,
            choices1: [],
            choices2: [],
            choices3: [],
            choices4: []
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
    }

    // React lifecycle
    componentDidMount(){
        this.getQuestionnaire();
    }

    getQuestionnaire(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.getQuestionnaireData(4.1)
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'employment_income':
                            if(item.value){
                                this.setState({
                                    nonSelfEmployment: item.value
                                })
                            }

                            const arr1 = [];
                            let obj1 = item.choices;

                            for (let key in obj1){
                                arr1.push(obj1[key]);
                            }

                            this.setState({ choices1: arr1 });

                            break;
                        case 'commercial_income':
                            if(item.value){
                                this.setState({
                                    selfEmployed: item.value
                                })
                            }

                            const arr2 = [];
                            let obj2 = item.choices;

                            for (let key in obj2){
                                arr2.push(obj2[key]);
                            }

                            this.setState({ choices2: arr2 });

                            break;

                        case 'rental_income':
                            if(item.value){
                                this.setState({
                                    rental: item.value
                                })
                            }

                            const arr3 = [];
                            let obj3 = item.choices;

                            for (let key in obj3){
                                arr3.push(obj3[key]);
                            }

                            this.setState({ choices3: arr3});

                            break;

                        case 'capital_assets':
                            if(item.value){
                                this.setState({
                                    capitalAssets: item.value
                                })
                            }

                            const arr4 = [];
                            let obj4 = item.choices;

                            for (let key in obj4){
                                arr4.push(obj4[key]);
                            }

                            this.setState({ choices4: arr4 });

                            break;

                        case 'additional_inflows':
                            if(item.value ){
                                this.setState({
                                    additionalInflowsOfCapital: item.value
                                })
                            }
                            if(item.value === 0){
                                this.setState({
                                    additionalInflowsOfCapitalCheckbox: true
                                })
                            }

                            break;
                        case 'available_funds':
                            if(item.value){
                                this.setState({
                                    availableCertainFunds: item.value
                                })
                            }
                            if(item.value === 0){
                                this.setState({
                                    availableCertainFundsCheckbox: true
                                })
                            }

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
                currentStep: 'questionnaire_3'
            };
        
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
        
            const {
                nonSelfEmployment,
                selfEmployed,
                rental,
                capitalAssets,
                additionalInflowsOfCapital,
                availableCertainFunds,
                additionalInflowsOfCapitalCheckbox,
                availableCertainFundsCheckbox
            } = this.state;
        
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;
        
            // Collect IP data in Redux

            const data = {
                currentStep: 'questionnaire_5',
                nonSelfEmployment,
                selfEmployed,
                rental,
                capitalAssets,
                additionalInflowsOfCapital,
                availableCertainFunds
            };

            if(additionalInflowsOfCapitalCheckbox) {
                data.additionalInflowsOfCapital = 'Nein'
            }

            if(availableCertainFundsCheckbox) {
                data.availableCertainFunds = 'Nein'
            }

            if(!data.nonSelfEmployment
                || !data.selfEmployed
                || !data.rental
                || !data.capitalAssets
                || !data.additionalInflowsOfCapital
                || !data.availableCertainFunds) {
            
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
                employment_income: nonSelfEmployment,
                commercial_income: selfEmployed,
                rental_income: rental,
                capital_assets: capitalAssets,
            };

            if(!additionalInflowsOfCapitalCheckbox) {
                dataAPI.additional_inflows = +additionalInflowsOfCapital;
            } else {
                dataAPI.additional_inflows = 0;
            }

            if(!availableCertainFundsCheckbox) {
                dataAPI.available_funds = +availableCertainFunds;
            } else {
                dataAPI.available_funds = 0;
            }

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.postQuestionnaireData(dataJSON, 4.1)
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
    
    onToggle(field) {
        return e => {
            e.preventDefault();
            this.setState({field})
        }
    }
    
    render(){
        
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        
        const {errorMessage, additionalInflowsOfCapitalCheckbox, availableCertainFundsCheckbox, choices1, choices2,
            choices3, choices4, spin} = this.state;
        
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
                                Höhe der regelmäßigen monatlichen (Netto-)Einkünfte
                            </div>
                            <div className="investment-plan__radio">
                                <div className="investment-plan__radio_item">
                                    <div className="investment-plan__radio_title">
                                        Nichtselbstständige Tätigkeit
                                    </div>
                                    <RadioGroup
                                        onChange={this.onChange('nonSelfEmployment')}
                                        value={this.state.nonSelfEmployment}
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
                                <div className="investment-plan__radio_item">
                                    <div className="investment-plan__radio_title">
                                        Selbstständige Arbeit / Gewerbebetrieb
                                    </div>
                                    <RadioGroup
                                        onChange={this.onChange('selfEmployed')}
                                        value={this.state.selfEmployed}
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
                                <div className="investment-plan__radio_item">
                                    <div className="investment-plan__radio_title">
                                        Vermietung / Verpachtung
                                    </div>
                                    <RadioGroup
                                        onChange={this.onChange('rental')}
                                        value={this.state.rental}
                                    >
                                        {choices3.map((value, i) => {
                                            return <RadioButton
                                                value={i + 1}
                                                key={i + 1}
                                            >
                                                {value}
                                            </RadioButton>
                                        })}
                                    </RadioGroup>
                                </div>
                                <div className="investment-plan__radio_item">
                                    <div className="investment-plan__radio_title">
                                        Kapitalvermögen
                                    </div>
                                    <RadioGroup
                                        onChange={this.onChange('capitalAssets')}
                                        value={this.state.capitalAssets}
                                    >
                                        {choices4.map((value, i) => {
                                            return <RadioButton
                                                value={i + 1}
                                                key={i + 1}
                                            >
                                                {value}
                                            </RadioButton>
                                        })}
                                    </RadioGroup>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Erwarten Sie zusätzliche Vermögenszuflüsse in nächster Zeit?
                            </div>
                            <div className="investment-plan__group">
                                <div className="investment-plan__input">
                                    <MaskedInput
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        className={
                                            `${(errorMessage && !this.state.additionalInflowsOfCapital)
                                            && "not-filled"} ant-input
                                            ${additionalInflowsOfCapitalCheckbox && "disabled"}`
                                        }
                                        placeholder="Betrag eingeben"
                                        guide={false}
                                        value={this.state.additionalInflowsOfCapital}
                                        onChange={this.onChange('additionalInflowsOfCapital')}
                                        onFocus={() => {
                                            this.setState({
                                                additionalInflowsOfCapitalCheckbox: false
                                            })
                                        }}
                                    />
                                </div>
                                <button
                                    className={`${additionalInflowsOfCapitalCheckbox ? "active" : ''} ip-btn`}
                                    onClick={() => {
                                        this.setState({
                                            additionalInflowsOfCapitalCheckbox: !additionalInflowsOfCapitalCheckbox
                                        })
                                    }}
                                >
                                    Nein
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Müssen bestimmte Gelder zu einem bestimmten Zeitpunkt verfügbar sein?
                            </div>
                            <div className="investment-plan__group">
                                <div className="investment-plan__input">
                                    <MaskedInput
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        className={
                                            `${(errorMessage && !this.state.availableCertainFunds)
                                            && "not-filled"} ant-input
                                            ${availableCertainFundsCheckbox && "disabled"}`
                                        }
                                        placeholder="Betrag eingeben"
                                        guide={false}
                                        value={this.state.availableCertainFunds}
                                        onChange={this.onChange('availableCertainFunds')}
                                        onFocus={() => {
                                            this.setState({
                                                availableCertainFundsCheckbox: false
                                            })
                                        }}
                                    />
                                </div>
                                <button
                                    className={`${availableCertainFundsCheckbox ? "active" : ''} ip-btn`}
                                    onClick={() => {
                                        this.setState({
                                            availableCertainFundsCheckbox: !availableCertainFundsCheckbox
                                        })
                                    }}
                                >
                                    Nein
                                </button>
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

IpStep5.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep5);