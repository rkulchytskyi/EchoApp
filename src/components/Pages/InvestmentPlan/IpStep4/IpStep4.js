import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Select, Radio, Spin } from 'antd';
import 'antd/lib/select/style/index.css';
import 'antd/lib/radio/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep4 extends Component {
    constructor(props) {
        super(props);

        const {
            cashAssets,
            securityAssets,
            realEstateAseets,
            otherAssets,
            currentObligationsPerMonth,
            freeMonthlyLiquidity,
            netAssets
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            cashAssets,
            securityAssets,
            realEstateAseets,
            otherAssets,
            currentObligationsPerMonth,
            freeMonthlyLiquidity,
            netAssets,
            choices1: [],
            choices2: [],
            choices3: [],
            choices4: [],
            choices5: [],
            choices6: [],
            choices7: [],
            errorMessage: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
    }

    // React lifecycle
    componentDidMount(){
        this.getQuestionnaire();
    }

    getQuestionnaire(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.getQuestionnaireData(4)
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'cash_assets':
                            if(item.value){
                                this.setState({
                                    cashAssets: item.value
                                })
                            }

                            const arr1 = [];
                            let obj1 = item.choices;

                            for (let key in obj1){
                                arr1.push(obj1[key]);
                            }

                            this.setState({ choices1: arr1 });

                            break;
                        case 'security_assets':
                            if(item.value){
                                this.setState({
                                    securityAssets: item.value
                                })
                            }

                            const arr2 = [];
                            let obj2 = item.choices;

                            for (let key in obj2){
                                arr2.push(obj2[key]);
                            }

                            this.setState({ choices2: arr2 });

                            break;

                        case 'real_estate_assets':
                            if(item.value){
                                this.setState({
                                    realEstateAseets: item.value
                                })
                            }

                            const arr3 = [];
                            let obj3 = item.choices;

                            for (let key in obj3){
                                arr3.push(obj3[key]);
                            }

                            this.setState({ choices3: arr3 });

                            break;

                        case 'other_assets':
                            if(item.value){
                                this.setState({
                                    otherAssets: item.value
                                })
                            }

                            const arr4 = [];
                            let obj4 = item.choices;

                            for (let key in obj4){
                                arr4.push(obj4[key]);
                            }

                            this.setState({ choices4: arr4 });

                            break;

                        case 'financial_obligations':
                            if(item.value){
                                this.setState({
                                    currentObligationsPerMonth: item.value
                                })
                            }

                            const arr5 = [];
                            let obj5 = item.choices;

                            for (let key in obj5){
                                arr5.push(obj5[key]);
                            }

                            this.setState({ choices5: arr5 });

                            break;

                        case 'liquidity':
                            if(item.value){
                                this.setState({
                                    freeMonthlyLiquidity: item.value
                                })
                            }

                            const arr6 = [];
                            let obj6 = item.choices;

                            for (let key in obj6){
                                arr6.push(obj6[key]);
                            }

                            this.setState({ choices6: arr6 });

                            break;

                        case 'net_assets':
                            if(item.value){
                                this.setState({
                                    netAssets: item.value
                                })
                            }

                            const arr7 = [];
                            let obj7 = item.choices;

                            for (let key in obj7){
                                arr7.push(obj7[key]);
                            }

                            this.setState({ choices7: arr7 });

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
                currentStep: 'questionnaire_2'
            };
        
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
        
            const {
                cashAssets,
                securityAssets,
                realEstateAseets,
                otherAssets,
                currentObligationsPerMonth,
                freeMonthlyLiquidity,
                netAssets
            } = this.state;
        
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;
        
            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_4',
                cashAssets,
                securityAssets,
                realEstateAseets,
                otherAssets,
                currentObligationsPerMonth,
                freeMonthlyLiquidity,
                netAssets
            };
        
            if(!data.cashAssets
                || !data.securityAssets
                || !data.realEstateAseets
                || !data.otherAssets
                || !data.currentObligationsPerMonth
                || !data.freeMonthlyLiquidity
                || !data.netAssets) {
            
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
                cash_assets: cashAssets,
                security_assets: securityAssets,
                real_estate_assets: realEstateAseets,
                other_assets: otherAssets,
                financial_obligations: currentObligationsPerMonth,
                liquidity: freeMonthlyLiquidity,
                net_assets: netAssets
            };

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.postQuestionnaireData(dataJSON, 4)
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
    
    onChangeSelect(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }
    
    render(){
    
        const Option = Select.Option;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        
        const {
            errorMessage, choices1, choices2, choices3, choices4, choices5, choices6, choices7, spin
        } = this.state;
        
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
                                Höhe der derzeitigen Vermögenswerte
                            </div>
                            <div className="investment-plan__selects">
                                <div className="investment-plan__select investment-plan__selects_item">
                                    <div>
                                        Barvermögen
                                    </div>
                                    <Select
                                        className={`${(errorMessage && !this.state.cashAssets) && "not-filled"}`}
                                        dropdownClassName="ip-land"
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Wähle eine Option"
                                        optionFilterProp="children"
                                        value={this.state.cashAssets}
                                        onChange={this.onChangeSelect('cashAssets')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {choices1.map((value, i) => {
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
                                <div className="investment-plan__select investment-plan__selects_item">
                                    <div>
                                        Wertpapiervermögen
                                    </div>
                                    <Select
                                        className={`${(errorMessage && !this.state.cashAssets) && "not-filled"}`}
                                        dropdownClassName="ip-land"
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Wähle eine Option"
                                        optionFilterProp="children"
                                        value={this.state.securityAssets}
                                        onChange={this.onChangeSelect('securityAssets')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {choices2.map((value, i) => {
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
                                <div className="investment-plan__select investment-plan__selects_item">
                                    <div>
                                        Immobilienvermögen (Netto)
                                    </div>
                                    <Select
                                        className={`${(errorMessage && !this.state.cashAssets) && "not-filled"}`}
                                        dropdownClassName="ip-land"
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Wähle eine Option"
                                        optionFilterProp="children"
                                        value={this.state.realEstateAseets}
                                        onChange={this.onChangeSelect('realEstateAseets')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {choices3.map((value, i) => {
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
                                <div className="investment-plan__select investment-plan__selects_item">
                                    <div>
                                        Sonstige Vermögenswerte (z.B. Beteiligungen)
                                    </div>
                                    <Select
                                        className={`${(errorMessage && !this.state.cashAssets) && "not-filled"}`}
                                        dropdownClassName="ip-land"
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Wähle eine Option"
                                        optionFilterProp="children"
                                        value={this.state.otherAssets}
                                        onChange={this.onChangeSelect('otherAssets')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {choices4.map((value, i) => {
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
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Höhe der laufenden finanziellen Verpflichtungen pro Monat
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('currentObligationsPerMonth')}
                                    value={this.state.currentObligationsPerMonth}
                                >
                                    {choices5.map((value, i) => {
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
                                Freie monatlich Liquidität (monatliche Einkünfte abzgl. Ausgaben)
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('freeMonthlyLiquidity')}
                                    value={this.state.freeMonthlyLiquidity}
                                >
                                    {choices6.map((value, i) => {
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
                                Höhe des Nettovermögens (Vermögen abzüglich Verbindlichkeiten)
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('netAssets')}
                                    value={this.state.netAssets}
                                >
                                    {choices7.map((value, i) => {
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

IpStep4.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep4);