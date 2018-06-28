import React, { Component } from 'react';
import './Faq.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import MainContactForm from '../../Constructor/MainContactForm/MainContactForm'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'

class Faq extends Component {
    
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
    }
    
    toggleList(event){
        
        event.preventDefault();
        const li = event.target.classList.contains('faq-li-list') ? event.target : event.target.closest('.faq-li-list');
    
        if(!li) return;
        
        if(event.target.classList.contains('faq-li-list') || event.target.closest('.faq-li-list')){
            
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
        return (
            <div className="wrapper">
                <NavOverlay />
                <div id="fixed-nav" data-ix="fixed-nav" className="header">
                    <MainMenu />
                    <div className="faq-hero-content">
                        <div className="faqs-container">
                            <h1 className="hero-title main-title">Häufig gestellte Fragen.</h1>
                            <p className="faq-hero-paragraph sub-line">Sie haben weitere Fragen zu unseren
                                Strategien? Wir beraten Sie gerne.</p>
                        </div>
                        <div className="faqs-container-bg"/>
                    </div>
                </div>
                <div className="content">
                    <div className="faqs">
                        <div className="faqs-container">
                            <div className="faq-main w-hidden-medium w-hidden-small w-hidden-tiny">
                                <div className="faq-group">
                                    <div className="faq-left-title-block"><img alt="" src="img/Heading%20Line.svg" />
                                        <h4 className="faq-group-title accordion-title">Allgemeine Fragen</h4>
                                    </div>
                                    <ul className="faq-ul-list w-list-unstyled">
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Mit wem schließe ich den Vertrag ab?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Der Vermögensverwaltungsvertrag wird mit der DonauCapital Investment
                                                GmbH, einer von der Bundesanstalt für Finanzdienstleistungsaufsicht
                                                (BaFin) zugelassenen und beaufsichtigten
                                                Vermögensverwaltungsgesellschaft abgeschlossen. Mithilfe
                                                professioneller Partner ist es Radenbrock möglich, sich vollständig
                                                auf die Entwicklung von Handelsstrategien zu konzentrieren, ohne
                                                interne Ressourcen für regulatorische Fragestellungen aufzuwenden.
                                                Nichtsdestotrotz sind wir auch als vertraglich gebundener Vermittler
                                                gemäß §2 Abs. 10 Satz 1 KWG in die Kontrollmaßnahmen der BaFin
                                                einbezogen.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Habe ich jederzeit Zugriff auf mein Geld?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Ja, unser Haftungsdach verlangt grundsätzlich keine Mindesthaltefrist.
                                                Somit kann Ihr Portfolio jederzeit aufgelöst werden. Dennoch möchten
                                                wir Sie darauf hinweisen, dass ein Anlagehorizont von mindestens einem
                                                Jahr ratsam ist, um einen vollständigen Eindruck des Produktes während
                                                wechselnder Marktgegebenheiten gewinnen zu können.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Hat Radenbrock direkt Zugriff auf mein Geld?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader Bank AG,
                                                Ein- und Auszahlungen können nur von Ihnen getätigt werden.
                                                Eine Ausnahme stellt lediglich der Einzug der Management- und
                                                Performancegebühr von unserem Vermögensverwaltungs-Partner DonauCapital
                                                Investment GmbH dar.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Bei welcher Bank führt Radenbrock mein Depot?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Das Depot wird bei der Baader Bank AG geführt. Die Baader Bank AG
                                                stellt eine der führenden Banken im Bereich der
                                                Online-Vermögensverwaltung dar. Weiterführende Informationen erhalten
                                                Sie hier.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Gibt es bei Radenbrock eine Mindestanlagesumme?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Damit unsere Algorithmen ordnungsgemäß umgesetzt werden können, muss
                                                mit unserem Haftungsdachpartner eine Mindestanlagesumme von 25.000
                                                Euro betreut werden. Die Erhöhung der Anlagesumme muss in Beträgen
                                                erfolgen, die durch 5.000 Euro teilbar sind.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Gibt es weitere Kosten die
                                                    nicht in der Management Fee inkludiert sind?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Nein, es gibt keine versteckten Fixkosten wie Ausgabeaufschläge oder
                                                Ähnliches. Einen genauen Überblick über die Gebühren bei DC Radenbrock
                                                erhalten Sie hier.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Fallen bei einer Kündigung zusätzliche Kosten an?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Bei einer vorzeitigen Kündigung berechnet die DonauCapital Investment
                                                GmbH die Performancegebühr zum Stand der Kündigung und zieht diese von
                                                Ihrem Konto ein. Ansonsten entstehen keine weiteren Kosten für Sie.
                                                Nach der Kündigung steht es Ihnen frei, das geöffnete Depot bei der
                                                Baader Bank AG auf Selbstkostenbasis weiterhin fortzuführen.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Wie oft wird die Managementgebühr abgerechnet?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Die Managementgebühr wird mit erstmaliger Depoteröffnung und
                                                anschließend in einem jährlichen Rhythmus eingezogen.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="faq-group">
                                    <div className="faq-left-title-block"><img alt="" src="img/Heading%20Line.svg" />
                                        <h4 className="faq-group-title">Anlagestrategien</h4>
                                    </div>
                                    <ul className="faq-ul-list w-list-unstyled">
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Wie funktioniert das genau?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">Radenbrock entwickelt vollautonome
                                                Investmentstrategien auf Basis naturwissenschaftlicher Konzepte.
                                                Unser Haftungsdachpartner ermöglicht es Ihnen daraufhin, von unseren
                                                Strategien im Rahmen eines Vermögensverwaltungsverhältnisses zu
                                                profitieren und führt diese auf Ihrem Konto aus.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Mit welchen Anlageklassen arbeiten Radenbrock-Strategien?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Radenbrock nutzt primär börsengelistete Derivate wie Futures,
                                                aber auch Aktien. Als Entwickler von aktiven Investmentstrategien ist
                                                es uns wichtig, Produkte in Betracht zu ziehen, die sich durch eine
                                                hohe Zuverlässigkeit in ihrer Verfügbarkeit auszeichnen.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Kann ich einen Teil meines Geldes verlieren?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Ja, generell besteht bei allen Investments das Risiko, 
                                                Geld zu verlieren. Unsere offensiven Strategien bieten eine hohe
                                                und unkorrelierte Rendite, dafür aber auch ein erhöhtes Risiko.
                                                Der maximale Verlust Ihres Investments kann von Ihnen vorab  bestimmt
                                                werden. Höhere Gewalt oder andere, nicht zu beeinflussende Ereignisse,
                                                welche Liquidität und somit die Veräußerbarkeit eines Finanzproduktes
                                                beeinflussen, können unter Umständen jedoch dazu führen, dass der
                                                tatsächliche Verlust die vorgegebene Schwelle überschreitet.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Aus geschieht mit
                                                    Ausschüttungen und Zinsen?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Je nach Wunsch des Kunden können diese wieder angelegt
                                                oder ausbezahlt werden. Hier bekommen Sie durch Radenbrock am
                                                Ende eines jeden Jahres eine detaillierte Übersicht Ihres
                                                Vermögensverwaltungsmandats mit der DonauCapital Investment GmbH.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="faq-group">
                                    <div className="faq-left-title-block"><img alt="" src="img/Heading%20Line.svg" />
                                        <h4 className="faq-group-title">Depoteröffnung</h4>
                                    </div>
                                    <ul className="faq-ul-list w-list-unstyled">
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Wie werde ich Kunde bei Radenbrock?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Sie können dem Online-Anmeldungsverfahren hier folgen und die
                                                Registrierung direkt über unsere Website abschließen. Alternativ
                                                bieten wir Ihnen auch die Möglichkeit, sich persönlich mit uns in
                                                Kontakt zu setzen.
                                            </p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Wie lange dauert es,
                                                    bis mein Depot eröffnet ist?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">In der Regel dauert die
                                                Eröffnung des Depots drei bis vier Werktage, nach erfolgreicher
                                                Registrierung.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Wie erhalte ich meine Vertragsunterlagen?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Nachdem uns alle notwendigen Unterlagen vorliegen, erhalten Sie von uns
                                                schriftlich alle Vertragsunterlagen, welche Sie uns postalisch oder
                                                digital zukommen lassen können.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">
                                                    Kann ich auch aus dem Ausland Kunde werden?
                                                </h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Alle Personen mit einem Wohnsitz im europäischen Ausland haben die
                                                Möglichkeit Kunde zu werden. Kunden außerhalb der EU wenden sich bitte
                                                direkt an unseren Kundeserivce per Email an service@radenbrock.com oder
                                                telefonisch
                                                <a
                                                    className="raden__contact-phone"
                                                    href="tel:+49 (0) 69 348 735 25">
                                                    +49 (0) 69 348 735 25
                                                </a>
                                                an uns.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="faq-group">
                                    <div className="faq-left-title-block">
                                        <img alt="" src="img/Heading%20Line.svg" />
                                        <h4 className="faq-group-title">Reporting &amp; Sicherheit</h4>
                                    </div>
                                    <ul className="faq-ul-list w-list-unstyled">
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Wie und wann bekomme
                                                    ich meine Jahresbescheinigung?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Die Jahresbescheinigung wird Ihnen am Anfang eines jeden
                                                Jahres postalisch zugesandt.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Wie werde ich über die
                                                    Wertentwicklung meines Depots informiert?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">Beider Eröffnung Ihres Depots
                                                können Sie wählen, wie oft Sie über die aktuelle Wertentwicklung
                                                informiert werden möchten, mindestens jedoch einmal im Monat.
                                                Die DonauCapital Investment GmbH wird Ihnen dann über Ihre Postbox
                                                bei Radenbrock zu den
                                                <br/> ausgewählten Daten einen detaillierten Report per
                                                Email zukommen lassen.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Erfüllt Radenbrock
                                                    alle regulatorischen Bestimmungen?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">Radenbrock entwickelt
                                                innovative Handelsstrategien, Ihr Vertragspartner wird aber die
                                                DonauCapital Investment GmbH. Radenbrock ist als vertraglich gebundener
                                                Vermittler gemäß § 2 Abs. 10 des Kreditwesengesetzes (KWG) für
                                                die DonauCapital Investment GmbH tätig. Dieser wurde von der
                                                Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) die
                                                Erlaubnis für die Vermögensverwaltung erteilt und wird durch
                                                die BaFin beaufsichtigt.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Was geschieht mit meinem
                                                    Investment bei einer Insolvenz von Radenbrock oder der Baader
                                                    Bank AG?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">Die DonauCapital Investment
                                                GmbH ist nicht befugt, sich Besitz oder Eigentum an Vermögenswerten
                                                des Kunden zu verschaffen. Die Vermögenswerte des Kunden werden von der
                                                Baader Bank AG verwahrt. Im Falle einer Insolvenz der DonauCapital
                                                Investment GmbH fällt das im Depot enthaltene Kundenvermögen also
                                                nicht in die Insolvenzmasse der DonauCapital Investment GmbH.
                                                <br/>
                                                <br/> Im Falle der Insolvenz der Baader Bank AG ist Ihr
                                                Verrechnungskonto durch die gesetzliche Einlagensicherung der EdB
                                                bis zu einer Einlagenhöhe von EUR 100.000 (vgl. Details hierzu unter
                                                http://www.edb-banken.de/) sowie darüber hinaus bis zu einer gewissen
                                                Höhe durch den Einlagensicherungsfonds des BdB geschützt (vgl.
                                                Details hierzu unter
                                                https://einlagensicherungsfonds.de/banks/abfrage-baader-bank-aktiengesellschaft).
                                                Darüber hinaus besteht ein Herausgabeanspruch für Ihre Wertpapiere im
                                                Portfolio im Falle einer Insolvenz der Depotbank. Dieser letzte Aspekt
                                                ist für Ihre Anlage besonders wichtig, weil Ihr Vermögen durch unseren
                                                Haftungsdachpartner überwiegend in Wertpapieren angelegt und damit
                                                vorwiegend nicht (wie das Cash auf dem Verrechnungskonto) dem
                                                Einlagensicherungsschutz unterfällt.</p>
                                        </li>
                                        <li onClick={this.toggleList} data-ix="faq-description" className="faq-li-list">
                                            <a href="/" className="faq-link w-inline-block">
                                                <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                <h4 className="faq-title accordion-title">Wie sicher sind bei
                                                    persönliche Daten?</h4>
                                            </a>
                                            <p className="faq-description-paragraph">
                                                Alle Kundendaten werden von der RB Capital GmbH
                                                <br/> bzw. der DonauCapital Investment GmbH auf in Deutschland
                                                ansässigen Servern redundant gespeichert, das heißt es werden mehrere
                                                Kopien Ihrer Daten in verschiedenen virtuellen Orten abgelegt.
                                                Zusätzlich werden alle Daten durch regelmäßige, verschlüsselte
                                                Sicherungskopien vor einem Verlust geschützt.
                                                <br/>
                                                <br/> Personenbezogenen Daten werden per AES 256-bit-Verschlüsselung
                                                gesondert chiffriert. So sind weder von Servern noch Sicherungskopien
                                                Rückschlüsse auf Kunden möglich.
                                                <br/>
                                                <br/> Die Kommunikation über unsere Webseite erfolgt ausschließlich
                                                über geschützte und verschlüsselte Verbindungen
                                                (Extended-Validation-SSL-Zertifikate). Unterstützt von
                                                Sicherheitsexperten führen wir regelmäßige Sicherheitsüberprüfungen
                                                unseres Systems durch. Alle Systemzugriffe und Änderungen von Daten
                                                auf unserer Webseite oder unseren Servern werden von uns genau verfolgt
                                                und gespeichert</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div data-animation="slide" data-duration="500" data-infinite="1"
                                 className="faq-slider w-hidden-main w-slider">
                                <div className="w-slider-mask">
                                    <div className="w-slide">
                                        <div className="faq-group">
                                            <div className="faq-left-title-block">
                                                <img alt="" src="img/Heading%20Line.svg" />
                                                <h4 className="faq-group-title">Allgemeine Fragen</h4>
                                            </div>
                                            <ul className="faq-ul-list w-list-unstyled">
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">Mit wem schließe
                                                            ich den Vertrag ab?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Habe ich jederzeit Zugriff auf mein Geld?
                                                        </h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">Nein, jeder Kunde
                                                        unterhält sein eigenes Konto bei der Baader Bank AG, Ein- und
                                                        Auszahlungen können nur von Ihnen getätigt werden. Eine
                                                        Ausnahme stellt lediglich  der Einzug der Management- und
                                                        Performancegebühr von unserem Haftungsdach Partner DonauCapital
                                                        Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Hat Radenbrock direkt Zugriff auf mein Geld?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich  
                                                        der Einzug der Management- und Performancegebühr von
                                                        unserem Haftungsdach Partner DonauCapital Wertpapier
                                                        GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Bei welcher Bank führt Radenbrock mein Depot?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich  
                                                        der Einzug der Management- und Performancegebühr von
                                                        unserem Haftungsdach Partner DonauCapital Wertpapier
                                                        GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Gibt es bei Radenbrock eine Mindestanlagesumme?
                                                        </h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">Nein,
                                                        jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der Einzug
                                                        der Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Ist Radenbrock an bestimmte Anlageprodukte gebunden?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Gibt es weitere Kosten die nicht in der Management Fee
                                                            inkludiert sind?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der
                                                        Einzug der Management- und Performancegebühr von unserem
                                                        Haftungsdach Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Fallen bei einer Kündigung zusätzliche Kosten an?
                                                        </h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie oft wird die Managementgebühr abgerechnet?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">Nein,
                                                        jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-slide">
                                        <div className="faq-group">
                                            <div className="faq-left-title-block">
                                                <img alt="" src="img/Heading%20Line.svg" />
                                                <h4 className="faq-group-title">Anlagestrategien</h4>
                                            </div>
                                            <ul className="faq-ul-list w-list-unstyled">
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">Wie
                                                            funktioniert die Vermögensverwaltung bei Radenbrock?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            In welche Anlageklassen investiert Radenbrock
                                                            mein Vermögen?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich
                                                        der Einzug der Management- und Performancegebühr von
                                                        unserem Haftungsdach Partner DonauCapital Wertpapier
                                                        GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Welche Rendite kann ich von Radenbrock erwarten?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich  
                                                        der Einzug der Management- und Performancegebühr von
                                                        unserem Haftungsdach Partner DonauCapital Wertpapier
                                                        GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Kann ich einen Teil meines Geldes verlieren?
                                                        </h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der Einzug
                                                        der Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Aus geschieht mit Ausschüttungen und Zinsen?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der
                                                        Einzug der Management- und Performancegebühr von unserem
                                                        Haftungsdach Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-slide">
                                        <div className="faq-group">
                                            <div className="faq-left-title-block">
                                                <img alt="" src="img/Heading%20Line.svg" />
                                                <h4 className="faq-group-title">Depoteröffnung</h4>
                                            </div>
                                            <ul className="faq-ul-list w-list-unstyled">
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie werde ich Kunde bei Radenbrock?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei
                                                        der Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich  der
                                                        Einzug der Management- und Performancegebühr von unserem
                                                        Haftungsdach Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie lange dauert es, bis mein Depot eröffnet ist?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie erhalte ich meine Vertragsunterlagen?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">Kann ich ein
                                                            bestehendes Depot an Radenbrock übertragen?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der Einzug
                                                        der Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">Kann ich auch
                                                            aus dem Ausland Kunde werden?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei
                                                        der Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich  der
                                                        Einzug der Management- und Performancegebühr von unserem
                                                        Haftungsdach Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-slide">
                                        <div className="faq-group">
                                            <div className="faq-left-title-block">
                                                <img alt="" src="img/Heading%20Line.svg" />
                                                <h4 className="faq-group-title">Reporting &amp; Sicherheit</h4>
                                            </div>
                                            <ul className="faq-ul-list w-list-unstyled">
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie und wann bekomme ich meine Jahresbescheinigung?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei
                                                        der Baader Bank AG, Ein- und Auszahlungen können nur von
                                                        Ihnen getätigt werden. Eine Ausnahme stellt lediglich
                                                         der Einzug der Management- und Performancegebühr von
                                                        unserem Haftungsdach Partner DonauCapital Wertpapier GmbH
                                                        dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie werde ich über die Wertentwicklung meines
                                                            Depots informiert?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der
                                                        Baader Bank AG, Ein- und Auszahlungen können nur von Ihnen
                                                        getätigt werden. Eine Ausnahme stellt lediglich  der Einzug
                                                        der Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Erfüllt Radenbrock alle regulatorischen Bestimmungen?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Was geschieht mit meinem Investment bei einer Insolvenz
                                                            von Radenbrock oder der Baader Bank AG?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto bei der Baader
                                                        Bank AG, Ein- und Auszahlungen können nur von Ihnen getätigt
                                                        werden. Eine Ausnahme stellt lediglich  der Einzug der
                                                        Management- und Performancegebühr von unserem Haftungsdach
                                                        Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                                <li onClick={this.toggleList}
                                                    data-ix="faq-description" className="faq-li-list">
                                                    <a href="/" className="faq-link w-inline-block">
                                                        <img alt="" src="img/plus.svg" className="faq-plus-icon" />
                                                        <h4 className="faq-title accordion-title">
                                                            Wie sicher sind bei persönliche Daten?</h4>
                                                    </a>
                                                    <p className="faq-description-paragraph">
                                                        Nein, jeder Kunde unterhält sein eigenes Konto
                                                        bei der Baader Bank AG, Ein- und Auszahlungen können nur
                                                        von Ihnen getätigt werden. Eine Ausnahme stellt lediglich
                                                         der Einzug der Management- und Performancegebühr von unserem
                                                        Haftungsdach Partner DonauCapital Wertpapier GmbH dar.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-slider-nav w-slider-nav-invert"/>
                            </div>
                        </div>
                        <div className="faqs-container-bg-white"/>
                    </div>
                    <div className="contact w-clearfix">
                        <MainContactForm align="right-aligned" />
                    </div>
                </div>
                <Footer biggerPagging={true}/>
            </div>
            
        );
    }
}

export default Faq;
