import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd';
import 'antd/lib/select/style/index.css';
import 'antd/es/spin/style/index.css';
import * as filesActions from '../../../../actions/filesActions';
import * as configActions from '../../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IpStep1 extends Component {
    constructor(props) {
        super(props);

        const {
            advisor
        } = props.investmentPlanData;

        this.state = {
            ...props.investmentPlanData,
            errorMessage: false,
            advisor,
            advisers: []
        };

        this.nextStep = this.nextStep.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.getAdviserManagers = this.getAdviserManagers.bind(this);
    }

    componentDidMount(){
        this.getAdviserManagers();
    }

    getAdviserManagers(){
        const {filesActions} = this.props;

        filesActions.adviserManagers()
            .then(res => {
                //this if for prevent mounted state warning
                if(this.wrapper){
                    this.setState({
                        advisers: res.available_advisers,
                        advisor: res.selected,
                        spin: false
                    });
                }
            })
            .catch(e => {
                this.setState({spin: false});
                console.error(e.message);
            });
    }
    
    nextStep(){
        return () => {

            const {
                filesActions,
                configActions,
                investmentPlanProgressBar
            } = this.props;

            const {
                advisor,
            } = this.state;
    
            // Collect IP data in Redux
            const data = {
                currentStep: 'questionnaire_1',
                advisor
            };
            
            // Check validation
            if(!data.advisor) {
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
                adviser: advisor
            };
            const dataJSON = JSON.stringify(dataAPI);

            filesActions.pushAdviserManager(dataJSON)
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
    
    onChangeSelect(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }
    
    render(){
        
        const {
            errorMessage,
            advisers,
            spin
        } = this.state;
    
        const Option = Select.Option;

        return (
            <div ref={node => {this.wrapper = node}} className="investment-plan__content">
            {spin &&
                <div className="spin-active">
                    <Spin size="large" />
                </div>
            }
            {!spin &&
            <div>
                <div className="investment-plan__title">Herzlich Willkommen.</div>
                <div className="investment-plan__subline">
                    Vielen Dank, dass Sie sich bei DonauCapital registriert haben - der erste Schritt in
                    die Welt innovativer Geldanlage ist damit bereit erfolgreich abgeschlossen.
                </div>
                <ul>
                    <li>
                        <div className="investment-plan__subtitle">
                            Wie lange dauert der Prozess der Kontoeröffnung?
                        </div>
                        <div className="investment-plan__subtext">
                            Der Gesamtprozess umfasst einen umfangreichen Fragebogen zu Ihren Zielen und
                            Erfahrungen im Bereich Kapitalmarkt, ein darauf abgestimmtes
                            Investmentportfolio, sowie die abschließende Identifikation und digitale
                            Vertragsunterzeichnung per Video-Chat. Der Gesamtprozess nimmt circa 15 - 25
                            Minuten in Anspruch. Sie können Ihren aktuellen Fortschritt jedoch jederzeit
                            speichern und zu einem späteren Zeitpunkt fortfahren.
                        </div>
                    </li>
                    <li>
                        <div className="investment-plan__subtitle">
                            Welchen Advisor möchten Sie für Ihr Vermögen auswählen?
                        </div>
                        <div className="investment-plan__subtext">
                            DonauCapital bietet in Kooperation mit seinen angebundenen Vermittlern
                            unterschiedlichste Strategien der Geldanlage. Bitte wählen Sie das Angebot,
                            für dass Sie sich interessieren.
                        </div>
                    </li>
                </ul>
                <div className="investment-plan__select">
                    <Select
                        className={`${(errorMessage) && "not-filled"}`}
                        dropdownClassName="ip-land"
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Wähle eine Option"
                        optionFilterProp="children"
                        value={this.state.advisor}
                        onChange={this.onChangeSelect('advisor')}
                        filterOption={
                            (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {advisers.map(adviser => {
                            return <Option
                                key={adviser.id}
                                className="investment-plan__option"
                                value={adviser.id}
                            >
                                {(adviser.first_name || adviser.last_name)
                                        ? `${adviser.first_name} ${adviser.last_name}`
                                        : `${adviser.email}` }
                            </Option>
                        })}
                    </Select>
                </div>
                {errorMessage &&
                <div className="investment-plan__error">
                    Alle hier gestellten Fragen sind Pflichtangaben.
                    Bitte füllen Sie alle Punkte sorgfältig aus.
                </div>
                }
                <div className="investment-plan__btn-area">
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

IpStep1.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IpStep1);