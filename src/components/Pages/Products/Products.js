import React, {Component} from 'react';
import './Products.css';
import MainMenu from '../../Constructor/MainMenu/MainMenu'
import Footer from '../../Constructor/Footer/Footer'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import ProductsTab from '../../Constructor/Tabs/ProductsTab/ProductsTab'
import {connect} from 'react-redux';

class Products extends Component {
    render() {
        const {isNavOverlayOpen} = this.props;
        return (
            <div className="wrapper">
                <NavOverlay/>
                <div id="fixed-nav" className="header">
                    <MainMenu isNavOverlayOpen={isNavOverlayOpen}/>
                </div>
                <section className="hero-products__content">
                    <div className="container">
                        <div className="hero-products__inner">
                            <div className="hero-products__title">PRODUKTE</div>
                            <div className="hero-products__text">Lernen Sie unser Produktspektrum und unsere
                                maßgeschneiderten Dienstleistungen kennen.</div>
                        </div>
                    </div>
                    <div className="hero-products__background"/>
                </section>
                <section className="hero-products__content">
                    <div className="container">
                        <div className="products-area__content">
                            <ProductsTab />
                        </div>
                    </div>
                    <div className="products-area__background"/>
                </section>
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

export default connect(mapStateToProps, null)(Products)

