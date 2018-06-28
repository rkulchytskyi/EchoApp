import React, { Component } from 'react';
import './Page404.css';
import { NavLink } from 'react-router-dom'
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import ScrollAnimation from 'react-animate-on-scroll';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';

class Page404 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {};
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
    
    // Here we can see what we getting after import component
    render() {
    
        const {isNavOverlayOpen} = this.props;
    
        let {windowWidth} = this.state;
        windowWidth = windowWidth || window.innerWidth;

        const isS = windowWidth <= 360,
                isM = windowWidth <= 768 && windowWidth > 360,
                isL = windowWidth <= 1024 && windowWidth > 768,
                isXL = windowWidth > 1024;
        
        
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    <section id="hero-section" className="hero-404-block">
                        <div className="light-black-bg-color"/>
                        <div className="parallax-line-404">
                            <Parallax
                                strength={-300}
                                blur={{ min: -15, max: 15 }}
                              >
                                <Background className="">
                                    {isXL &&
                                    <div className="">
                                        <img src="img/Liniengrafik_XL_404.svg" className="_404-graphic" alt=""/>
                                    </div>
                                    }
                                    {isL &&
                                    <div className="">
                                        <img src="img/Liniengrafik_L_404.svg" className="_404-graphic" alt=""/>
                                    </div>
                                    }
                                    {isM &&
                                    <div className="">
                                        <img src="img/Liniengrafik_M_404.svg" className="_404-graphic" alt=""/>
                                    </div>
                                    }
                                    {isS &&
                                    <div className="">
                                        <img src="img/Liniengrafik_S_404.svg" className="_404-graphic" alt=""/>
                                    </div>
                                    }
                                </Background>
                            </Parallax>
                        </div>
                        <div className="container">
                            <div className="hero-404__content">
                                <h1 className="hero-title main-title">404 Error</h1>
                                <div className="hero-subtext">Entschuldigung, da ist wohl etwas schief gelaufen.
                                    Die gesuchte Seite konnte leider nicht gefunden werden.</div>
                                <ScrollAnimation
                                    animateIn='bounceInLeft'
                                    animateOnce={true}
                                    delay={200}
                                    offset={20}
                                    initiallyVisible={true}
                                >
                                    <div className="right-view-button">
                                        <NavLink to="/" className="right-view-button-link">Zurück zur Startseite</NavLink>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

export default connect(mapStateToProps, null)(Page404);

