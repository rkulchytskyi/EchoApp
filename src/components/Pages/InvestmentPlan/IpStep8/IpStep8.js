import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Select, Radio, Spin } from 'antd';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/es/spin/style/index.css';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filesActions from "../../../../actions/filesActions";

class IpStep8 extends Component {
    constructor(props) {
        super(props);
    
        const {
            stocksBondsIndicesWithoutLeveragePersonal,
            stocksBondsIndicesWithoutLeverageTradeVolumeExecuted,
            stocksBondsIndicesWithoutLeverageTradeNumber,
            ETCWithoutLeveragePersonal,
            ETCWithoutLeverageTradeVolumeExecuted,
            ETCWithoutLeverageTradeNumber,
            interestBearingSecuritiesWithIncreasedRiskStructurePersonal,
            interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted,
            interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber,
            sharesEquityFundsMixedFundsCertificatesPersonal,
            sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted,
            sharesEquityFundsMixedFundsCertificatesTradeNumber,
            structuredSecuritiesCertificatesPersonal,
            structuredSecuritiesCertificatesTradeVolumeExecuted,
            structuredSecuritiesCertificatesTradeNumber,
            warrantsOptionsFuturesPersonal,
            warrantsOptionsFuturesTradeVolumeExecuted,
            warrantsOptionsFuturesTradeNumber,
            alternativeInvestmentsPersonal,
            alternativeInvestmentsTradeVolumeExecuted,
            alternativeInvestmentsTradeNumber,
            speculativeFinancialInstrumentsPersonal,
            speculativeFinancialInstrumentsTradeVolumeExecuted,
            speculativeFinancialInstrumentsTradeNumber,
            experienceInCurrencyTransactions,
            transactionsInFinancialInstruments
        } = props.investmentPlanData;
        
        this.state = {
            ...props.investmentPlanData,
            errorMessage: false,
            stocksBondsIndicesWithoutLeveragePersonal,
            stocksBondsIndicesWithoutLeverageTradeVolumeExecuted,
            stocksBondsIndicesWithoutLeverageTradeNumber,
            ETCWithoutLeveragePersonal,
            ETCWithoutLeverageTradeVolumeExecuted,
            ETCWithoutLeverageTradeNumber,
            interestBearingSecuritiesWithIncreasedRiskStructurePersonal,
            interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted,
            interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber,
            sharesEquityFundsMixedFundsCertificatesPersonal,
            sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted,
            sharesEquityFundsMixedFundsCertificatesTradeNumber,
            structuredSecuritiesCertificatesPersonal,
            structuredSecuritiesCertificatesTradeVolumeExecuted,
            structuredSecuritiesCertificatesTradeNumber,
            warrantsOptionsFuturesPersonal,
            warrantsOptionsFuturesTradeVolumeExecuted,
            warrantsOptionsFuturesTradeNumber,
            alternativeInvestmentsPersonal,
            alternativeInvestmentsTradeVolumeExecuted,
            alternativeInvestmentsTradeNumber,
            speculativeFinancialInstrumentsPersonal,
            speculativeFinancialInstrumentsTradeVolumeExecuted,
            speculativeFinancialInstrumentsTradeNumber,
            experienceInCurrencyTransactions,
            transactionsInFinancialInstruments,
            personalKnowledge: [],
            tradeNumber: [],
            tradeVolume: []
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
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
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

    getCustomerData(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.pullCustomerDataS6()
            .then(res => {
                const personalKnowledge = [];
                const tradeNumber = [];
                const tradeVolume = [];

                const personalKnowledgeObj = res.experience_choices.personal_knowledge;
                const tradeNumberObj = res.experience_choices.trade_number;
                const tradeVolumeObj = res.experience_choices.trade_volume;

                for (let key in personalKnowledgeObj){
                    personalKnowledge.push(personalKnowledgeObj[key]);
                }

                for (let key in tradeNumberObj){
                    tradeNumber.push(tradeNumberObj[key]);
                }

                for (let key in tradeVolumeObj){
                    tradeVolume.push(tradeVolumeObj[key]);
                }

                this.setState({
                    experienceInCurrencyTransactions: res.fct_experience,
                    transactionsInFinancialInstruments: res.loan_transactions,
                    personalKnowledge,
                    tradeNumber,
                    tradeVolume
                });

                res.products.forEach((item, i) => {
                    switch (item.id) {
                        case 1:
                            if (item.description) {
                                this.setState({stocksBondsIndicesWithoutLeverageTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({
                                    stocksBondsIndicesWithoutLeveragePersonal: item.customer_experience.personal_knowledge
                                });
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({stocksBondsIndicesWithoutLeverageTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({stocksBondsIndicesWithoutLeverageTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 2:
                            if (item.description) {
                                this.setState({ETCWithoutLeverageTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({ETCWithoutLeveragePersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({ETCWithoutLeverageTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({ETCWithoutLeverageTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 3:
                            if (item.description) {
                                this.setState({interestBearingSecuritiesWithIncreasedRiskStructureTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({interestBearingSecuritiesWithIncreasedRiskStructurePersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 4:
                            if (item.description) {
                                this.setState({sharesEquityFundsMixedFundsCertificatesTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({sharesEquityFundsMixedFundsCertificatesPersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({sharesEquityFundsMixedFundsCertificatesTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 5:
                            if (item.description) {
                                this.setState({structuredSecuritiesCertificatesTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({structuredSecuritiesCertificatesPersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({structuredSecuritiesCertificatesTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({structuredSecuritiesCertificatesTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 6:
                            if (item.description) {
                                this.setState({warrantsOptionsFuturesTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({warrantsOptionsFuturesPersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({warrantsOptionsFuturesTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({warrantsOptionsFuturesTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 7:
                            if (item.description) {
                                this.setState({alternativeInvestmentsTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({alternativeInvestmentsPersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({alternativeInvestmentsTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({alternativeInvestmentsTradeNumber: item.customer_experience.trade_number});
                            }

                            break;
                        case 8:
                            if (item.description) {
                                this.setState({speculativeFinancialInstrumentsTitle: item.description});
                            }

                            if (item.customer_experience && item.customer_experience && item.customer_experience.personal_knowledge) {
                                this.setState({speculativeFinancialInstrumentsPersonal: item.customer_experience.personal_knowledge});
                            }

                            if (item.customer_experience && item.customer_experience.trade_volume) {
                                this.setState({speculativeFinancialInstrumentsTradeVolumeExecuted: item.customer_experience.trade_volume});
                            }

                            if (item.customer_experience && item.customer_experience.trade_number) {
                                this.setState({speculativeFinancialInstrumentsTradeNumber: item.customer_experience.trade_number});
                            }

                            break;

                        default:
                            return;
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
    
    previousStep(){
        return () => {
            const {
                configActions,
                investmentPlanProgressBar,
                investmentPlanData
            } = this.props;
            
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar - (25 / 7));
            
            // Collect IP data in Redux
            let data = {};
            
            if(investmentPlanData.personalType === 'Privatkunde') {
                data.currentStep = 'questionnaire_6_1';
            } else {
                data.currentStep = 'questionnaire_6';
            }
            
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
            
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;
            
            const {
                stocksBondsIndicesWithoutLeveragePersonal,
                stocksBondsIndicesWithoutLeverageTradeVolumeExecuted,
                stocksBondsIndicesWithoutLeverageTradeNumber,
                ETCWithoutLeveragePersonal,
                ETCWithoutLeverageTradeVolumeExecuted,
                ETCWithoutLeverageTradeNumber,
                interestBearingSecuritiesWithIncreasedRiskStructurePersonal,
                interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted,
                interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber,
                sharesEquityFundsMixedFundsCertificatesPersonal,
                sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted,
                sharesEquityFundsMixedFundsCertificatesTradeNumber,
                structuredSecuritiesCertificatesPersonal,
                structuredSecuritiesCertificatesTradeVolumeExecuted,
                structuredSecuritiesCertificatesTradeNumber,
                warrantsOptionsFuturesPersonal,
                warrantsOptionsFuturesTradeVolumeExecuted,
                warrantsOptionsFuturesTradeNumber,
                alternativeInvestmentsPersonal,
                alternativeInvestmentsTradeVolumeExecuted,
                alternativeInvestmentsTradeNumber,
                speculativeFinancialInstrumentsPersonal,
                speculativeFinancialInstrumentsTradeVolumeExecuted,
                speculativeFinancialInstrumentsTradeNumber,
                experienceInCurrencyTransactions,
                transactionsInFinancialInstruments
            } = this.state;
            
            // Collect IP data in Redux
            const data = {
                currentStep: 'overview_1',
                stocksBondsIndicesWithoutLeveragePersonal,
                stocksBondsIndicesWithoutLeverageTradeVolumeExecuted,
                stocksBondsIndicesWithoutLeverageTradeNumber,
                ETCWithoutLeveragePersonal,
                ETCWithoutLeverageTradeVolumeExecuted,
                ETCWithoutLeverageTradeNumber,
                interestBearingSecuritiesWithIncreasedRiskStructurePersonal,
                interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted,
                interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber,
                sharesEquityFundsMixedFundsCertificatesPersonal,
                sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted,
                sharesEquityFundsMixedFundsCertificatesTradeNumber,
                structuredSecuritiesCertificatesPersonal,
                structuredSecuritiesCertificatesTradeVolumeExecuted,
                structuredSecuritiesCertificatesTradeNumber,
                warrantsOptionsFuturesPersonal,
                warrantsOptionsFuturesTradeVolumeExecuted,
                warrantsOptionsFuturesTradeNumber,
                alternativeInvestmentsPersonal,
                alternativeInvestmentsTradeVolumeExecuted,
                alternativeInvestmentsTradeNumber,
                speculativeFinancialInstrumentsPersonal,
                speculativeFinancialInstrumentsTradeVolumeExecuted,
                speculativeFinancialInstrumentsTradeNumber,
                experienceInCurrencyTransactions,
                transactionsInFinancialInstruments
            };
    
            if(!data.stocksBondsIndicesWithoutLeveragePersonal
                || !data.stocksBondsIndicesWithoutLeverageTradeVolumeExecuted
                || !data.stocksBondsIndicesWithoutLeverageTradeNumber
                || !data.ETCWithoutLeveragePersonal
                || !data.ETCWithoutLeverageTradeVolumeExecuted
                || !data.ETCWithoutLeverageTradeNumber
                || !data.interestBearingSecuritiesWithIncreasedRiskStructurePersonal
                || !data.interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted
                || !data.interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber
                || !data.sharesEquityFundsMixedFundsCertificatesPersonal
                || !data.sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted
                || !data.sharesEquityFundsMixedFundsCertificatesTradeNumber
                || !data.structuredSecuritiesCertificatesPersonal
                || !data.structuredSecuritiesCertificatesTradeVolumeExecuted
                || !data.structuredSecuritiesCertificatesTradeNumber
                || !data.warrantsOptionsFuturesPersonal
                || !data.warrantsOptionsFuturesTradeVolumeExecuted
                || !data.warrantsOptionsFuturesTradeNumber
                || !data.alternativeInvestmentsPersonal
                || !data.alternativeInvestmentsTradeVolumeExecuted
                || !data.alternativeInvestmentsTradeNumber
                || !data.speculativeFinancialInstrumentsPersonal
                || !data.speculativeFinancialInstrumentsTradeVolumeExecuted
                || !data.speculativeFinancialInstrumentsTradeNumber
                || (data.experienceInCurrencyTransactions === undefined)
                || (data.transactionsInFinancialInstruments === undefined)
            ) {
        
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
                fct_experience: experienceInCurrencyTransactions,
                loan_transactions: transactionsInFinancialInstruments,
                product_list: [
                    {
                        product: 1,
                        personal_knowledge: stocksBondsIndicesWithoutLeveragePersonal,
                        trade_volume: stocksBondsIndicesWithoutLeverageTradeVolumeExecuted,
                        trade_number: stocksBondsIndicesWithoutLeverageTradeNumber
                    },
                    {
                        product: 2,
                        personal_knowledge: ETCWithoutLeveragePersonal,
                        trade_volume: ETCWithoutLeverageTradeVolumeExecuted,
                        trade_number: ETCWithoutLeverageTradeNumber
                    },
                    {
                        product: 3,
                        personal_knowledge: interestBearingSecuritiesWithIncreasedRiskStructurePersonal,
                        trade_volume: interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted,
                        trade_number: interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber
                    },
                    {
                        product: 4,
                        personal_knowledge: sharesEquityFundsMixedFundsCertificatesPersonal,
                        trade_volume: sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted,
                        trade_number: sharesEquityFundsMixedFundsCertificatesTradeNumber
                    },
                    {
                        product: 5,
                        personal_knowledge: structuredSecuritiesCertificatesPersonal,
                        trade_volume: structuredSecuritiesCertificatesTradeVolumeExecuted,
                        trade_number: structuredSecuritiesCertificatesTradeNumber
                    },
                    {
                        product: 6,
                        personal_knowledge: warrantsOptionsFuturesPersonal,
                        trade_volume: warrantsOptionsFuturesTradeVolumeExecuted,
                        trade_number: warrantsOptionsFuturesTradeNumber
                    },
                    {
                        product: 7,
                        personal_knowledge: alternativeInvestmentsPersonal,
                        trade_volume: alternativeInvestmentsTradeVolumeExecuted,
                        trade_number: alternativeInvestmentsTradeNumber
                    },
                    {
                        product: 8,
                        personal_knowledge: speculativeFinancialInstrumentsPersonal,
                        trade_volume: speculativeFinancialInstrumentsTradeVolumeExecuted,
                        trade_number: speculativeFinancialInstrumentsTradeNumber
                    }
                ]
            };

            // Check if user selected one of Nein
            if(!data.experienceInCurrencyTransactions || !data.transactionsInFinancialInstruments){

                data.currentStep = 'overview_if_no';
                configActions.collectInvestmentPlanData(data);

                const dataJSON = JSON.stringify(dataAPI);
                filesActions.pushCustomerDataS6(dataJSON)
                    .then(res => {
                        // console.log(res);
                        configActions.collectInvestmentPlanData(data);
                    })
                    .catch(e => {
                        // console.error(e.message);
                    });
                return false;
            }

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.pushCustomerDataS6(dataJSON)
                .then(res => {
                    // console.log(res);
                    configActions.collectInvestmentPlanData(data);
                    configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar + (25 / 2));
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
    
        let {windowWidth} = this.state;
    
        windowWidth = windowWidth || window.innerWidth;
    
        // Change menu layout on width size
        const isMobile = windowWidth < 768;
    
        const Option = Select.Option;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        
        const {errorMessage, spin, personalKnowledge, tradeVolume, tradeNumber, stocksBondsIndicesWithoutLeverageTitle,
            ETCWithoutLeverageTitle, interestBearingSecuritiesWithIncreasedRiskStructureTitle,
            sharesEquityFundsMixedFundsCertificatesTitle, structuredSecuritiesCertificatesTitle,
            warrantsOptionsFuturesTitle, alternativeInvestmentsTitle, speculativeFinancialInstrumentsTitle
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
                                Wie schätzen Sie Ihre grundsätzlichen Kenntnisse sowie den Handelsumfang
                                (während der letzten 12 Monate) in folgenden Produkten ein?
                            </div>
                            {!isMobile &&
                            <div className="knowledge__titles">
                                <div className="knowledge__elements">
                                    <div className="sub-name step7-sl-1">Persönliche Kenntnisse</div>
                                    <div className="sub-name step7-sl-1">Getätigter Handelsumfang</div>
                                    <div className="sub-name step7-sl-2">Trade-Anzahl</div>
                                </div>
                            </div>
                            }

                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {stocksBondsIndicesWithoutLeverageTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage &&
                                                !this.state.stocksBondsIndicesWithoutLeveragePersonal) &&
                                                "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.stocksBondsIndicesWithoutLeveragePersonal}
                                            onChange={this.onChangeSelect('stocksBondsIndicesWithoutLeveragePersonal')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.stocksBondsIndicesWithoutLeverageTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.stocksBondsIndicesWithoutLeverageTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('stocksBondsIndicesWithoutLeverageTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage &&
                                                !this.state.stocksBondsIndicesWithoutLeverageTradeNumber) &&
                                                "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.stocksBondsIndicesWithoutLeverageTradeNumber}
                                            onChange={this.onChangeSelect('stocksBondsIndicesWithoutLeverageTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {ETCWithoutLeverageTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage &&
                                                !this.state.ETCWithoutLeveragePersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.ETCWithoutLeveragePersonal}
                                            onChange={this.onChangeSelect('ETCWithoutLeveragePersonal')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.ETCWithoutLeverageTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.ETCWithoutLeverageTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('ETCWithoutLeverageTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage &&
                                                !this.state.ETCWithoutLeverageTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.ETCWithoutLeverageTradeNumber}
                                            onChange={this.onChangeSelect('ETCWithoutLeverageTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {interestBearingSecuritiesWithIncreasedRiskStructureTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage &&
                                                !this.state.interestBearingSecuritiesWithIncreasedRiskStructurePersonal)
                                                && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.interestBearingSecuritiesWithIncreasedRiskStructurePersonal}
                                            onChange={this.onChangeSelect('interestBearingSecuritiesWithIncreasedRiskStructurePersonal')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('interestBearingSecuritiesWithIncreasedRiskStructureTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber)
                                                && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber}
                                            onChange={this.onChangeSelect('interestBearingSecuritiesWithIncreasedRiskStructureTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={
                                                (input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {sharesEquityFundsMixedFundsCertificatesTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage && !this.state.sharesEquityFundsMixedFundsCertificatesPersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.sharesEquityFundsMixedFundsCertificatesPersonal}
                                            onChange={this.onChangeSelect('sharesEquityFundsMixedFundsCertificatesPersonal')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('sharesEquityFundsMixedFundsCertificatesTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage && !this.state.sharesEquityFundsMixedFundsCertificatesTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.sharesEquityFundsMixedFundsCertificatesTradeNumber}
                                            onChange={this.onChangeSelect('sharesEquityFundsMixedFundsCertificatesTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {structuredSecuritiesCertificatesTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage && !this.state.structuredSecuritiesCertificatesPersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.structuredSecuritiesCertificatesPersonal}
                                            onChange={this.onChangeSelect('structuredSecuritiesCertificatesPersonal')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.structuredSecuritiesCertificatesTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.structuredSecuritiesCertificatesTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('structuredSecuritiesCertificatesTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage && !this.state.structuredSecuritiesCertificatesTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.structuredSecuritiesCertificatesTradeNumber}
                                            onChange={this.onChangeSelect('structuredSecuritiesCertificatesTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {warrantsOptionsFuturesTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage && !this.state.warrantsOptionsFuturesPersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.warrantsOptionsFuturesPersonal}
                                            onChange={this.onChangeSelect('warrantsOptionsFuturesPersonal')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.warrantsOptionsFuturesTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.warrantsOptionsFuturesTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('warrantsOptionsFuturesTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage && !this.state.warrantsOptionsFuturesTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.warrantsOptionsFuturesTradeNumber}
                                            onChange={this.onChangeSelect('warrantsOptionsFuturesTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {alternativeInvestmentsTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage && !this.state.alternativeInvestmentsPersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.alternativeInvestmentsPersonal}
                                            onChange={this.onChangeSelect('alternativeInvestmentsPersonal')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.alternativeInvestmentsTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.alternativeInvestmentsTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('alternativeInvestmentsTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage && !this.state.alternativeInvestmentsTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.alternativeInvestmentsTradeNumber}
                                            onChange={this.onChangeSelect('alternativeInvestmentsTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                            <div className="knowledge__item">
                                <div className="knowledge__description">
                                    {speculativeFinancialInstrumentsTitle}
                                </div>
                                <div className="knowledge__elements">
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage && !this.state.speculativeFinancialInstrumentsPersonal) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Persönliche Kenntnisse' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.speculativeFinancialInstrumentsPersonal}
                                            onChange={this.onChangeSelect('speculativeFinancialInstrumentsPersonal')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {personalKnowledge.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-1">
                                        <Select
                                            className={`${(errorMessage
                                                && !this.state.speculativeFinancialInstrumentsTradeVolumeExecuted)
                                            && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Getätigter Handelsumfang' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.speculativeFinancialInstrumentsTradeVolumeExecuted}
                                            onChange={this.onChangeSelect('speculativeFinancialInstrumentsTradeVolumeExecuted')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeVolume.map((value, i) => {
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
                                    <div className="investment-plan__select step7-sl-2">
                                        <Select
                                            className={`${(errorMessage && !this.state.speculativeFinancialInstrumentsTradeNumber) && "not-filled"}`}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder={isMobile ? 'Trade-Anzahl' : "Bitte wählen"}
                                            optionFilterProp="children"
                                            dropdownClassName="ip-land"
                                            value={this.state.speculativeFinancialInstrumentsTradeNumber}
                                            onChange={this.onChangeSelect('speculativeFinancialInstrumentsTradeNumber')}
                                            maxTagCount={3}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {tradeNumber.map((value, i) => {
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
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Haben Sie Kenntnisse und / oder Erfahrungen im Bereich von Fremdwährungsgeschäften?
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('experienceInCurrencyTransactions')}
                                    value={this.state.experienceInCurrencyTransactions}
                                >
                                    <RadioButton value={true}>Ja</RadioButton>
                                    <RadioButton value={false}>Nein</RadioButton>
                                </RadioGroup>
                            </div>
                        </li>
                        <li>
                            <div className="investment-plan__subtitle">
                                Haben Sie bisher Geschäfte in Finanzinstrumenten auf Kreditbasis getätigt?
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('transactionsInFinancialInstruments')}
                                    value={this.state.transactionsInFinancialInstruments}
                                >
                                    <RadioButton value={true}>Ja</RadioButton>
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

IpStep8.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep8);