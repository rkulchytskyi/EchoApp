import React, {Component} from 'react';
import './Strategy.css';

import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

//Redux
import * as configActions from '../../../actions/configActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Strategy extends Component {
    constructor(props) {
        super(props);
        
        this.state = {};
    }
    
    // Here we can see what we getting after import component
    render() {
    
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            swipe: true,
            arrows: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            init: () => {
                this.setState({
                    newIndex: 0
                });
            },
            beforeChange: (oldIndex, newIndex) => {
                this.setState({
                    newIndex
                });
            }
        };
        
        const {isNavOverlayOpen} = this.props;
        
        const {newIndex} = this.state;
        
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                    
                    <section className="strategy__content">
                        
                        <div className="container">
                            <div className="strategy__inner">
                                <div className="strategy__title main-title white-st">STRATEGIE</div>
                                <div className="strategy__text sub-line white-st">Datenanalyse,
                                    Strategieentwicklung, Risikomanagement – non-lineare
                                    Zusammenhänge dominieren unseren Arbeitsalltag.</div>
                            </div>
                        </div>
                        <div className="strategy__background"></div>
                    
                    </section>
                    <section className="strategy__content">
                        <div className="container">
                            <div className="strategy-area__content">
                                <div className="strategy-area__slider">
                                    <div className="strategy-area__image_inner">
                                        <div className={`${newIndex === 0 ? 'active':' '} strategy-area__image`}>
                                            <img alt="" src="img/170805_Radenbrock_Icons_Genetic_Programming.svg" className="strategy-area__image-src" />
                                        </div>
                                        <div className={`${newIndex === 1 ? 'active':' '} strategy-area__image`}>
                                            <img alt="" src="img/1802241_Radenbrock_Icons_Machine_Learning.svg"  className="strategy-area__image-src fix-img2" />
                                        </div>
                                        <div className={`${newIndex === 2 ? 'active':' '} strategy-area__image`}>
                                            <img alt="" src="img/1802241_Radenbrock_Icons_Protfolio_Weighting.svg" className="strategy-area__image-src fix-img3" />
                                        </div>
                                    </div>
                                    <div className="strategy-area__slide_inner">
                                        <Slider {...settings}>
                                            <div className={`${newIndex === 0 ? 'active':' '} strategy-area__item`}>
                                                <div className="strategy-area__item_inner">
                
                                                    <div className="strategy-area__info">
                                                        <img alt="" src="img/Heading%20Line.svg" />
                                                        <div className="text-main">
                                                            <h3 className="secondary-title head-line-small">KONZEPTION</h3>
                                                            <p className="paragraph">Durch die Untersuchung von
                                                                Finanzdaten und Marktstrukturen versuchen unsere
                                                                proprietären Programme, non-lineare Marktineffizienzen
                                                                oder -auffäligkeiten zu klassifizieren und darauf
                                                                aufbauende Handelssignale zu entwickeln, immer
                                                                in Hinblick auf die Korrelation zu anderen
                                                                Strategiebausteinen.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${newIndex === 1 ? 'active':' '} strategy-area__item`}>
                                                <div className="strategy-area__item_inner">
                
                                                    <div className="strategy-area__info">
                                                        <img alt="" src="img/Heading%20Line.svg" />
                                                        <div className="text-main">
                                                            <h3 className="secondary-title head-line-small">BIG DATA</h3>
                                                            <p className="paragraph">Abgeleitete Strategien werden
                                                                daraufhin auf ihr Verhalten in hoch- oder
                                                                niedrig-volatilen Marktphasen untersucht.
                                                                Durch die Hinzunahme von Informationsquellen wie
                                                                Wetter oder Nachrichten antizipieren wir daraufhin
                                                                den jeweils aktuellen Marktzustand in Hinsicht
                                                                auf Volatilität.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${newIndex === 2 ? 'active':' '} strategy-area__item`}>
                                                <div className="strategy-area__item_inner">
                
                                                    <div className="strategy-area__info">
                                                        <img alt="" src="img/Heading%20Line.svg" />
                                                        <div className="text-main">
                                                            <h3 className="secondary-title head-line-small">GEWICHTUNG</h3>
                                                            <p className="paragraph">Je nach aktuellem Marktzustand
                                                                werden somit unterschiedliche Strategiebausteine
                                                                verschiedener Märkte gewichtet und zu einem
                                                                gemeinsamen Anlagekonzept verbunden.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                    
                                </div>
                                
                                    
                                
                            </div>
                        
                        </div>
                        <div className="strategy-area__background">
                            {/*<div className="strategy-area__background-inner"></div>*/}
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

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Strategy)

