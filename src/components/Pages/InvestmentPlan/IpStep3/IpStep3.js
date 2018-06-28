import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Radio, Popover, Button, Spin } from 'antd';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep3 extends Component {
    constructor(props) {
        super(props);

        const {
            investmentExperience,
            previouslyManagedAssets,
            securityService,
            investmentBehaviourRate
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            investmentExperience,
            previouslyManagedAssets,
            securityService,
            investmentBehaviourRate,
            choices1: [],
            choices2: [],
            choices3: [],
            choices4: [],
            errorMessage: false
        };
        
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
        this.getQuestionnaire();
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    getQuestionnaire(){
        const {filesActions} = this.props;

        this.setState({spin: true});

        filesActions.getQuestionnaireData(3)
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'investment_experience':
                            if(item.value){
                                this.setState({
                                    investmentExperience: item.value
                                })
                            }

                            const arr1 = [];
                            let obj1 = item.choices;

                            for (let key in obj1){
                                arr1.push(obj1[key]);
                            }

                            this.setState({ choices1: arr1 });

                            break;
                        case 'previously_managed_assets':
                            if(item.value){
                                this.setState({
                                    previouslyManagedAssets: item.value
                                })
                            }

                            const arr2 = [];
                            let obj2 = item.choices;

                            for (let key in obj2){
                                arr2.push(obj2[key]);
                            }

                            this.setState({ choices2: arr2 });

                            break;

                        case 'investment_services':
                            if(item.value){
                                this.setState({
                                    securityService: item.value
                                })
                            }

                            const arr3 = [];
                            let obj3 = item.choices;

                            for (let key in obj3){
                                arr3.push(obj3[key]);
                            }

                            this.setState({ choices3: arr3 });

                            break;

                        case 'investment_behavior':
                            if(item.value){
                                this.setState({
                                    investmentBehaviourRate: item.value
                                })
                            }

                            const arr4 = [];
                            let obj4 = item.choices;

                            for (let key in obj4){
                                arr4.push(obj4[key]);
                            }

                            this.setState({ choices4: arr4 });

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
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
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
                currentStep: 'questionnaire_1'
            };
    
            configActions.collectInvestmentPlanData(data);
        }
    }
    
    nextStep(){
        return () => {
    
            const {
                investmentExperience,
                previouslyManagedAssets,
                securityService,
                investmentBehaviourRate
            } = this.state;
    
            const {
                configActions,
                filesActions,
                investmentPlanProgressBar
            } = this.props;
    
            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_3',
                investmentExperience,
                previouslyManagedAssets,
                securityService,
                investmentBehaviourRate
            };
    
            if(!data.investmentExperience
                || (investmentExperience !== 1 && !data.previouslyManagedAssets)
                || !data.securityService
                || !data.investmentBehaviourRate) {
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
                investment_experience: investmentExperience,
                investment_services: securityService,
                investment_behavior: investmentBehaviourRate
            };

            if(investmentExperience !== 1){
                dataAPI.previously_managed_assets = previouslyManagedAssets;
            }

            const dataJSON = JSON.stringify(dataAPI);

            filesActions.postQuestionnaireData(dataJSON, 3)
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
        
        const {errorMessage, choices1, choices2, choices3, choices4, spin} = this.state;

        const content = (
            <div className="ip-popover__content">
                <h4>HINWEIS</h4>
                <p>Investitionen in Kapitalmärkte sind neben einer potentiellen Rendite auch
                    immer mit Risiken verbunden. Eine potentiell höhere Rendite geht immer
                    auch mit erhöhter Volatilität und erhöhtem Risiko einher. Ihr ausgewähltes
                    Anlageverhalten wird von DonauCapital auf Vereinbarkeit mit den Risiken
                    des ausgewählten „Advisors“ untersucht. Nähere Informationen zur
                    Risikoeinschätzung erhalten Sie im Dokument Risikoinformationen.</p>
            </div>
        );
    
        let {windowWidth} = this.state;
    
        windowWidth = windowWidth || window.innerWidth;
    
        // Change menu layout on width size
        const isIPad = windowWidth <= 1366;
        
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
                        <li className="step3-q1">
                            <div className="investment-plan__subtitle">
                                Haben Sie bereits Erfahrung mit Anlageberatung / Vermögensverwaltung?
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('investmentExperience')}
                                    value={this.state.investmentExperience}
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
                        <li className="step3-q2">
                            <div className="investment-plan__subtitle">
                                Wie hoch ist Ihr bisher verwaltetes Vermögen?
                            </div>
                            <div className="investment-plan__radio ">
                                <RadioGroup
                                    onChange={this.onChange('previouslyManagedAssets')}
                                    value={this.state.previouslyManagedAssets}
                                    disabled={this.state.investmentExperience === 1}
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
                        <li className="step3-q3">
                            <div className="investment-plan__subtitle">
                                Welche Wertpapierdienstleistungen haben Sie bisher in Anspruch genommen?
                            </div>
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('securityService')}
                                    value={this.state.securityService}
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
                        </li>
                        <li className="step3-q4">
                            <div className="investment-plan__subtitle">
                                Wie schätzen Sie Ihr Anlageverhalten ein?
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
                            <div className="investment-plan__radio">
                                <RadioGroup
                                    onChange={this.onChange('investmentBehaviourRate')}
                                    value={this.state.investmentBehaviourRate}
                                >
                                    <div className="investment-plan__radio_item">
                                        <RadioButton
                                            value={1}
                                            key={1}
                                        >
                                            {choices4[0]}
                                        </RadioButton>
                                        <div className="investment-plan__radio_info">
                                            <div>Gesicherte Ertrags-erwartung, keine Verlust-bereitschaft für
                                                Gesamt-depot.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="investment-plan__radio_item">
                                        <RadioButton
                                            value={2}
                                            key={2}
                                        >
                                            {choices4[1]}
                                        </RadioButton>
                                        <div className="investment-plan__radio_info">
                                            <div>Ertragserwartung über Zinsniveau, ausgewogene Mischung aus Anlagen
                                                mit geringerem und erhöhtem Risiko.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="investment-plan__radio_item">
                                        <RadioButton
                                            value={3}
                                            key={4}
                                        >
                                            {choices4[2]}
                                        </RadioButton>
                                        <div className="investment-plan__radio_info">
                                            <div>Nutzung höchster Rendite- chancen unter Inkaufnahme erhöhter
                                                Wert mit schwan- kungen im Gesamtdepot.
                                            </div>
                                        </div>
                                    </div>
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

IpStep3.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep3);