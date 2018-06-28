import React, {Component} from 'react';
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep12 extends Component {
    constructor(props) {
        super(props);

        const {
            smsVerificationCode
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            smsVerificationCode,
            errorMessage: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
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
                currentStep: 'identifikation_1'
            };
            
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
            
            const {
                smsVerificationCode
            } = this.state;
            
            const {
                configActions
            } = this.props;
            
            // Collect IP data in Redux
            const data = {
                currentStep: 'identifikation_3',
                smsVerificationCode
            };
            
            if(!data.smsVerificationCode) {
                this.setState({
                    errorMessage: true
                });
                return false;
            } else {
                this.setState({
                    errorMessage: false
                });
            }
            
            configActions.collectInvestmentPlanData(data);
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
        
        const {errorMessage, smsVerificationCode} = this.state;
        
        return (
            <div className="investment-plan__content">
                <div className="investment-plan__title">Identifikation (2/2)</div>
                <div className="investment-plan__subline">
                    Gemäß Geldwäschegesetz (GwG) sind Finanzunternehmen dazu verpflichtet,
                    die Identität Ihrer Kunden zu überprüfen.
                </div>
                <div className="investment-plan__sms-info">
                    Wir haben Ihnen eine SMS mit allen weiteren Anweisungen zukommen lassen. Bitte haben Sie 1-2
                    Minuten Geduld, falls Sie noch keine Nachricht erhalten haben. Folgen Sie den darin aufgeführten
                    Anweisungen und geben Sie nach erfolgreich abgeschlossener Identifikation Ihren individuellen
                    Bestätigungscode in das nachfolgende Feld ein.
                </div>
                <div className="investment-plan__input sms-verify">
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                        className={`${(errorMessage && !smsVerificationCode) && "not-filled"} ant-input`}
                        placeholder="Bestötigungscode eingeben"
                        guide={false}
                        value={smsVerificationCode}
                        onChange={this.onChange('smsVerificationCode')}
                    />
                </div>
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
        )
        
    };
}

IpStep12.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep12);