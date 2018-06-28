import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Popover, Button } from 'antd';
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';

import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep10 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            errorMessage: false,
            termsAndConditions: false,
            reviewedDocuments: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
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
                currentStep: 'overview_1'
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
            
            const {
                termsAndConditions,
                reviewedDocuments
            } = this.state;
            
            // Collect IP data in Redux
            const data = {
                currentStep: 'identifikation_1',
            };
            
            if(!termsAndConditions || !reviewedDocuments) {
                this.setState({
                    errorMessage: true
                });
                return false;
            }
            
            
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
        
        let {windowWidth, termsAndConditions, reviewedDocuments, errorMessage} = this.state;
        
        windowWidth = windowWidth || window.innerWidth;
        
        // Change menu layout on width size
        const isIPad = windowWidth <= 1366;
        
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
                <div className="investment-plan__title">Vertragsunterlagen</div>
                <div className="investment-plan__subline">
                    Nachfolgend finden Sie alle Vertrags- sowie Informationsunterlagen,
                    welche für ein Vermögensverwaltungsmandat mit DonauCapital notwendig sind.
                    Bitten lesen Sie sich diese sorgfältig durch.
                </div>
                <div className="overview__content">
                    <div className="overview__part">
                        <div className="investment-plan__subtitle">
                            Dokumente:
                            <div className="ip-info">
                                <Popover
                                    content={content}
                                    placement="bottomRight"
                                    trigger={`${isIPad ? 'click' : 'hover'}`}
                                    overlayClassName="ip-popover"
                                
                                >
                                    <Button>i</Button>
                                </Popover>
                            </div>
                        </div>
                        <div className="document-list">
                            <ul>
                                <li>1. Honorarvereinbarung</li>
                                <li>2. Anlagerichtlinien</li>
                                <li>3. Vermögensverwaltungsvertrag</li>
                                <li>4. Übersicht WpHG-Fragebogen</li>
                                <li>5. Risikoinformationen</li>
                                <li>6. Allgemeine Geschäftsbedingungen</li>
                            </ul>
                        </div>
                        <div className="download-btns">
                            <a
                                href="pdf/170329_Radenbrock_Salesfolder_B2C.pdf"
                                target="_blank"
                            >
                                <span>Alle Herunterladen</span>
                            </a>
                            <a href="pdf/Muster_AG_Wertpapierprospekt_1.pdf"
                               target="_blank"
                            >
                                <span>Alle Drucken</span>
                            </a>
                        </div>
                    </div>
                    <div className="overview__part">
                        <div className="investment-plan__subtitle">
                            Wie geht es weiter?
                        </div>
                        <p>
                            Im Anschluss wird Ihre Identität verifiziert und das Vertragsverhältnis tritt durch eine
                            Qualitative Elektronische Signatur (QES) im Rahmen eines Video-Chats in Kraft.
                        </p>
                        <div className="terms-and-conditions">
                            <div className="terms-and-conditions__item">
                                <button
                                    className={`${termsAndConditions ? 'active' : ''}`}
                                    onClick={() => this.setState({
                                        termsAndConditions: !termsAndConditions
                                    })}
                                >
                                    Ja
                                </button>
                                <span>Ich akzeptiere die Allgemeinen Geschäftsbedingungen (AGBs). </span>
                            </div>
                            <div className="terms-and-conditions__item">
                                <button
                                    className={`${reviewedDocuments ? 'active' : ''}`}
                                    onClick={() => this.setState({
                                        reviewedDocuments: !reviewedDocuments
                                    })}
                                >
                                    Ja
                                </button>
                                <span>Ich habe alle Unterlagen überprüft und akzeptiere die Bedinungen des
                                    Vermögens-verwaltungsvertrages.</span>
                            </div>
                        
                        </div>
                    </div>
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

IpStep10.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep10);