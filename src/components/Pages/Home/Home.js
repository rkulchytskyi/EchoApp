import React, { Component } from 'react'
import './Home.css'
import 'animate.css/animate.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import ScrollAnimation from 'react-animate-on-scroll';
import { Parallax, Background } from 'react-parallax';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import MainContactForm from '../../Constructor/MainContactForm/MainContactForm'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import StarterBlock from '../../Constructor/StarterBlock/StarterBlock'
import { connect } from 'react-redux';

class Home extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.next2 = this.next2.bind(this);
        this.previous2 = this.previous2.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
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
    
        let {windowWidth} = this.state;
        windowWidth = windowWidth || window.innerWidth;
    
        // Change menu layout on width size
        const isMobile = windowWidth <= 768,
            isIPad = windowWidth <= 1024;
        
        const isS = windowWidth <= 360,
            isM = windowWidth <= 768 && windowWidth > 360,
            isL = windowWidth <= 1024 && windowWidth > 768,
            isXL = windowWidth > 1024;
        
        return (
            
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
                                    <h1 className="hero-title main-title" >
                                        Genetische Evolution trifft auf Finanzmärkte</h1>
                                </ScrollAnimation>
                                <ScrollAnimation
                                    animateIn='fadeIn'
                                    animateOnce={true}
                                    delay={200}
                                    offset={20}
                                    initiallyVisible={true}
                                >
                                    <div className="hero-subtext-copy sub-line white-st">
                                        Quantitativer Strategieansatz durch innovative Technologie</div>
                                </ScrollAnimation>
                                <ScrollAnimation
                                    animateIn='fadeIn'
                                    animateOnce={true}
                                    delay={2000}
                                    offset={20}
                                    initiallyVisible={isIPad}>
                                    <a href="mailto:service@radenbrock.com"
                                       className="hero-text-link btn-arrow-small white-st"
                                    >
                                        INFORMIEREN SIE SICH<br/>ÜBER UNSERE ANWENDUNGSBEREICHE
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
                                initiallyVisible={isIPad}
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
                    <section id="vorteile" className="features-wrapper w-clearfix">
                        <div className="features">
                            <div className="container">
                                <div className="features-flex w-hidden-medium w-hidden-small w-hidden-tiny">
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="fadeIn"
                                            animateOnce={true}
                                            offset={20}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_unabhaengig.svg"
                                                width="160"
                                                className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Unabhängig</h3>
                                            <p className="paragraph">
                                                Als Anbieter aktiver Anlagestrategien entwickeln wir autonome
                                                Algorithmen, welche sich den dynamischen Marktgegebenheiten jederzeit
                                                anpassen. Damit profitieren Sie flexibel und transparent von bisher
                                                schwer zugänglichen Investmentstrategien.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="fadeIn"
                                            animateOnce={true}
                                            offset={20}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_Individuell.svg"
                                                width="156" className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Individuell</h3>
                                            <p className="paragraph">
                                                Radenbrock entwickelt individuelle Einzelstrategien, welche jeweils für
                                                sich geringe Marktineffizienzen ausnutzen.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="fadeIn"
                                            animateOnce={true}
                                            offset={20}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_Innovativ.svg"
                                                width="120"
                                                className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title head-line-small">Innovativ</h3>
                                            <p className="paragraph">
                                                Unser Investmentansatz verbindet innovative Modelle aus Biologie und
                                                Physik mit bewährten Methoden aus dem Bereich künstlicher Intelligenz
                                                und Big-Data-Analyse. Radenbrock demokratisiert diesen Prozess und
                                                bietet quantitative Investmentsysteme als aktiven Diversifikator.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="slider w-hidden-main w-slider">
                                    <div className="w-slider-mask">
                                        <Slider ref={c => this.slider = c } {...settings}>
                                            <div className="w-slide">
                                                <div className="feature">
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_unabhaengig.svg"
                                                        width="120"
                                                        className="feature-image"
                                                    />
                                                    <div className="feature-texts">
                                                        <h3 className="secondary-title head-line-small">Unabhängig</h3>
                                                        <p className="paragraph">
                                                            Als Anbieter aktiver Anlagestrategien entwickeln wir
                                                            autonome Algorithmen, welche sich den dynamischen
                                                            Marktgegebenheiten jederzeit anpassen. Damit profitieren
                                                            Sie flexibel und transparent von bisher schwer zugänglichen
                                                            Investmentstrategien.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-slide">
                                                <div className="feature">
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_Individuell.svg"
                                                        width="120"
                                                        className="feature-image"
                                                    />
                                                    <div className="feature-texts">
                                                        <h3 className="secondary-title head-line-small">Individuell</h3>
                                                        <p className="paragraph">
                                                            Radenbrock entwickelt individuelle Einzelstrategien,
                                                            welche jeweils für sich geringe Marktineffizienzen
                                                            ausnutzen.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-slide">
                                                <div className="feature">
                                                    <img
                                                        alt=""
                                                        src="img/170805_Radenbrock_Icons_Innovativ.svg"
                                                        width="80"
                                                        className="feature-image"
                                                    />
                                                    <div className="feature-texts">
                                                        <h3 className="secondary-title head-line-small">Innovativ</h3>
                                                        <p className="paragraph">
                                                            Unser Investmentansatz verbindet innovative Modelle aus
                                                            Biologie und Physik mit bewährten Methoden aus dem Bereich
                                                            künstlicher Intelligenz und Big-Data-Analyse. Radenbrock
                                                            demokratisiert diesen Prozess und bietet quantitative
                                                            Investmentsysteme als aktiven Diversifikator.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                    <div className="w-slider-arrow-left" onClick={this.previous}>
                                        <div className="icon reverce w-icon-slider-left"/>
                                    </div>
                                    <div className="w-slider-arrow-right" onClick={this.next}>
                                        <div className="icon w-icon-slider-right"/>
                                    </div>
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
                    <section id="strategie" className="service-main-block">
                        <div className="container w-clearfix">
                            <div className="service-block__inner">
                                <div className="image-wrapper-block"/>
                                <img
                                    alt=""
                                    src="img/170805_Radenbrock_Icons_Genetic_Programming.svg"
                                    width="620"
                                    className="service-image"
                                />
                                <div className="service-texts">
                                    <img alt="" src="img/Heading%20Line.svg" />
                                    <div className="text-main">
                                        <h3 className="secondary-title head-line-small">Survival of the Fittest</h3>
                                        <p className="paragraph">
                                            Unser Strategieentwicklungsprozess basiert auf dem Modell genetischer
                                            Algorithmen. Durch das Hinzuziehen möglichst umfangreicher Marktdaten
                                            entwickelt unsere Software Millionen unterschiedlicher
                                            „Strategiepopulationen“ und setzt sie daraufhin unterschiedlicher
                                            Stresssituationen aus, beispielsweise den Eigenschaften einer Finanzkrise.
                                            Populationen, welche während dieser Phase Risikoparameter überschreiten,
                                            werden aussortiert. Das Ergebnis sind somit stabile Algorithmen, welche auf
                                            fundamentale Logik in ihrem Handelsstil untersucht und anschließend in die
                                            Gesamtstrategie aufgenommen werden.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="sicherheit" className="safety retail-view w-clearfix">
                        <div className="container w-clearfix">
                            <div className="safety-text-wrapper">
                                <div className="safety-container"><img alt="" src="img/Heading%20Line.svg" />
                                    <div className="text-main">
                                        <h3 className="secondary-title head-line-small">Sicherheit</h3>
                                        <p className="paragraph">Bei Investitionen in spekulative Strategien steht
                                            <br/>das Management potentieller Risiken an erster Stelle, sowohl in der
                                            Entwicklung der Anlagekonzepte, als auch in der Umsetzung.
                                            Kunden können bereits vorab feste Verlustschwellen sowie die
                                            Risikobereitschaft ihres Handelsstils definieren. </p>
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
                                                    24/7 Kontrolle der Handels-aktivitäten durch statistische
                                                    Strategieüberwachung</p>
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
                        <div className="dark features">
                            <div className="container">
                                <div className="features-flex w-hidden-medium w-hidden-small w-hidden-tiny">
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_Standort.svg"
                                                width="159"
                                                className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title white-text head-line-small white-st">
                                                Standort
                                            </h3>
                                            <p className="paragraph white-text">
                                                Unsere Handelsstrategien arbeiten auf Servern deutscher
                                                Rechenzentren.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_Datenschutz.svg"
                                                width="132"
                                                className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title white-text head-line-small white-st">
                                                Datenschutz
                                            </h3>
                                            <p className="paragraph white-text">
                                                Radenbrock und unsere Partner berücksichtigen deutsche und europäische
                                                Datenschutz-standards. Alle Daten werden mit Diskretion verarbeitet.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <ScrollAnimation
                                            animateIn="bounceIn"
                                            animateOnce={true}
                                            offset={500}
                                            initiallyVisible={true}
                                        >
                                            <img
                                                alt=""
                                                src="img/170805_Radenbrock_Icons_Kontrolle.svg"
                                                width="141"
                                                className="feature-image"
                                            />
                                        </ScrollAnimation>
                                        <div className="feature-texts">
                                            <h3 className="secondary-title white-text head-line-small white-st">
                                                Kontrolle
                                            </h3>
                                            <p className="paragraph white-text">
                                                Die Handelsstrategien unterliegen einer ständigen Kontrolle
                                                und werden bei Bedarf angepasst.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider small w-hidden-main w-slider">
                                <div className="w-slider-mask">
                                    <Slider ref={c => this.slider2 = c } {...settings}>
                                        <div className="w-slide">
                                            <div className="feature">
                                                <img alt=""
                                                     src="img/170805_Radenbrock_Icons_Standort.svg"
                                                     width="120"
                                                     className="feature-image"
                                                />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title white-text head-line-small white-st">
                                                        Standort
                                                    </h3>
                                                    <p className="paragraph white-text">
                                                        Unsere Handelsstrategien arbeiten auf Servern deutscher
                                                        Rechenzentren.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-slide">
                                            <div className="feature">
                                                <img
                                                    alt=""
                                                    src="img/170805_Radenbrock_Icons_Datenschutz.svg"
                                                    width="90"
                                                    className="feature-image" />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title white-text head-line-small white-st">
                                                        Datenschutz
                                                    </h3>
                                                    <p className="paragraph white-text">
                                                        Radenbrock und unsere Partner berücksichtigen deutsche und
                                                        europäische Datenschutz-standards. Alle Daten werden mit
                                                        Diskretion verarbeitet.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-slide">
                                            <div className="feature">
                                                <img
                                                    alt=""
                                                    src="img/170805_Radenbrock_Icons_Kontrolle.svg"
                                                    width="100"
                                                    className="feature-image"
                                                />
                                                <div className="feature-texts">
                                                    <h3 className="secondary-title white-text head-line-small white-st">
                                                        Kontrolle
                                                    </h3>
                                                    <p className="paragraph white-text">
                                                        Die Handelsstrategien unterliegen ständiger Kontrolle und
                                                        werden bei Bedarf angepasst.</p>
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
        );
    }
}

function mapStateToProps(state){
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

export default connect(mapStateToProps, null)(Home)
