import React, {Component} from 'react';
import './PortfolioComposition.css';
import {connect} from 'react-redux';

class PortfolioComposition extends Component {
    render() {
        return (
            <div className="portfolio-composition">
                <div className="portfolio-composition__header">Portfoliozusammensetzung</div>
                <div className="portfolio-composition__body">
                    <div className="portfolio-composition__content">
                        <ul>
                            <li>
                                <div className="portfolio-composition__left-side">
                                    <div className="portfolio-composition__product-name">ROHSTOFFE</div>
                                    <div className="portfolio-composition__product-number">Weizen</div>
                                    <div className="portfolio-composition__product-number">Kaffee</div>
                                    <div className="portfolio-composition__product-number">Sojabohnen</div>
                                </div>
                                <div className="portfolio-composition__right-side">
                                    <div className="portfolio-composition__product-cost">8,00 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                </div>
                            </li>
                            <li>
                                <div className="portfolio-composition__left-side">
                                    <div className="portfolio-composition__product-name">ROHSTOFFE</div>
                                    <div className="portfolio-composition__product-number">Weizen</div>
                                    <div className="portfolio-composition__product-number">Kaffee</div>
                                    <div className="portfolio-composition__product-number">Sojabohnen</div>
                                </div>
                                <div className="portfolio-composition__right-side">
                                    <div className="portfolio-composition__product-cost">8,00 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                </div>
                            </li>
                            <li>
                                <div className="portfolio-composition__left-side">
                                    <div className="portfolio-composition__product-name">ROHSTOFFE</div>
                                    <div className="portfolio-composition__product-number">Weizen</div>
                                </div>
                                <div className="portfolio-composition__right-side">
                                    <div className="portfolio-composition__product-cost">8,00 %</div>
                                    <div className="portfolio-composition__product-percent">0,52 %</div>
                                </div>
                            </li>
                        </ul>
                        <div className="portfolio-composition__invest">
                            <ul>
                                <li>
                                    <div className="portfolio-composition__left-side">
                                        <div className="portfolio-composition__product-name">102.503,94 € <span>(Investiert)</span></div>
                                    </div>
                                    <div className="portfolio-composition__right-side">
                                        <div className="portfolio-composition__product-cost">95,00 %</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-composition__left-side">
                                        <div className="portfolio-composition__product-name">2.503,94 € <span>(Barbestände)</span></div>
                                    </div>
                                    <div className="portfolio-composition__right-side">
                                        <div className="portfolio-composition__product-cost">5,00 %</div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default PortfolioComposition;

