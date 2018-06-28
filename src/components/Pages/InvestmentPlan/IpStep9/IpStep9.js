import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Popover, Button } from 'antd';

import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';

import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Allocation from '../../../Constructor/Charts/Allocation';
import Loader from '../../../Constructor/Loader/Loader';
import * as filesActions from "../../../../actions/filesActions";
import request from "../../../../httpConfig";

class IpStep9 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            errorMessage: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.getCustomerData = this.getCustomerData.bind(this);

        request.interceptors.response.use(undefined, event => {
            // Do something with response error
            if(event.response && event.response.status) {
                this.setState({
                    statusCode: event.response.status
                })
            }

            // Trow errr again (may be need for some other catch)
            return Promise.reject(event);
        });
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
        const {filesActions, configActions} = this.props;
        this.setState({spin: true});
        setTimeout(() => {
            this.setState({spin: false});
        }, 8000);

        filesActions.pullCustomerDataS7()
            .then(res => {
                this.setState({
                    managementFee: res.management_fee,
                    performanceFee: res.performance_fee,
                    riskLevel: res.risk_level,
                    strategyDescription: res.strategy_description,
                    weightingBonds: res.weighting_bonds,
                    weightingDerivatives: res.weighting_derivatives,
                    weightingOther: res.weighting_other,
                    weightingStocks: res.weighting_stocks,
                    advisorName: `${res.first_name + ' ' + res.last_name}`
                });

                console.log(res);
            })
            .catch(e => {
                const {statusCode} = this.state;
                if (statusCode === 406) {
                    const data = {
                        currentStep: 'overview_1_before',
                    };
                    configActions.collectInvestmentPlanData(data);
                }
            });
    }
    
    previousStep(){
        return () => {
            const {
                configActions,
                investmentPlanProgressBar
            } = this.props;
            
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar - (25 / 2));
            
            // Collect IP data in Redux
            let data = {
                currentStep: 'questionnaire_7'
            };
            
            configActions.collectInvestmentPlanData(data);
        }
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
    
    onChange(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            })
        }
    }
    
    
    render(){
        let {windowWidth, spin, managementFee, performanceFee, riskLevel, strategyDescription, weightingBonds,
            weightingDerivatives, weightingOther, weightingStocks, advisorName} = this.state;
        
        windowWidth = windowWidth || window.innerWidth;
        
        // Change menu layout on width size
        const isIPad = windowWidth <= 1366;

        const dataChart = {
            weightingDerivatives,
            weightingStocks,
            weightingBonds,
            weightingOther
        };
        
        const content = (
            <div className="ip-popover__content">
                <h4>HINWEIS</h4>
                <p>Die Managementgebühr berechnet sich jährlich zum Stichtag der Handelsaufnahme in Ihrem Depot auf
                    Basis angelegter Vermögenswerte und wird anteilig quartalsweise abgerechnet.
                    Die Performancegebühr bezieht sich lediglich auf die erwirtschaftete Rendite Ihres Portfolios
                    und wird ebenfalls quartalsweise auf Basis des High-Watermark-Prinzips abgerechnet.
                    Nähere Informationen hierzu erhalten Sie im Dokument Honorarvereinbarung. </p>
            </div>
        );
        
        return (
            <div className="investment-plan__content">
                {spin &&
                <div className="spin-active">
                    <div className="spin__advanced">
                        <div className="spin__advanced_loader">
                            <Loader />
                        </div>
                        <div className="loader__content">
                            <div className="loader-title">Einen Moment bitte… </div>
                            <p className="loader-text">Wir überprüfen, ob Ihre Angaben mit <br/>
                                dem Risikoprofil des ausgewählten <br/>
                                Advsiors vereinbar sind.</p>
                        </div>
                    </div>

                </div>
                }
                {!spin &&
                <div>
                    <div className="investment-plan__title">Übersicht</div>
                    <div className="investment-plan__subline">
                        Aufbauend auf der von Ihnen getroffenen Auswahl sieht DonauCapital Sie als geeigneten Kunden für
                        die Anlagestrategie „Managed Options Plus“ in Zusammenarbeit mit {advisorName} an.
                    </div>
                    <div className="overview__content">
                        <div className="overview__part">
                            <div className="investment-plan__subtitle">
                                Portfoliostrukturierung:
                            </div>
                            <div className="chart-place">
                                <Allocation
                                    dataChart={dataChart}
                                />
                            </div>

                        </div>
                        <div className="overview__part">
                            <div className="investment-plan__subtitle">
                                Strategiebeschreibung:
                            </div>
                            <p>
                                {strategyDescription}
                            </p>
                        </div>
                        <div className="overview__part">
                            <div className="investment-plan__subtitle">
                                Risikoeinschätzung:
                            </div>
                            <div className="overview__risk">
                                <div className="overview__risk_lvl">
                                    <div className={`${(riskLevel === 1) && 'active'} overview__risk_item`}>1</div>
                                    <div className={`${(riskLevel === 2) && 'active'} overview__risk_item`}>2</div>
                                    <div className={`${(riskLevel === 3) && 'active'} overview__risk_item`}>3</div>
                                    <div className={`${(riskLevel === 4) && 'active'} overview__risk_item`}>4</div>
                                    <div className={`${(riskLevel === 5) && 'active'} overview__risk_item`}>5</div>
                                    <div className={`${(riskLevel === 6) && 'active'} overview__risk_item`}>6</div>
                                    <div className={`${(riskLevel === 7) && 'active'} overview__risk_item`}>7</div>
                                </div>
                                <div className="overview__risk_status">
                                    <span>Gering</span>
                                    <span>Spekulativ</span>
                                </div>
                            </div>
                        </div>
                        <div className="overview__part">
                            <div className="investment-plan__subtitle">
                                Gebührenstruktur:
                                <div className="ip-info">
                                    <Popover
                                        content={content}
                                        placement="topRight"
                                        trigger={`${isIPad ? 'click' : 'hover'}`}
                                        overlayClassName="ip-popover"

                                    >
                                        <Button>i</Button>
                                    </Popover>
                                </div>
                            </div>
                            <div className="overview__fee-structure">
                                <div className="overview__fee-structure_item"><span>{managementFee} %</span>
                                    Managementgebühr</div>
                                <div className="overview__fee-structure_item"><span>{performanceFee} %</span>
                                    Performancegebühr
                                </div>
                            </div>
                        </div>
                    </div>
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

IpStep9.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep9);