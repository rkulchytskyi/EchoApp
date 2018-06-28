import React, {Component} from 'react';
import './Career.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Career extends Component {
    constructor(props) {
        super(props);
        
        this.toggleList = this.toggleList.bind(this);
    }
    
    toggleList(event){
        
        event.preventDefault();
        const li = event.target.classList.contains('career-li-list') ? event.target : event.target.closest('.career-li-list');
        
        if(!li) return;
        
        if(event.target.classList.contains('career-li-list') || event.target.closest('.career-li-list')){
            
            let element_classes = (" "+li.children[1].className+" ").replace(/[\n\t\r]/g, " "),
                remove_class    = "slide-down",
                add_class       = "slide-up",
                is_showing      = element_classes.indexOf(" "+remove_class+" ") > -1;
            
            if ( ! is_showing) {
                // Switch variable values
                remove_class = [add_class, add_class = remove_class][0];
                li.classList.add('active');
            } else{
                li.classList.remove('active');
            }
            
            // Remove the previous class (if present) and add the new class
            li.children[1].className = (element_classes.replace(" "+remove_class+" ", "") + " "+add_class+" ").trim();
            
            return false;
        }
        
    }

    render() {
        const {isNavOverlayOpen} = this.props;
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    <section className="hero-career__content">
                        <div className="container">
                            <div className="hero-career__inner">
                                <div className="hero-career__title">KARRIERE</div>
                                <div className="hero-career__text">Du begeisterst dich für Kapitalmärkte,
                                    Data Science und ein quantitatives Arbeitsumfeld? Wir freuen uns auf dich!</div>
                            </div>
                        </div>
                        <div className="hero-career__background"/>
                    </section>
                    <section className="hero-career__content">
                        <div className="container">
                            <div className="career-area__content">
                                <div className="career-group">
                                    <div className="career-left-title-block"><img alt="" src="img/Heading%20Line.svg" />
                                        <h4 className="career-group-title">AUSSCHREIBUNGEN</h4>
                                    </div>
                                    <ul className="career-ul-list w-list-unstyled">
                                        <li onClick={this.toggleList} className="career-li-list">
                                            <a
                                                href="/"
                                                className="career-link w-inline-block"
                                            >
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">Data Scientist (m/w)</h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                Als Data Scientist bei RADENBROCK wendest du explorative Verfahren zur
                                                Mustererkennung, der Bestimmung von Zusammenhängen und der
                                                Identifizierung von Auffälligkeiten mit Hilfe umfangreicher Datensätze
                                                an. Du entwickelst analytische Vorhersagemodelle, optimierst diese
                                                kontinuierlich und steuerst die Modellimplementierung. Ziel ist, auf
                                                dieser Basis neue Strategiekonzepte zu entwickeln oder bestehende zu
                                                optimieren. Hierfür solltest du bereits mit Data Mining-Techniken
                                                gearbeitet und Kenntnisse in mathematisch-statistischen Methoden
                                                besitzen. Darüber hinaus ist Erfahrung im Umgang mit Datenstrukturen
                                                in mindestens einer gängigen Programmiersprache zur Datenanalyse
                                                (R, Python, Matlab) essentiell.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung an
                                                karriere@radenbrock.com freuen.
                                            </p>
                                        </li>
                                        <li
                                            onClick={this.toggleList}
                                            data-ix="career-description"
                                            className="career-li-list"
                                        >
                                            <a
                                                href="/"
                                                className="career-link w-inline-block"
                                            >
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">
                                                    Praktikant / Werkstudent Data Science (m/w)
                                                </h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                Als Praktikant / Werkstudent bei RADENBROCK arbeitest du an aktuellen
                                                Data Science Projekten mit - von der Datenbeschaffung und -bearbeitung
                                                bis hin zum Reporting. Du unterstützt das Team bei datengetriebenen
                                                Analysen, Prognosen sowie der Entwicklung innovativer Modelle. Je nach
                                                Kenntnissen und Fortschritt führst du selbstständig statistische
                                                Analysen durch und implementierst Machine Learning-Konzepte auf Basis
                                                interner und externer, strukturierter und unstrukturierter Daten. Für
                                                diese Aufgaben ist ein Studium in einem quantitativen Fach wie Physik,
                                                Mathematik, Quantitative Finance oder Data Science von Vorteil.
                                                Du solltest zudem idealerweise bereits einige Erfahrung im Umgang mit
                                                Daten in einer gängigen Programmiersprache zur Datenanalyse
                                                (R, Python, Matlab) besitzen.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung
                                                an karriere@radenbrock.com freuen.</p>
                                        </li>
                                        <li
                                            onClick={this.toggleList}
                                            data-ix="career-description"
                                            className="career-li-list"
                                        >
                                            <a href="/" className="career-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">
                                                    Risk Controller Portfolio (m/w)
                                                </h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                Als Risk Controller bei RADENBROCK bist du für das fortwährende
                                                Risikomonitoring unserer Strategien zuständig. Hierzu gehört die
                                                Auswertung der täglichen Statistiken sowie die Überprüfung und
                                                Interpretation der Berichte unserer Risiko-Management-Modelle.
                                                Darüber hinaus arbeitest du eng mit dem Data Science-Team zur
                                                Weiterentwicklung der bestehenden Ansätze und Modelle zusammen.
                                                Hierfür ist ein Studium (vorzugsweise M.Sc.) in einem
                                                betriebswirtschaftlichen oder quantitativen Fach und Erfahrung
                                                im Risiko- bzw. Portfoliomanagement sowie in der Analyse von Derivaten
                                                unerlässlich. Du solltest zudem mit statistischen Methoden der
                                                Risikomodellierung vertraut sein. Von Vorteil, aber nicht essentiell
                                                wären erste Erfahrungen in der Arbeit mit den Programmiersprachen R
                                                und/oder Python.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung
                                                an karriere@radenbrock.com freuen.
                                            </p>
                                        </li>
                                        <li
                                            onClick={this.toggleList}
                                            data-ix="career-description"
                                            className="career-li-list"
                                        >
                                            <a href="/" className="career-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">
                                                    Key Account Manager (m/w)
                                                </h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                Als Key Account Manager bei RADENBROCK bist du der erste Ansprechpartner
                                                für unsere Kunden. Du gibst Auskunft über unsere Dienstleistungen,
                                                beantwortest kundenspezifische Fragen zu Produktkonzepten und
                                                Risikosituationen. Darüber hinaus gehört die stetige Weiterentwicklung
                                                und aktive Pflege neuer und bestehender Kundenbeziehungen sowie die
                                                Erarbeitung maßgeschneiderter Kundenlösungen zu deinen Aufgaben.
                                                Voraussetzungen sind ein abgeschlossenes betriebswirtschaftliches
                                                Studium sowie Erfahrung in der Kundenbetreuung oder Vertrieb –
                                                idealerweise in einem Asset Management-Kontext.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung
                                                an karriere@radenbrock.com freuen.
                                            </p>
                                        </li>
                                        <li
                                            onClick={this.toggleList}
                                            data-ix="career-description"
                                            className="career-li-list"
                                        >
                                            <a href="/" className="career-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">
                                                    Business Development / Assistenz der GF (m/w)
                                                </h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                In unserem Business Development Team arbeitest du an der täglichen
                                                Weiterentwicklung unseres Angebotsspektrums und unterstützt RADENBROCK
                                                in der Umsetzung operationeller Fragestellungen. Du stehst in ständigem
                                                Austausch mit der Geschäftsführung und unterstützt diese im täglichen
                                                Management von Öffentlichkeitsarbeit und der Aussteuerung von
                                                Mitarbeitern sowie Dienstleistern. Strukturiertes und autonomes
                                                Arbeiten im Kontext eines Startups sollten deine Leidenschaft sein.
                                                Neben einem Studium der Betriebswirtschaften o.ä. solltest du
                                                idealerweise eine ausgezeichnete Kenntnis in Englisch und/oder einer
                                                weiteren Fremdsprache mitbringen.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung
                                                an karriere@radenbrock.com freuen.
                                            </p>
                                        </li>
                                        <li
                                            onClick={this.toggleList}
                                            data-ix="career-description"
                                            className="career-li-list"
                                        >
                                            <a href="/" className="career-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="career-plus-icon" />
                                                <h4 className="career-title accordion-title">
                                                    Quantitative Engineer (m/w)
                                                </h4>
                                            </a>
                                            <p className="career-description-paragraph">
                                                Als Quantitative Engineer bei RADENRBOCK erwarten dich spannende
                                                Aufgaben mit Fokus auf Strategieentwicklung, Risikomodellierung
                                                sowie Produktoptimierung. Neben der Anwendung bewährter mathematischer
                                                und statistischer Modelle für diese Zwecke bist du verantwortlich für
                                                die kreative Weiterentwicklung dieser und Erarbeitung neuer Modelle
                                                und Methoden. Ein Studium (mindestens M.Sc.) in einem rein
                                                quantitativen Fach (vorzugsweise Mathematik oder Physik) ist für
                                                diesen Aufgabenbereich essentiell. Entsprechend wird auch einwandfreie
                                                Fertigkeit im Umgang mit mindestens einer gängigen Programmiersprache
                                                zur Datenanalyse und –modellierung (R, Python, Matlab) vorausgesetzt.
                                                <br /><br />
                                                Bei Interesse würden wir uns über deine Bewerbung
                                                an karriere@radenbrock.com freuen.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="career-area__background">
                            <a href="mailto:service@radenbrock.com" className="career_area__btn">
                                <div>INITIATIV BEWERBEN</div>
                                <span></span>
                            </a>
                        </div>
                    </section>
                </div>
                <Footer biggerPagging={true}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

export default connect(mapStateToProps, null)(Career)

