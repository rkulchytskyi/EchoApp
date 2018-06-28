import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Radio, Select, Spin} from 'antd';

import 'antd/lib/radio/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/es/spin/style/index.css';

import MaskedInput from 'react-text-mask'

import * as filesActions from "../../../../actions/filesActions";
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep71 extends Component {
    constructor(props) {
        super(props);
    
        const {
            taxID,
            landTaxResidency,
            UStaxLiability
        } = props.investmentPlanData;
        
        this.state = {
            ...props.investmentPlanData,
            errorMessage: false,
            taxID,
            landTaxResidency,
            UStaxLiability,
            landTaxResidencyChoices:[]
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.getCustomerData = this.getCustomerData.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
        this.getCustomerData();
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    getCustomerData(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.pullCustomerData()
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'tax_country':
                            const landTaxResidencyArr = [];
                            const landTaxResidencyObj = item.choices;

                            for (let key in landTaxResidencyObj){
                                landTaxResidencyArr.push(landTaxResidencyObj[key]);
                            }

                            this.setState({ landTaxResidencyChoices: landTaxResidencyArr });
                            if(item.value) {
                                this.setState({ landTaxResidency: item.value });
                            }
                            break;
                        case 'tax_identification': this.setState({ taxID: item.value }); break;
                        case 'us_tax_liability': this.setState({ UStaxLiability: item.value }); break;

                        default: return;
                    }
                });
                // console.log(res);
                this.setState({spin: false});
            })
            .catch(e => {
                console.error(e.message);
                this.setState({spin: false});
            });
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }
    
    previousStep(){
        return () => {
            const {
                configActions,
            } = this.props;
            
            // Collect IP data in Redux
            let data = {
                currentStep: 'questionnaire_6'
            };
            
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
            
            const {
                taxID,
                landTaxResidency,
                UStaxLiability
            } = this.state;
            
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;
            
            if (UStaxLiability) return false;
            
            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_7',
                taxID,
                landTaxResidency,
                UStaxLiability
            };
            
            if(!data.taxID
                || !data.landTaxResidency
                || (data.UStaxLiability === undefined)) {
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
                tax_country: landTaxResidency,
                tax_identification: taxID,
                us_tax_liability: UStaxLiability
            };

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.pushCustomerData(dataJSON)
                .then(res => {
                    // console.log(res);
                    configActions.collectInvestmentPlanData(data);
                    configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar + (25 / 7));
                })
                .catch(e => {
                    // console.error(e.message);
                    this.setState({
                        validationOnBE: e.message
                    })
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
    
    onChangeSelect(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }
    
    render(){
        
        const Option = Select.Option;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        
        const {errorMessage, validationOnBE, UStaxLiability, spin, landTaxResidencyChoices} = this.state;
        
        return (
            <div className="investment-plan__content">
                {spin &&
                <div className="spin-active">
                    <Spin size="large" />
                </div>
                }
                {!spin &&
                <div>
                    <div className="investment-plan__title">Steuerinformationen</div>
                    <div className="investment-plan__subline">
                        Da unsere Partnerbank gemäß Finanzkonten-Informationsaustauschgesetz (FKAustG) angewiesen ist,
                        Steuerinformationen über Kunden an zuständige Ämter weiterzuleiten, bitten wir Sie,
                        nachfolgende Informationen vollständig und wahrheitsgemäß zu beantworten.
                    </div>
                    <ul>
                        <li>
                            <div className="investment-plan__subtitle">
                                Bitte geben Sie Ihre Steueridentifikationsinformationen ein:
                            </div>
                            <div className="investment-plan__field-data">
                                <div className="investment-plan__select size3">
                                    <Select
                                        className={`${(errorMessage && !this.state.maritalStatus) && "not-filled"}`}
                                        dropdownClassName="ip-land"
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Land der steuerlichen Ansässigkeit"
                                        optionFilterProp="children"
                                        value={this.state.landTaxResidency}
                                        onChange={this.onChangeSelect('landTaxResidency')}
                                        maxTagCount={3}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {landTaxResidencyChoices.map((value, i) => {
                                            return <Option
                                                className="investment-plan__option"
                                                value={i + 1}
                                                key={i + 1}
                                            >
                                                {value}
                                            </Option>
                                        })}
                                    </Select>
                                </div>
                                <div className="investment-plan__input size1">
                                    <MaskedInput
                                        mask={
                                            [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
                                        }
                                        className={`${(errorMessage && !this.state.capital) && "not-filled"} ant-input`}
                                        placeholder="Steueridentifikationsnummer (TIN) &sup1;"
                                        guide={false}
                                        value={this.state.taxID}
                                        onChange={this.onChange('taxID')}
                                    />
                                </div>
                            </div>

                            <p>&sup1; Sofern das Land Ihrer steuerlichen Ansässigkeit keine Steueridentifikationsnummer
                                vergibt,
                                tragen Sie eine „0“ ein. </p>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Ich unterliege der US-Steuerpflicht:
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('UStaxLiability')}
                                    value={this.state.UStaxLiability || false}
                                >
                                    <RadioButton value={true}>Ja</RadioButton>
                                    <RadioButton value={false}>Nein</RadioButton>
                                </RadioGroup>
                            </div>
                        </li>
                    </ul>
                    {UStaxLiability &&
                    <div className="investment-plan__error">
                        Leider sind unsere Dienstleistungen zur Zeit nicht für US-amerikanische Staatsbürger oder
                        US-Steuerpflichtige verfügbar. Wir bitten um Entschuldigung. Registrieren Sie beispielsweise
                        Ihre Ehepartner(in) oder Ihre Lebenspartner(in), sofern diese Einschränkungen nicht auf
                        Sie / Ihn zutreffen. Ein Fortfahren unter den aktuellen Angaben ist leider nicht möglich
                    </div>
                    }
                    {errorMessage &&
                    <div className="investment-plan__error">
                        Alle hier gestellten Fragen sind Pflichtangaben.
                        Bitte füllen Sie alle Punkte sorgfältig aus.
                    </div>
                    }
                    {validationOnBE &&
                    <div className="investment-plan__error">
                        {validationOnBE}
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

IpStep71.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep71);