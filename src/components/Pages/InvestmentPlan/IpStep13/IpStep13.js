import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep13 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            errorMessage: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    previousStep(){
        return () => {
            const {
                configActions
            } = this.props;
            
            // Collect IP data in Redux
            let data = {
                currentStep: 'identifikation_2'
            };
            
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
            this.setState({ isDashboard: true })
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

        const {isDashboard} = this.state;

        if(isDashboard) return <Redirect to="/dashboard" />;
        
        return (
            <div className="investment-plan__content">
                <div className="investment-plan__title">Herzlichen Glückwunsch!</div>
                <div className="investment-plan__subline">
                    Wir freuen uns, Sie als offiziellen Kunden der DonauCapital begrüßen zu dürfen. Alle Informationen
                    sowie weiterführende Schritte erhalten Sie in einer zusammenfassenden E-Mail.
                </div>
                <div className="investment-plan__sms-info">
                    Jetzt liegt es an Ihnen - überweisen Sie den zu verwaltenden Betrag an Ihr neues Handelskonto der
                    Baader Bank AG. Alle Details hierzu erhalten Sie in einer E-Mail. Natürlich können Sie sich
                    jedoch bereits jetzt mit dem „Dashboard“, der Übersichts-Seite für Ihre Vermögensentwicklung.
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

IpStep13.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep13);