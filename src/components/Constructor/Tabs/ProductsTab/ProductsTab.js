import React, {Component} from 'react';
import './ProductsTab.css';
import scrollToComponent from 'react-scroll-to-component'
import { NavLink, Redirect } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class ProductsTab extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.onChangeLink = this.onChangeLink.bind(this);
    }
    
    componentDidMount() {
        scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), {
            offset: 0,
            align: 'top',
            duration: 500,
            ease: 'inCirc'
        });
    }
    
    onChangeLink(event){
        event.preventDefault();

        const href = event.target.dataset.href;
        const element = document.getElementById(href);

        if (!element) {
            this.setState({redirectToLogin: href})
        }
        scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), {
            offset: 0,
            align: 'middle',
            duration: 500,
            ease: 'inCirc'
        });
        setTimeout(() => window.location.hash = href, 500);
    }
    
    render() {
        const { redirectToLogin } = this.state;
        if (redirectToLogin) return <Redirect to={`/#${redirectToLogin}`}/>;

        return (
            <Tabs>
                <TabList>
                    <Tab><span>MANAGED ACCOUNTS</span></Tab>
                    <Tab><span>INDIZES</span></Tab>
                    <Tab><span>RESEARCH</span></Tab>
                </TabList>
                <TabPanel>
                    <div className="products-tab__content">
                        <p>Ein Investment ist nie lediglich als Selbstzweck zu verstehen - für
                            uns steht die Implementation innovativer Anlagestrategien immer auch
                            im Zeichen der Bedürfnisse unserer Klienten. Sollten Sie individuelle
                            Ansprüche an das Thema Vermögensverwaltung haben, bieten wir Ihnen
                            durch die Kooperation mit unseren vermögensverwaltenden Partnern
                            auf Sie abgestimmte Portfolien, welche unter anderem an unseren
                            Strategien partizipieren.</p>
                        <p>
                            Dabei profitieren Sie von der digitalen Managementstruktur unseres “Robo Advisory” Services,
                            welcher in Zukunft auch für Retail-Kunden zugänglich sein wird.</p>
                        <p>Dieser Service befindet sich aktuell im Aufbau. Nähere Informationen erhalten Sie, sobald
                            dieser zur Verfügung steht, auf unserer Detailseite zum
                            Thema <NavLink to="/retail">Managed Accounts.</NavLink></p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products-tab__content">
                        <p>Die kommenden Jahre stellen wirtschaftlich ein unfassbar spannendes Kapitel der
                            Weltgeschichte dar, stehen Sie doch für ungeahnte Zugewinne an Produktivität durch
                            künstliche Intelligenz sowie die Neuausrichtung etablierter Prozesse im Zuge
                            dezentralisierter Anwendungen und Digitalisierung.</p>
                        <p>Durch RADENBROCK entwickelte Anlagekonzepte versuchen, in vielerlei Hinsicht von diesen
                            Prozessen zu profitieren und diese einfach, flexibel und preiswert zugänglich zu
                            machen – in Kooperation mit vermögensverwaltenden Partnern bietet sich daher
                            beispielsweise der Zugang durch börsengelistete Verbriefungen, auch Exchange-Traded
                            Notes (ETNs) genannt.</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="products-tab__content">
                        <p>Gerne erarbeiten wir mit Ihnen individuelle Investmentstrategien auf Basis künstlicher
                            Intelligenz. Gemeinsame, börsengelistete Produkte sind darüber hinaus bereits ab sehr
                            attraktiven Minimuminvestments möglich und bieten interessante Beteiligungsstrukturen.
                        </p>
                        <p>Bei Interesse können Sie sich gerne jederzeit unter
                            <a
                                data-href='kontakt'
                                href="#kontakt"
                                onClick={this.onChangeLink}>
                                Kontakt
                            </a>
                            mit uns in Verbindung setzen.
                        </p>
                    </div>
                </TabPanel>
            </Tabs>
        );
    }
}

export default ProductsTab;