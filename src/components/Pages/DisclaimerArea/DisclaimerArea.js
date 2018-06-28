import React, {Component} from 'react';
import './DisclaimerArea.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from 'prop-types'
import { Redirect, NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style/index.css';
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DisclaimerArea extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            legacy: true,
            country: false,
            cookies: false,
            cookiesState: false,
            citizenTypeToggle: false,
            germanyCitizen: false
        };
        
        this.updateWidth = this.updateWidth.bind(this);
        this.changeState = this.changeState.bind(this);
        this.cookiesStateToggle = this.cookiesStateToggle.bind(this);
        this.onCitizenTypeToggle = this.onCitizenTypeToggle.bind(this);
        this.germanyCitizenToggle = this.germanyCitizenToggle.bind(this);
        
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
    
    cookiesStateToggle(){
        this.setState({
            cookiesState: !this.state.cookiesState,
        });
    }
    
    changeState(isLastStep){
        return () => {
	        const cookiesObj = new Cookies();

	        const {
	            legacy,
                country,
                cookiesState,
                citizenTypeToggle
	        } = this.state;
    
            
            if (isLastStep) {
                
                const {
                    configActions
                } = this.props;
                
                configActions.setPassedCookieModal(true);

                if(citizenTypeToggle){
                    configActions.setRetailInvestor(false);
                    configActions.setInstitutionalInvestor(true);
                } else {
                    configActions.setRetailInvestor(true);
                    configActions.setInstitutionalInvestor(false);
                }
            }
    
            this.setState({
                legacy: false,
                country: legacy,
                cookies: country,
                isLastStep
            });
            
	        cookiesState && cookiesObj.set('cookiesState', 'true', { path: '/' });
            
        }
    }
    
    onCitizenTypeToggle(citizenTypeToggle){
        return e => {
            e.preventDefault();
            this.setState({citizenTypeToggle});
        }
    }
    
    germanyCitizenToggle(){
        this.setState({
            germanyCitizen: !this.state.germanyCitizen
        });
    }
    
    render(){
        
        let {windowWidth, isLastStep, citizenTypeToggle} = this.state;

        if (isLastStep) return <Redirect to="/" />;

        windowWidth = windowWidth || window.innerWidth;
    
        // Change menu layout on width size
        const isMobile = windowWidth <= 768;
        
        const {cookies, legacy, country, germanyCitizen} = this.state;
        return (
            <div className="disclaimer-area" style={{backgroundImage: "url('img/Liniengrafik_XL_Anmeldung.svg')"}}>
                <div className="disclaimer-area__nav">
                    <div className="disclaimer-area__inner">
                        <NavLink to="/" className="disclaimer-area__logo">
                            <img
                                src="https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/59ae92631c303d0001fed5d6_Radenbrock_Wort-Bildmarke_grau.svg"
                                width="135"
                                className="image-1"
                                alt=""
                            />
                        </NavLink>
                        <ul className="disclaimer-area__range">
                            { isMobile ?
                                <li className="active">
                                    { legacy ?
                                        <div><span>1</span> HINWEIS </div>
                                        :
                                        <span>1</span>
                                    }
                                </li>
                                :
                                <li className="active">
                                    <span>1</span> RECHTLICHER HINWEIS
                                </li>
                            }
                            { isMobile ?
                                <li className={`${(country || cookies) ? 'active': ''}`}>
                                    { country ?
                                        <div><span>2</span> INVESTORTYP</div>
                                        :
                                        <span>2</span>
                                    }
                                </li>
                                :
                                <li className={`${(country || cookies) ? 'active': ''}`}>
                                    <span>2</span> INVESTORTYP
                                </li>
                            }
                            { isMobile ?
                                <li className={`${cookies ? 'active': ''}`}>
                                    { cookies && !country ?
                                        <div><span>3</span> COOKIES</div>
                                        :
                                        <span>3</span>

                                    }
                                </li>
                                :
                                <li className={`${cookies ? 'active': ''}`}>
                                    <span>3</span> COOKIES
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="disclaimer-area__content">
                    {legacy &&
                        <div className="disclaimer-area__item">
                            <div className="disclaimer-area__title">INNOVATIVE INVESTMENTKONZEPTE.<br/>
                                MASSGESCHNEIDERT.</div>
                            <div className="disclaimer-area__tag">RECHTLICHE HINWEISE</div>
                            <p>Die nachfolgenden Informationen richten sich ausschließlich an Anleger mit einem
                                dauerhaften Wohnsitz in Deutschland. Durch die Wahl des Anlegertyps bestätigen Sie,
                                dass Sie zu dem entsprechenden Personenkreis zählen. Die nach Auswahl von Anlegertyp
                                dargestellten Produkte richten sich eventuell ausschließlich an diesen Personenkreis
                                und sind ggf. nicht für andere Arten von Anlegern bestimmt. Die dargestellten
                                Informationen sind insbesondere nicht für US-amerikanische Staatsbürger oder Personen
                                mit Wohnsitz bzw. ständigem Aufenthalt in den USA bestimmt.</p>
                            <p>Alle Daten dienen ausschließlich zu Ihrer Information und stellen kein Angebot,
                                keine Aufforderung zur Abgabe eines Angebotes zum Kauf oder Verkauf von bestimmten
                                Produkten oder gar eine Anlageberatung dar. Die Gültigkeit der Informationen und
                                Empfehlungen ist auf den Zeitpunkt der Erstellung dieser Unterlagen beschränkt und
                                kann sich je nach Marktentwicklung und ihrer Zielsetzung ändern. Eine Entscheidung
                                über einen Kauf sollten Sie erst nach Prüfung der vollständigen Unterlagen und
                                Risikohinweise sowie nach vorheriger Rechts-, Steuer- und Anlageberatung treffen.
                                Bitte beachten Sie, dass historische Wertentwicklungen keine Garantie für zukünftige
                                Erträge bieten.</p>
                            
                            <div onClick={this.changeState(null)} className="disclaimer-area__btn">
                                <span>Weiter</span>
                            </div>
                        </div>
                    }
                    {country &&
                        <div className="disclaimer-area__item">
                            <div className="disclaimer-area__title">INNOVATIVE INVESTMENTKONZEPTE.<br/>
                                MASSGESCHNEIDERT.</div>
                            <div className="disclaimer-area__tag">RECHTLICHE HINWEISE</div>
                            <div className="disclaimer-area__check">
                                <Checkbox className="checkbox-raden" onChange={this.germanyCitizenToggle}>Ich erkläre,
                                    dass ich die rechtlichen Hinweise gelesen und akzeptiert habe. Ich habe einen
                                    dauerhaften Wohnsitz in Deutschland und bin kein US-amerikanischer Staatsbürger.
                                </Checkbox>
                            </div>
                            <div className="disclaimer-area__type">
                                <a href="/" className={`${citizenTypeToggle ? 'active' : ''} `}
                                   onClick={this.onCitizenTypeToggle(true)}>Ich bin ein Institutioneller Anleger</a>
                                <a href="/" className={`${citizenTypeToggle ? '' : 'active'} `}
                                   onClick={this.onCitizenTypeToggle(false)}>Ich bin ein Retail-Anleger</a>
                            </div>
                            <div className="disclaimer-area__btn-area">
                                <div onClick={() => this.setState({
                                        legacy: true,
                                        country: false,
                                        cookies: false,
                                        germanyCitizen: false
                                    })}
                                     className="disclaimer-area__btn-back">
                                    <span>ZURÜCK</span>
                                </div>
                                <div onClick={germanyCitizen ? this.changeState(null) : null}
                                     className="disclaimer-area__btn">
                                    <span>Weiter</span>
                                </div>
                            </div>
                        </div>
                    }
                    {cookies &&
                        <div className="disclaimer-area__item cookies">
                            <div className="disclaimer-area__title">INNOVATIVE INVESTMENTKONZEPTE.<br/>
                                MASSGESCHNEIDERT.</div>
                            <div className="disclaimer-area__tag">COOKIES</div>
                            <p>Durch die Verwendung von Cookies können Internetseiten nutzerfreundlich, effektiv und
                                sicherer gemacht werden. Dabei werden Textdateien mit Informationspunkten auf Basis
                                von Nutzeraktivitäten temporär im Browser des Benutzers abgelegt. Besuchs-Präferenzen
                                und Webseiten-Einstellungen können somit definiert und gespeichert werden. </p>
                            <p>Mit der Speicherung von Cookies ermöglichen Sie dieser Homepage inhaltliche und
                                strukturelle Anpassung an die individuellen Besucherbedürfnisse. Webseiteneinstellungen
                                werden zeitlich befristet gespeichert und bei erneutem Besuch abgerufen. Mit Anwendung
                                der DSGVO 2018 sind Webmaster dazu verpflichtet, der unter https://eu-datenschutz.org/
                                veröffentlichten Grundverordnung Folge zu leisten und seine Nutzer entsprechend über die
                                Erfassung und Auswertung von Daten in Kenntnis zu setzen. Die Rechtmäßigkeit der
                                Verarbeitung ist in Kapitel 2, Artikel 6 der DSGVO begründet.</p>
                            <div className="disclaimer-area__check">
                                <Checkbox className="checkbox-raden" onChange={this.cookiesStateToggle}> Ich akzeptiere
                                    die Verwendung von Cookies für diese Homepage.</Checkbox>
                            </div>
                            <div className="disclaimer-area__btn-area">
                                <div onClick={() => this.setState({
                                        legacy: false,
                                        country: true,
                                        cookies: false,
                                        germanyCitizen: false
                                    })}
                                     className="disclaimer-area__btn-back">
                                    <span>ZURÜCK</span>
                                </div>
                                <div onClick={this.changeState('last')} className="disclaimer-area__btn">
                                    <span>Weiter</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="footer-mini"></div>
            </div>
        )
    };
}

DisclaimerArea.propTypes = {
	configActions: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        isRetailInvestor: state.config.isRetailInvestor,
        isInstitutionalInvestor: state.config.isInstitutionalInvestor
    }
}

function mapDispatchToProps(dispatch) {
	return {
		configActions: bindActionCreators(configActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DisclaimerArea);