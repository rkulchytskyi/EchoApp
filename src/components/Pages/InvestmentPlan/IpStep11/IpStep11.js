import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep11 extends Component {
    constructor(props) {
        super(props);
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }
    
    previousStep(){
        return () => {
            const {
                configActions,
                investmentPlanProgressBar
            } = this.props;
            
            // Collect IP data in Redux
            let data = {
                currentStep: 'overview_2'
            };
            
            configActions.collectInvestmentPlanData(data);
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar - (25 / 2));
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
                currentStep: 'identifikation_2'
            };
            
            configActions.collectInvestmentPlanData(data);
            configActions.setInvestmentPlanProgressBar(investmentPlanProgressBar + (25 / 2));
        }
    }
    
    render(){
        return (
            <div className="investment-plan__content">
                <div className="investment-plan__title">Identifikation (1/2)</div>
                <div className="investment-plan__subline">
                    Gemäß Geldwäschegesetz (GwG) sind Finanzunternehmen dazu verpflichtet, die Identität Ihrer
                    Kunden zu überprüfen.
                </div>
                <div className="investment-plan__order">
                    <div className="investment-plan__order_item">
                        <div className="investment-plan__order_block">
                            <div className="investment-plan__order_icon">
                                <img src="img/170805_Radenbrock_Icons_4_Identifikation_1.svg" alt=""/>
                            </div>
                            <div className="investment-plan__order_title">
                                <span>1</span> VORBEREITUNG
                            </div>
                        </div>
                        <div className="investment-plan__order_text">Halten Sie Ihren Personal-ausweis oder Reisepass
                            bereit. Begeben Sie sich an einen ruhigen,
                            gut ausge-leuchteten Ort ohne das Beisein Dritter. </div>
                    </div>
                    <div className="investment-plan__order_item">
                        <div className="investment-plan__order_block">
                            <div className="investment-plan__order_icon">
                                <img src="img/170805_Radenbrock_Icons_Video_Ident.svg" alt=""/>
                            </div>
                            <div className="investment-plan__order_title">
                                <span>2</span> IDENTIFIKATION
                            </div>
                        </div>
                        <div className="investment-plan__order_text">Sie erhalten eine SMS zur Applikation des
                            Identifikationsanbieters. Bitte folgen Sie den dortigen Anweisungen. </div>
                    </div>
                    <div className="investment-plan__order_item">
                        <div className="investment-plan__order_block">
                            <div className="investment-plan__order_icon">
                                <img src="img/170805_Radenbrock_Icons_3_Konto_1.svg" alt=""/>
                            </div>
                            <div className="investment-plan__order_title">
                                <span>3</span> UNTERZEICHNUNG
                            </div>
                        </div>
                        <div className="investment-plan__order_text">Durch Ihre Zustimmung während des
                            Identifikations-verfahrens gilt der Vertrag als bindend geschlossen -
                            ganz ohne „Papierkram“. </div>
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
        )
    };
}

IpStep11.propTypes = {
    configActions: PropTypes.object.isRequired,
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
        configActions: bindActionCreators(configActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpStep11);