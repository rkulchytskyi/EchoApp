import React, { Component } from 'react'
import './CorporateView.css'
import 'animate.css/animate.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import scrollToComponent from 'react-scroll-to-component'
import Slider from 'react-slick';
import ScrollAnimation from 'react-animate-on-scroll';
import { Parallax, Background } from 'react-parallax';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import MainContactForm from '../../Constructor/MainContactForm/MainContactForm'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import StarterBlock from '../../Constructor/StarterBlock/StarterBlock'
import { connect } from 'react-redux';

class CorporateView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.next2 = this.next2.bind(this);
        this.previous2 = this.previous2.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.isIE = this.isIE.bind(this);
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
        scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), {
            offset: 0,
            align: 'middle',
            duration: 500,
            ease: 'inCirc'
        });
        
        // Check IE
        window.addEventListener('load', this.isIE);
        if (this.isIE()){
            this.setState({
                isIE: true
            })
        }
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }
    
    isIE(){
        let ua = navigator.userAgent;
        /* MSIE used to detect old browsers and Trident used to newer ones*/
        return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }
    
    // Sliders arrow initialization
    next() {
        this.slider.slickNext()
    }
    previous() {
        this.slider.slickPrev()
    }
    
    next2() {
        this.slider2.slickNext()
    }
    previous2() {
        this.slider2.slickPrev()
    }

    // Here we can see what we getting after import component
    render() {
        const {isNavOverlayOpen} = this.props;
        
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    
        let {windowWidth, isIE} = this.state;
        windowWidth = windowWidth || window.innerWidth;
    
        // Change menu layout on width size
        const isMobile = windowWidth <= 479,
            isIPad = windowWidth <= 1024;
    
        const isS = windowWidth <= 360,
            isM = windowWidth <= 768 && windowWidth > 360,
            isL = windowWidth <= 1024 && windowWidth > 768,
            isXL = windowWidth > 1024;
       
        return (
            <Parallax ref='parallax' pages={2} className="parallax-wrapper">
            <div className="wrapper">
                <NavOverlay />
                <div id="fixed-nav" className="header">
                    {isXL &&
                    <img src="img/XL_Opener_LandingPage.svg" className="hero-graphic" alt=""/>
                    }
                    {isL &&
                    <img src="img/L_Opener_LandingPage.svg" className="hero-graphic" alt=""/>
                    }
                    {isM &&
                    <img src="img/M_Opener_LandingPage.svg" className="hero-graphic" alt=""/>
                    }
                    {isS &&
                    <img src="img/S_Opener_LandingPage.svg" className="hero-graphic" alt=""/>
                    }
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    <section id="hero-section" className="hero">
                        <div className="container">
                            <div className="animation-text">
                                <ScrollAnimation
                                    animateIn='fadeIn'
                                    animateOnce={true}
                                    delay={200}
                                    offset={20}
                                    initiallyVisible={true}
                                >
                                    <h1 className="hero-title main-title" >Digitale <br />
                                        Kapitalmarktkonzepte</h1>
                                </ScrollAnimation>
                                <ScrollAnimation
                                    animateIn='fadeIn'
                                    animateOnce={true}
                                    delay={200}
                                    offset={20}
                                    initiallyVisible={true}
                                >
                                    <div className="hero-subtext-copy sub-line white-st">Finanzen 2.0. – Innovative
                                        Investmentstrategien auf Basis maschinellen Lernens</div>
                                </ScrollAnimation>
                                <ScrollAnimation
                                    animateIn='fadeIn'
                                    animateOnce={true}
                                    delay={2000}
                                    offset={20}
                                    initiallyVisible={!(isIE || isIPad)}
                                >
                                    <a
                                        href="mailto:service@radenbrock.com"
                                        className="hero-text-link btn-arrow-small white-st"
                                    >
                                        KONTAKTIEREN SIE UNS FÜR <br />
                                        MASSGESCHNEIDERTE DIENSTLEISTUNGEN
                                    </a>
                                </ScrollAnimation>
                            </div>
                        </div>
                        <div className="hero-background"/>
                        <a href="mailto:service@radenbrock.com" className="hero-text-link-img">
                            <ScrollAnimation
                                animateIn='bounceInLeft'
                                animateOnce={true}
                                delay={1000}
                                offset={20}
                                initiallyVisible={!(isIE || isIPad)}
                            >
                                <img
                                    alt=""
                                    src="https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/598f02c090707d00013bf3b6_Underline.svg"
                                    data-ix="text-appear-3"
                                    className="image"
                                />
                            </ScrollAnimation>
                        </a>
                    </section>
                </div>
                <div className="content">
                    <section id="vorteile" className="features-wrapper corporate-wrapper w-clearfix">
                        <div className="features">
                            <div className="feature-corporate">
                                <div className="feature-corporate__title">
                                   “Die zukunft hat viele namen: Für Schwache ist sie das unerreichbare,
                                   für die furchtsamen das unbekannte, für die mutigen die chance”
                                </div>
                                <div className="feature-corporate__signature">- Victor Hugo -</div>
                                <div className="feature-corporate__text">
                                    <p>
                                        Als Boutique für innovative Kapitalmarktkonzepte nutzt RADENBROCK
                                        Big-Data-Modelle, maschinelles Lernen und fortlaufende Optimierungsprozesse,
                                        um nonlineare Zusammenhänge zu identifizieren und Anlagestrategien mit
                                        attraktiven Gewinn- und Risikoparametern zu entwickeln. Anstatt
                                        Finanzmärkten ein makroökonomisches Modell aufzuzwingen, entwickeln wir
                                        unsere Handelssysteme aus dem quantitativen „Charakter“ des jeweiligen
                                        Anlageproduktes heraus. Unsere Algorithmen verändern sich so mit jedem
                                        Tag weiter, um innovativ und leistungsstark zu bleiben.
                                    </p>
                                    <p>
                                        Wir sind davon überzeugt, dass künstliche Intelligenz und die anhaltende
                                        Digitalisierung, beispielsweise auch im Rahmen von Blockchain-Prozessen,
                                        die Welt der nächsten Jahre prägen wird. RADENBROCK hilft Ihnen, transparent
                                        und kosteneffizient daran zu partizipieren.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="orange-image-bg">
                        <StarterBlock />
                        <div className="compnies-logos w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny">
                            <img alt="" src="img/tu-v@2x.png" className="company-image" />
                            <img alt="" src="img/tu-v@2x.png" className="company-image" />
                            <img alt="" src="img/tu-v@2x.png" className="company-image" />
                        </div>
                    </div>
                    <section id="sicherheit" className="safety corp-view w-clearfix">
                        <div className="container w-clearfix">
                            <div className="safety-text-wrapper">
                                <div className="safety-container"><img alt="" src="img/Heading%20Line.svg" />
                                    <div className="text-main">
                                        <h3 className="secondary-title head-line-small">Sicherheit</h3>
                                        <p className="paragraph">Bei alternativen Anlagekonzepten steht das Management
                                            potentieller Risiken an erster Stelle, sowohl in der Entwicklung, als auch
                                            in der Umsetzung durch vermögensverwaltende Partner. Im Zusammenspiel und
                                            der Gewichtung unterschiedlicher Strategieanteile vereint RADENBROCK
                                            etablierte Modelle mit innovativen Möglichkeiten der
                                            Volatilitätsmessung.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="parallax-block">
                                <Parallax strength={-300} >
                                    <Background className="custom-bg">
                                        <div className="safety-features">
                                            <div data-ix="services-image" className="safety-feature">
                                                <ScrollAnimation
                                                    animateIn="bounceIn"
                                                    animateOnce={true}
                                                    delay={1000}
                                                    offset={20}
                                                    initiallyVisible={true}
                                                >
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_Risikoueberwachung.svg"
                                                        width="80"
                                                        className="services-image"
                                                    />
                                                </ScrollAnimation>
                                                <p className="safety-paragraph">
                                                    Moderne Risikoüberwachung durch innovative Analysemodelle
                                                </p>
                                            </div>
                                            <div data-ix="services-image-2" className="safety-feature">
                                                <ScrollAnimation
                                                    animateIn="bounceIn"
                                                    animateOnce={true}
                                                    delay={1000}
                                                    offset={20}
                                                    initiallyVisible={true}
                                                >
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_Portfolioueberwachung.svg"
                                                        width="80"
                                                        className="services-image"
                                                    />
                                                </ScrollAnimation>
                                                <p className="safety-paragraph">
                                                    24/7 Kontrolle der Handels-aktivitäten durch
                                                    statistische Strategieüberwachung
                                                </p>
                                            </div>
                                            <div data-ix="services-image-3" className="last-child safety-feature">
                                                <ScrollAnimation
                                                    animateIn="bounceIn"
                                                    animateOnce={true}
                                                    delay={1000}
                                                    offset={20}
                                                    initiallyVisible={true}
                                                >
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_Ansprechpartner.svg"
                                                        width="80"
                                                        className="services-image"
                                                    />
                                                </ScrollAnimation>
                                                <p className="safety-paragraph">
                                                    Persönlicher Ansprechpartner bei Fragen und Problemen
                                                </p>
                                            </div>
                                        </div>
                                    </Background>
                                </Parallax>
                            </div>
                        </div>
                        <div className=" features">
                            <div className="container">
                                <div className="features-flex w-hidden-medium w-hidden-small w-hidden-tiny">
                                    <div data-ix="feature-image1" className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}
                                        >
                                            <img alt="" src="img/180220_Radenbrock_Icons_Index_produkte.svg" width="159"
                                                 className="feature-image"/>
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Indizes</h3>
                                            <p className="paragraph">Unsere Indexprodukte bieten Ihnen den
                                                Zugriff auf innovative Strategiekonzepte auf Basis machinellen
                                                Lernens und digitalen Trends. Sie können maßgeschneitert für Sie
                                                entwickelt werden.</p>
                                        </div>
                                    </div>
                                    <div data-ix="feature-image-2" className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}
                                        >
                                            <img alt="" src="img/180220_Radenbrock_Icons_Managed_Accounts.svg"
                                                 width="132" className="feature-image"/>
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Managed Accounts</h3>
                                            <p className="paragraph ">Unsere Plattform bietet Ihnen die Möglichkeit,
                                                das auf Ihre Bedürfnisse angepasste Konto mit unseren
                                                vermögensverwaltenden Partnern stets im Blick zu haben.</p>
                                        </div>
                                    </div>
                                    <div data-ix="feature-image-3" className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}>
                                            <img alt="" src="img/170805_Radenbrock_Icons_unabhaengig.svg" width="141"
                                                 className="feature-image"/>
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Research</h3>
                                            <p className="paragraph ">Machinelles Lernen bietet vielfältige
                                                Einsatzmöglichkeiten, von der Verarbeitung von Informationen
                                                bis zum Management von Risiken. Wir helfen Ihnen, Lösungen
                                                zu finden.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-animation="slide" data-duration="500" data-infinite="1"
                                 className="slider small w-hidden-main w-slider"
                            >
                                <div className="w-slider-mask">
                                    <Slider ref={c => this.slider2 = c } {...settings}>
                                        <div className="w-slide">
                                            <div data-ix="feature-image1" className="feature">
                                                <img alt="" src="img/180220_Radenbrock_Icons_Index_produkte.svg"
                                                     width="120" className="feature-image" />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title head-line-small">Indizes</h3>
                                                    <p className="paragraph ">Unsere Indexprodukte bieten Ihnen den
                                                        Zugriff auf innovative Strategiekonzepte auf Basis machinellen
                                                        Lernens und digitalen Trends. Sie können maßgeschneitert für
                                                        Sie entwickelt werden.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-slide">
                                            <div data-ix="feature-image-2" className="feature">
                                                <img alt="" src="img/180220_Radenbrock_Icons_Managed_Accounts.svg"
                                                     width="90" className="feature-image" />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title head-line-small">
                                                        Managed Accounts
                                                    </h3>
                                                    <p className="paragraph ">
                                                        Unsere Plattform bietet Ihnen die Möglichkeit, das auf Ihre
                                                        Bedürfnisse angepasste Konto mit unseren vermögensverwaltenden
                                                        Partnern stets im Blick zu haben.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-slide">
                                            <div data-ix="feature-image-3" className="feature">
                                                <img alt="" src="img/170805_Radenbrock_Icons_unabhaengig.svg"
                                                     width="100" className="feature-image" />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title head-line-small">Research</h3>
                                                    <p className="paragraph ">Machinelles Lernen bietet vielfältige
                                                        Einsatzmöglichkeiten, von der Verarbeitung von Informationen
                                                        bis zum Management von Risiken. Wir helfen Ihnen, Lösungen
                                                        zu finden.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                                <div className="w-slider-arrow-left" onClick={this.previous2}>
                                    <div className="icon reverce w-icon-slider-left"/>
                                </div>
                                <div className="w-slider-arrow-right" onClick={this.next2}>
                                    <div className="icon w-icon-slider-right"/>
                                </div>
                            </div>
                        </div>
                        <StarterBlock />
                        <div className="parallax-line">
                            <Parallax strength={300}>
                                <Background className="custom-bg">
                                    {isMobile ?
                                        <img alt="" src="img/Liniengrafik_M_Safety.svg" className="safety-graphic" />
                                        :
                                        <img alt="" src="img/XL_Safety_LandingPage.svg" className="safety-graphic" />
                                    }
                                </Background>
                            </Parallax>
                        </div>
                    </section>
                    <section id="kontakt" className="contact">
                        <MainContactForm />
                    </section>
                </div>
                <Footer biggerPagging={true}/>
            </div>
            </Parallax>
        );
    }
}

function mapStateToProps(state){
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

export default connect(mapStateToProps, null)(CorporateView)
