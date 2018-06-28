import React, {Component} from 'react';
import './Fonds.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import {connect} from 'react-redux';

class Fonds extends Component {
    render() {
        const {isNavOverlayOpen} = this.props;
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    <section className="hero-fonds__content">
                        <div className="container">
                            <div className="hero-fonds__inner">
                                <div className="hero-fonds__title">FONDS</div>
                                <div className="hero-fonds__text">In vier einfachen Schritten zu
                                    ihrem perfönlichen Portfolio.. Platzhaltertext. Auch hier reichen
                                    zwei/drei Zeilen </div>
                            </div>
                        </div>
                        <div className="hero-fonds__background"/>
                    </section>
                    <section className="hero-fonds__content fonds-area">
                        <div className="container">
                            <div className="fonds-area__content">
                                <div className="fonds-area__desc">
                                    <img alt="" src="img/Heading%20Line.svg" />
                                    <div className="fonds-area__text">
                                        <h3 className="fonds-area__title">RADENBROCK AI ALPHA ETF
                                        </h3>
                                        <div className="fonds-area__info">
                                            <div>ISIN LU293840592043 | WKN 839503</div>
                                            <p>Unser Exchange Traded Fund "RADENBROCKTM AI ABSOLUT RETURN" ist
                                                dem Ziel gewidmet, eine attraktive und zu Aktienmärkten
                                                unkorrelierte Rendite über Marktniveau zu bieten.  Dabei
                                                setzt das Produkt sowohl auf quantitative Aspekte der nonlinearen
                                                Statistik, besser bekannt als "Machine Learning" oder "Künstliche
                                                Intelligenz", als auch auf qualitative Faktoren durch die Partizipation
                                                an für die Branche wichtigen Infrastrukturaktien.
                                            </p>
                                            <p>Für jedes gehandelte Produkt werden dabei, individuell angepasst auf
                                                Charakteristika des Marktes, unterschiedliche Strategien verfolgt -
                                                alle mit der Prämisse, statistische Vorteile durch die Analyse großer
                                                Datenmengen zu erreichen. Ein elementarer Aspekt ist dabei das
                                                innovative Risiko-management innerhalb des Vehikels.
                                            </p>
                                            <p>Das Anlageuniversum umfasst Futures aus allen Bereichen, unter
                                                anderem Rohstoffe, Edelmetalle, Aktienindizes, Staatsanleihen oder
                                                Volatilitätsindizes, sowie hochliquide Aktieneinzeltitel aus den USA.
                                            </p>
                                            <p>Bei "RADENBROCKTM AI ABSOLUT RETURN" handelt es sich um ein Produkt
                                                für qualifizierte Anleger. Eine Investition ist ab 125.000 Euro
                                                möglich.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="fonds-area__chart">
                                    <div className="fonds-area__chart_area">
                                    </div>
                                    <div className="fonds-area__download">
                                        <div className="fonds-area__subtitle">Downloadbereich:</div>
                                        <div className="fonds-area__download_area">
                                            <a
                                                href="pdf/170329_Radenbrock_Salesfolder_B2C.pdf"
                                                className="fonds-area__download_btn"
                                                target="_blank"
                                            >
                                                <span>Emissionsprospekt</span>
                                            </a>
                                            <a href="pdf/Muster_AG_Wertpapierprospekt_1.pdf"
                                               className="fonds-area__download_btn"
                                               target="_blank"
                                            >
                                                <span>Werbebroschüre</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="fonds-area__details">
                                        <div className="fonds-area__subtitle">Produktdetails:</div>
                                        <div className="fonds-area__product-detail">
                                            <div className="fonds-area__item">
                                                <span className="fonds-area__item_name">Management Fee</span>
                                                <span>0,75 % per annum</span>
                                            </div>
                                            <div className="fonds-area__item">
                                                <span className="fonds-area__item_name">Performance Fee</span>
                                                <span>15,00 % High-Watermark</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fonds-area__background"/>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

export default connect(mapStateToProps, null)(Fonds)

