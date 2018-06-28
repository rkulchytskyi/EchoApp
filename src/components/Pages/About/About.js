import React, {Component} from 'react';
import './About.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';

class About extends Component {
    render() {
        const {isNavOverlayOpen} = this.props;
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    <section className="hero-about__content">
                        <div className="container">
                            <div className="hero-about__inner">
                                <div className="hero-about__title">ÜBER</div>
                                <div className="hero-about__text">Erfahren Sie mehr
                                    über unser Unternehmen, unser Selbstverständnis – und unsere
                                    Zukunftsperspektive. </div>
                            </div>
                        </div>
                        <div className="hero-about__background"/>
                    </section>
                    <section className="hero-about__content">
                        <div className="container">
                            <div className="about-area__content">
                                <p>
                                    Globalisierung, stetige Automatisierung in Industrie und Wirtschaft,
                                    eine anhaltende Niedrigzinspolitik sowie die immer striktere Regulation von
                                    Kapitalmärkten - die Entwicklungen der vergangenen Jahre haben dazu geführt,
                                    dass etablierte Modelle der Finanzwelt hinterfragt, makroökonomische Grundfeiler
                                    gar vollständig überarbeitet werden müssen.
                                </p>
                                <p>Als Boutique für innovative Kapitalmarktkonzepte nutzt RADENBROCK
                                    Big-Data-Modelle, maschinelles Lernen und fortlaufende Optimierungsprozesse,
                                    um nonlineare Zusammenhänge zu identifizieren und Anlagestrategien mit attraktiven
                                    Gewinn- und Risikoparametern zu entwickeln. Anstatt Finanzmärkten ein
                                    makroökonomisches Modell aufzuzwingen, entwickeln wir unsere Handelssysteme aus dem
                                    quantitativen „Charakter“ des jeweiligen Anlageproduktes heraus. Unsere Algorithmen
                                    verändern sich so mit jedem Tag weiter, um innovativ und leistungsstark zu
                                    bleiben.
                                </p>
                                <p>Wir sind davon überzeugt, dass künstliche Intelligenz und die anhaltende
                                    Digitalisierung, beispielsweise auch im Rahmen von Blockchain-Prozessen, die Welt
                                    der
                                    nächsten Jahre prägen wird. RADENBROCK hilft Ihnen, transparent und kosteneffizient
                                    daran zu partizipieren.
                                </p>
                                <p>
                                    Nähere Details zu unserem Strategieansatz finden Sie unter
                                    <NavLink to="/strategy" >Strategie</NavLink>.
                                </p>
                            </div>
                        </div>
                        <div className="about-area__background">
                        </div>
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

export default connect(mapStateToProps, null)(About)

