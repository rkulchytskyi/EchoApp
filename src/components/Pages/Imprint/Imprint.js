import React, { Component } from 'react';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import scrollToComponent from 'react-scroll-to-component'

class Imprint extends Component {

	componentDidMount() {
        scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), {
            offset: -100,
            align: 'top',
            duration: 500,
            ease: 'inCirc'
        });
	}

    render() {
        return (
            <div className="wrapper">
                <NavOverlay />
                <div data-ix="fixed-nav" className="header">
                    <MainMenu logoStyle="grey"/>
                </div>
                <div className="content">
                    <div className="protection-wrapper-copy">
                        <div className="protection-container">
                            <h1 className="protection-heading">Impressum</h1>
                            <div className="protection-block">
                                <p className="protection-paragraph"><strong>Dienstanbieter</strong>
                                    <br/>RB Capital GmbH
                                    <br/>Käthe-Kollwitz-Ring 7
                                    <br/>63486 Bruchköbel
                                    <br/>Deutschland
                                    <br/>
                                    <br/>Telefon:
                                    <a
                                        className="raden__contact-phone"
                                        href="tel:+49 (0) 69 348 735 25">
                                        +49 (0) 69 348 735 25
                                    </a>
                                    <br/>E-Mail: service@radenbrock.com
                                    <br/>Internet: www.radenbrock.com
                                    <br/>
                                    <br/>Geschäftsführer: Marius Streb
                                    <br/>Sitz der Gesellschaft: Bruchköbel
                                    <br/>
                                    <br/>Registergericht: Amtsgericht Hanau
                                    <br/>Handelsregister-Nr: HRB 95780
                                    <br/>Umsatzsteuer-IdNr: DE 308 40 16 50
                                    <br/>
                                    <br/>Inhaltlich Verantwortlicher gemäß § 55 Abs. 2RStV: Marius Streb
                                    (Anschrift wie oben)
                                    </p>
                            </div>
                            <div id="risikohinweis" className="protection-block">
                                <h4 className="protection-sub-heading">Risikohinweis</h4>
                                <p className="protection-paragraph">Alle Inhalte auf der Internetseite
                                    www.radenbrock.com und deren Unterseiten (im Folgenden „Plattform“)
                                    dienen ausschließlich zur Information. Die Inhalte der Plattform
                                    stellen keine Anlageberatung oder Aufforderung zum Kauf oder Verkauf
                                    von Devisen, CFDs, Futures, Aktien, Optionen, Derivaten, oder anderen
                                    Finanzinstrumenten (Nachfolgend gemeinsam „Finanzinstrumente“) dar.
                                    Trotz größter Sorgfalt kann keine Gewähr für die Richtigkeit, Genauigkeit
                                    oder Vollständigkeit der hier dargestellten Informationen übernommen werden.
                                    <br/>
                                    <br/>Die RB Capital GmbH weist ausdrücklich darauf hin, dass der Handel mit
                                    Finanzinstrumenten nicht nur mit Chancen, sondern auch mit erheblichen Risiken
                                    verbunden ist. Die von der RB Capital GmbH entwickelten Handelsstrategien richten
                                    sich ausschließlich an erfahrene Anleger und sind seitens der Risikoklasse als
                                    hochspekulativ einzustufen. Den Gewinnmöglichkeiten stehen entsprechend hohe
                                    Verlustrisiken gegenüber. Börsengeschäfte und OTC-Geschäfte (over the counter),
                                    besonders Termingeschäfte sind mit Risiken verbunden, die zu einem Totalverlust
                                    des eingesetzten Kapitals und darüber hinaus zu weiteren Verlusten führen können
                                    (z. B. eine Nachschusspflicht wenn der Verlust das eingesetzte Kapital übersteigt).
                                    Es sollte nur Kapital verwendet werden, welches nicht zur
                                    <br/> täglichen Lebensführung benötigt wird. Die Performance (Wertentwicklung)
                                    der dargestellten Handelsstrategien, welche zuvor erzielt wurde, ist kein Indikator
                                    für die zukünftig erzielbare Performance. Die weitere Entwicklung von Kursen lässt
                                    sich nicht vorhersagen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">Haftung für Inhalte</h4>
                                <p className="protection-paragraph">Als Diensteanbieter ist die RB Capital GmbH
                                    gemäß § 7 Abs.1 Telemediengesetz (TMG) für eigene Inhalte auf diesen Seiten
                                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG ist die RB
                                    Capital GmbH als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                                    gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                                    die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
                                    oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
                                    hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                                    der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
                                    entsprechenden Rechtsverletzungen wird die RB Capital GmbH diese Inhalte umgehend
                                    entfernen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">Haftung für Links</h4>
                                <p className="protection-paragraph">Das Angebot unter www.radenbrock.com enthält Links
                                    zu externen Webseiten Dritter, auf deren Inhalte die RB Capital GmbH keinen
                                    Einfluss hat. Deshalb kann die RB Capital GmbH für diese fremden Inhalte auch
                                    keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                                    wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                                    Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                                    permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                                    Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                                    Rechtsverletzungen wird die RB Capital GmbH derartige Links umgehend entfernen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">Urheberrecht</h4>
                                <p className="protection-paragraph">Die durch die RB Capital GmbH erstellten
                                    Inhalte und Werke auf www.radenbrock.com unterliegen dem deutschen Urheberrecht.
                                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                                    des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
                                    für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                                    dieser Seite nicht von der RB Capital GmbH erstellt wurden, werden die Urheberrechte
                                    Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                                    Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                                    bittet die RB Capital GmbH um einen entsprechenden Hinweis. Bei Bekanntwerden
                                    von Rechtsverletzungen wird die RB Capital GmbH derartige Inhalte umgehend
                                    entfernen.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Imprint;
