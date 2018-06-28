import React, { Component } from 'react';
import './PrivacyPolicy.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu';
import Footer from '../../Constructor/Footer/Footer';
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'

class PrivacyPolicy extends Component {

    render() {
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div data-ix="fixed-nav" className="header">
                    <MainMenu logoStyle="grey"/>
                </div>
                <div className="content">
                    <div className="protection-wrapper">
                        <div className="protection-container">
                            <h1 className="protection-heading">Datenschutz</h1>
                            <p className="protection-paragraph">Verantwortlich für die Inhalte - im Sinne der
                                Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO)
                                - auf der Webseite www.radenbrock.com, sowie dazugehöriger
                                <br/>Unterseiten, ist:
                                <br/>
                                <br/> RB Capital GmbH (im Folgenden „Radenbrock“, „wir“ oder „uns“)
                                <br/>Käthe-Kollwitz-Ring 7
                                <br/>63486 Bruchköbel
                                <br/>Deutschland
                                <br/>
                                <br/>E-Mail: <a
                                    href="mailto:info@radenbrock.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ip-links"
                                >
                                     info@radenbrock.com
                                </a>
                                <br/>Telefon: <a
                                    href="tel:+49 (0)69 847759-13"
                                    className="ip-links"
                                >
                                    +49 (0)69 847759-13
                                </a>
                                </p>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§1 Allgemeines</h4>
                                <p className="protection-paragraph">Datenschutz und Datensicherheit haben für Radenbrock
                                    hohe Priorität. Der dauerhafte Schutz Ihrer personenbezogenen Daten (z.B. Name,
                                    Benutzername, Land, E-Mail-Adresse, Telefonnummer) ist uns besonders wichtig.
                                    Sie werden von uns nur gemäß den Bestimmungen des deutschen Datenschutzrechts
                                    verarbeitet. Die nachfolgenden Vorschriften informieren Sie über Art, Umfang
                                    und Zweck der Erhebung, Verarbeitung und Nutzung personenbezogener Daten.
                                    Diese Datenschutzbestimmungen beziehen sich nur auf unsere Webseiten.
                                    Falls Sie über Links auf andere Seiten weitergeleitet werden, informieren
                                    Sie sich bitte dort über den jeweiligen Umgang mit Ihren Daten.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§2 Erhebung und Verarbeitung Ihrer Daten</h4>
                                <p className="protection-paragraph"><strong>(1) Erhebung von Nutzungsdaten</strong>
                                    <br/>Zur Erbringung oder Verbesserung der Dienstleistungen werden durch den Abruf
                                    der von Ihnen gewünschten Inhalte auf unserer Webseite auf den Servern von
                                    Radenbrock Nutzungsdaten gespeichert, wie Ihre IP-Adresse in anonymisierter Form,
                                    Ihr Internet-Browser, Ihr Internet-Provider und das Land, aus dem Sie die Seite
                                    abrufen. Weitere Informationen hierüber finden Sie in den nachfolgenden Punkten
                                    dieser Datenschutzbestimmungen.
                                    <br/>
                                    <br/>
                                    <strong>(2) Erhebung personenbezogener Daten unserer Nutzer</strong>
                                    <br/>Sie können unsere Webseite grundsätzlich besuchen, ohne Angaben zu Ihrer Person
                                    zu machen. Wir erfassen personenbezogene Daten nur, wenn Sie uns diese freiwillig,
                                    z.B. per E-Mail oder über ein Eingabe- oder Kontaktformular zur Verfügung stellen.
                                    Um solche Daten werden Sie gebeten, wenn Sie sich auf unserer Webseite als Nutzer
                                    registrieren, für den Newsletter anmelden oder einen weiteren Dienst unserer
                                    Webseite nutzen wollen. Bei der Registrierung für die Nutzung unserer
                                    personalisierten Leistungen werden einige personenbezogene Daten erhoben,
                                    wie Name, Anschrift, Kontakt- und Kommunikationsdaten wie Telefonnummer und
                                    E-Mail-Adresse. Sind Sie bei uns registriert, können Sie auf Inhalte und
                                    Leistungen zugreifen, die wir nur registrierten Nutzern anbieten. Angemeldete
                                    Nutzer haben zudem die Möglichkeit, bei Bedarf die bei Registrierung angegebenen
                                    Daten jederzeit zu ändern oder zu löschen. Selbstverständlich erteilen wir Ihnen
                                    darüber hinaus jederzeit Auskunft über die von uns über Sie gespeicherten
                                    personenbezogenen Daten. Gerne berichtigen bzw. löschen wir diese auch auf
                                    Ihren Wunsch, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                                    Zur Kontaktaufnahme in diesem Zusammenhang nutzen Sie bitte die am Ende dieser
                                    Datenschutzerklärung angegebenen Kontaktdaten.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§3 Newsletter</h4>
                                <p className="protection-paragraph">Auf Grundlage Ihrer ausdrücklich erteilten
                                    Einwilligung, übersenden wir Ihnen regelmäßig unseren Newsletter bzw.
                                    vergleichbare Informationen per E-Mail an Ihre angegebene E-Mail-Adresse.
                                    Für den Empfang des Newsletters ist die Angabe Ihrer E-Mail-Adresse ausreichend.
                                    Bei der Anmeldung zum Bezug unseres Newsletters werden die von Ihnen angegebenen
                                    Daten ausschließlich für diesen Zweck verwendet. Abonnenten können auch über
                                    Umstände per E-Mail informiert werden, die für den Dienst oder die Registrierung
                                    relevant sind (Beispielsweise Änderungen des Newsletter-Angebots oder technische
                                    Gegebenheiten).</p>

                                <p className="protection-paragraph">Für eine wirksame Registrierung benötigen wir eine
                                    valide E-Mail-Adresse. Um zu überprüfen, dass eine Anmeldung tatsächlich durch den
                                    Inhaber einer E-Mail-Adresse erfolgt, setzen wir das „Double-opt-in“-Verfahren ein.
                                    Hierzu protokollieren wir die Bestellung des Newsletters, den Versand einer
                                    Bestätigungsmail und den Eingang der hiermit angeforderten Antwort.
                                    Weitere Daten werden nicht erhoben. Die Daten werden ausschließlich für den
                                    Newsletter-Versand verwendet und nicht an Dritte weitergegeben.</p>

                                <p className="protection-paragraph">Die Einwilligung zur Speicherung Ihrer persönlichen
                                    Daten und ihrer Nutzung für den Newsletter-Versand können Sie jederzeit widerrufen.
                                    In jedem Newsletter findet sich dazu ein entsprechender Link. Außerdem können Sie
                                    sich jederzeit auch direkt auf dieser Webseite abmelden oder uns Ihren
                                    entsprechenden Wunsch über die am Anfang dieser Datenschutzhinweise angegebene
                                    Kontaktmöglichkeit mitteilen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§4 Kontaktformular</h4>
                                <p className="protection-paragraph">Treten Sie bzgl. Fragen jeglicher Art per E-Mail
                                    oder Kontaktformular mit uns in Kontakt, erteilen Sie uns zum Zwecke der
                                    Kontaktaufnahme Ihre freiwillige Einwilligung. Hierfür ist die Angabe einer validen
                                    E-Mail-Adresse erforderlich. Diese dient der Zuordnung der Anfrage und der
                                    anschließenden Beantwortung derselben. Die Angabe weiterer Daten ist optional.
                                    Die von Ihnen gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage
                                    sowie für mögliche Anschlussfragen gespeichert. Nach Erledigung der von Ihnen
                                    gestellten Anfrage werden personenbezogene Daten automatisch gelöscht.
                                </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§5 Rechte des Nutzers</h4>
                                <p className="protection-paragraph">Unter der oben aufgeführten Adresse besteht
                                    jederzeit die Möglichkeit, folgende Rechte geltend zu machen: </p>
                                <ul>
                                    <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,</li>
                                    <li>Berichtigung unrichtiger personenbezogener Daten,</li>
                                    <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
                                    <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher
                                        Pflichten noch nicht löschen dürfen,</li>
                                    <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
                                    <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben
                                        oder einen Vertrag mit uns abgeschlossen haben.</li>
                                </ul>
                                <p className="protection-paragraph">Sofern Sie uns eine Einwilligung erteilt haben,
                                    können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Sie können sich
                                    jederzeit mit einer Beschwerde an die für Sie zuständige Aufsichtsbehörde wenden.
                                    Ihre zuständige Aufsichtsbehörde richtet sich nach dem Bundesland Ihres Wohnsitzes,
                                    Ihrer Arbeit oder der mutmaßlichen Verletzung. Eine Liste der Aufsichtsbehörden
                                    (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter:
                                    <a
                                        href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ip-links"
                                    >
                                        https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html.
                                    </a>
                                </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§6 Löschung bzw. Sperrung der Daten</h4>
                                <p className="protection-paragraph">Wir halten uns an die Grundsätze der Datenvermeidung
                                    und Datensparsamkeit. Wir speichern Ihre personenbezogenen Daten daher nur so lange,
                                    wie dies zur Erreichung der hier genannten Zwecke erforderlich ist oder wie es die
                                    vom Gesetzgeber vorgesehenen vielfältigen Speicherfristen vorsehen. Nach Fortfall
                                    des jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten
                                    routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.
                                </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§7 DATENSICHERHEIT</h4>
                                <p className="protection-paragraph">Ihre personenbezogenen Daten werden mittels
                                    SSL-Verschlüsselung über das Internet übertragen. Wir sichern unsere Webseite
                                    und sonstigen Systeme durch technische und organisatorische Maßnahmen gegen Verlust,
                                    Zerstörung, Zugriff, Veränderung oder Verbreitung Ihrer Daten durch unbefugte
                                    Personen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§8 NUTZUNG UND WEITERGABE IHRER DATEN</h4>
                                <p className="protection-paragraph">
                                    <strong>(1)</strong> Wir verwenden die von Ihnen mitgeteilten Daten ausschließlich
                                    zu eigenen Zwecken. Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht.
                                    <br/><br/>
                                    <strong>(2)</strong> In Ausnahmefällen kann Radenbrock gesetzlich dazu
                                    verpflichtet sein, Ihre Daten an Dritte weiterzugeben, um z.B. mit Aufsichts- und
                                    Strafverfolgungsbehörden zu kooperieren, gerichtlichen Anordnungen oder
                                    gerichtlichen Aufforderungen zur Beweisauskunft nachzukommen sowie um die
                                    Rechte und das Eigentum von Radenbrock zu schützen.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§9 VERWENDUNG VON COOKIES</h4>
                                <p className="protection-paragraph">
                                    <strong>(1)</strong> Zur Optimierung unseres Internetauftritts setzen wir Cookies
                                    ein. Es handelt sich dabei um kleine Textdateien, die es uns ermöglichen, auf Ihrem
                                    PC oder sonstigem Endgerät spezifische Informationen über Sie als Besucher unserer
                                    Webseite zu speichern. Cookies helfen uns zum Beispiel dabei, die Sicherheit zu
                                    erhöhen, die Nutzungshäufigkeit und die Anzahl der Besucher unserer Internetseiten
                                    zu ermitteln, das Nutzungsverhalten auf unserer Webseite zu analysieren und
                                    hierdurch die Werbewirksamkeit einzuschätzen.
                                    <br/><br/>
                                    <strong>(2)</strong> Session-Cookies: Wir benutzen nach Ihrem Login
                                    (mit Benutzernamen und Passwort) sogenannte "Session-Cookies", mit denen Sie
                                    während der Dauer Ihres Besuchs identifiziert werden können. Diese Cookies
                                    verfallen automatisch nach dem Ende Ihrer Sitzung bei unserer Webseite.
                                    <br/><br/>
                                    <strong>(3)</strong> Persistente Cookies: Wir benutzen außerdem persistente Cookies.
                                    Hierdurch können wir Informationen über Besucher festhalten, die wiederholt auf
                                    unsere Webseite zugreifen. Durch den Einsatz solcher Cookies können wir unsere
                                    Produkte und Dienstleistungen für Sie kontinuierlich verbessern. Diese persistenten
                                    Cookies enthalten keine personenbezogenen Daten. Die Daten, die in den Cookies
                                    gespeichert werden, werden zu keiner Zeit mit Ihren personenbezogenen Daten
                                    zusammengeführt.
                                    <br/><br/>
                                    <strong>(4)</strong> Persistente Cookies: Wir benutzen außerdem persistente Cookies.
                                    Hierdurch können wir Informationen über Besucher festhalten, die wiederholt auf
                                    unsere Webseite zugreifen. Durch den Einsatz solcher Cookies können wir unsere
                                    Produkte und Dienstleistungen für Sie kontinuierlich verbessern. Diese persistenten
                                    Cookies enthalten keine personenbezogenen Daten. Die Daten, die in den Cookies
                                    gespeichert werden, werden zu keiner Zeit mit Ihren personenbezogenen Daten
                                    zusammengeführt.
                                    <br/><br/>
                                    <strong>(5)</strong> Widerspruchsrecht: Sie können das Setzen von Cookies verhindern
                                    und so der Erstellung von Nutzungsprofilen widersprechen, indem Sie in Ihrem Browser
                                    das Speichern von Cookies deaktivieren, auf bestimmte Webseiten beschränken oder
                                    Ihren Browser so einstellen, dass er sie benachrichtigt, sobald ein Cookie gesendet
                                    wird. Sie können Cookies auch jederzeit von der Festplatte Ihres PC löschen. Bitte
                                    beachten Sie aber, dass die Nutzung unserer Plattform nicht möglich ist, wenn
                                    Session-Cookies abgelehnt werden.
                                    </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§10 LOGFILES</h4>
                                <p className="protection-paragraph">Wenn Sie auf unsere Website zugreifen, werden
                                    automatisch mittels eines Cookies Informationen allgemeiner Natur erfasst.
                                    Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers,
                                    das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers
                                    und ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche
                                    keine Rückschlüsse auf Ihre Person zulassen.</p>
                                <p className="protection-paragraph">Diese Informationen sind technisch notwendig,
                                    um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen
                                    bei Nutzung des Internets zwingend an. Sie werden insbesondere zu
                                    folgenden Zwecken verarbeitet:</p>
                                <ul
                                    // className="protection-listing"
                                >
                                    <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                                    <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                                    <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                                    <li>zu weiteren administrativen Zwecken.</li>
                                </ul>
                                <p className="protection-paragraph">
                                    Die Verarbeitung Ihrer personenbezogenen Daten basiert auf unserem berechtigten
                                    Interesse aus den vorgenannten Zwecken zur Datenerhebung. Wir verwenden Ihre
                                    Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Empfänger der Daten
                                    sind nur die verantwortliche Stelle und ggf. Auftragsverarbeiter. Anonyme
                                    Informationen dieser Art werden von uns ggfs. statistisch ausgewertet, um unseren
                                    Internetauftritt und die dahinterstehende Technik zu optimieren.
                                </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§11 Verwendung von Scriptbibliotheken
                                    (Google Webfonts)</h4>
                                <p className="protection-paragraph">
                                    Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen,
                                    verwenden wir auf dieser Website Scriptbibliotheken und Schriftbibliotheken wie z.
                                    B. Google Webfonts (https://www.google.com/webfonts/). Google Webfonts werden zur
                                    Vermeidung mehrfachen Ladens in den Cache Ihres Browsers übertragen. Falls der
                                    Browser die Google Webfonts nicht unterstützt oder den Zugriff unterbindet, werden
                                    Inhalte in einer Standardschrift angezeigt.
                                    <br/><br/>
                                    Der Aufruf von Scriptbibliotheken oder Schriftbibliotheken löst automatisch eine
                                    Verbindung zum Betreiber der Bibliothek aus. Dabei ist es theoretisch möglich –
                                    aktuell allerdings auch unklar ob und ggf. zu welchen Zwecken – dass Betreiber
                                    entsprechender Bibliotheken Daten erheben.
                                    <br/><br/>
                                    Die Datenschutzrichtlinie des Bibliothekbetreibers Google finden Sie hier:

                                    <a
                                        href="https://www.google.com/policies/privacy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ip-links"
                                    >
                                        https://www.google.com/policies/privacy/
                                    </a>
                                </p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§12 WEBANALYSE</h4>
                                <p className="protection-paragraph">Diese Website benutzt Google Analytics, einen
                                    Webanalysedienst der Google Inc. (folgend: Google). Google Analytics verwendet sog.
                                    „Cookies“, also Textdateien, die auf Ihrem Computer gespeichert werden und die eine
                                    Analyse der Benutzung der Webseite durch Sie ermöglichen. Die durch das Cookie
                                    erzeugten Informationen über Ihre Benutzung dieser Webseite werden in der Regel
                                    an einen Server von Google in den USA übertragen und dort gespeichert. Aufgrund
                                    der Aktivierung der IP-Anonymisierung auf diesen Webseiten, wird Ihre IP-Adresse
                                    von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in
                                    anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor
                                    gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google
                                    in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website
                                    wird Google diese Informationen benutzen, um Ihre Nutzung der Webseite auszuwerten,
                                    um Reports über die Webseitenaktivitäten zusammenzustellen und um weitere mit der
                                    Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem
                                    Webseitenbetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem
                                    Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google
                                    zusammengeführt. Die Zwecke der Datenverarbeitung liegen in der Auswertung der
                                    Nutzung der Website und in der Zusammenstellung von Reports über Aktivitäten auf
                                    der Website. Auf Grundlage der Nutzung der Website und des Internets sollen dann
                                    weitere verbundene Dienstleistungen erbracht werden. Die Verarbeitung beruht auf
                                    dem berechtigten Interesse des Webseitenbetreibers. Sie können die Speicherung der
                                    Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir
                                    weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
                                    Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber
                                    hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der
                                    Webseite bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung
                                    dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link
                                    verfügbare Browser-Plugin herunterladen und installieren: Browser Add On zur
                                    Deaktivierung von Google Analytics. Zusätzlich oder als Alternative zum
                                    Browser-Add-On können Sie das Tracking durch Google Analytics auf unseren Seiten
                                    unterbinden, indem Sie diesen Link anklicken. Dabei wird ein Opt-Out-Cookie auf
                                    Ihrem Gerät installiert. Damit wird die Erfassung durch Google Analytics für diese
                                    Website und für diesen Browser zukünftig verhindert, so lange das Cookie in Ihrem
                                    Browser installiert bleibt.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§13 Änderung unserer Datenschutzbestimmungen</h4>
                                <p className="protection-paragraph">Wir behalten uns vor, diese Datenschutzerklärung
                                    anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder
                                    um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei
                                    der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue
                                    Datenschutzerklärung.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§14 ABRUFBARKEIT DER DATENSCHUTZBESTIMMUNGEN</h4>
                                <p className="protection-paragraph">
                                    Sie können diese Datenschutzbestimmungen von jeder Webseite von Radenbrock unter
                                    dem Link "Datenschutz" abrufen und ausdrucken.</p>
                            </div>
                            <div className="protection-block">
                                <h4 className="protection-sub-heading">§15 FESTSTEHENDE SPRACHE</h4>
                                <p className="protection-paragraph">Rechtsverbindliche Sprache der
                                    Datenschutzbestimmungen ist deutsch. Übersetzungen in andere Sprachen sind
                                    rechtlich nicht bindend. Im Falle von Auseinandersetzungen im Zusammenhang mit
                                    diesen Datenschutzbestimmungen ist ausschließlich die deutsche Textform maßgeblich.
                                    <br/>
                                    <br/> Stand der Datenschutzbestimmungen: 22. Mai 2018
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default PrivacyPolicy;
