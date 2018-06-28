import React, {Component} from 'react';
import './TransactionSummaryMobile.css';
import {Icon} from 'antd';
import {connect} from 'react-redux';

class TransactionSummaryMobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nothingWasAdded: false
        };
    }

    render() {
        return (
            <div className="transaction-summary-mobile">
                <div className="transaction-summary-mobile__data">
                    <div className="transaction-summary-mobile__week">
                        <span className="style">29</span><br/>
                        Wochen
                    </div>
                    <div className="transaction-summary-mobile__total">
                        <span>239.502,01 € </span><br/>
                        Total - <b>0,72 %</b> <Icon type="swap-left" />
                    </div>
                    <div className="transaction-summary-mobile__trades">
                        <span>202</span><br/>
                        Trades
                    </div>
                </div>
                <div className="transaction-summary-mobile__list">
                    <button className="add-item"><Icon type="plus" /></button>
                    {this.state.nothingWasAdded &&
                        <ul>
                            <li>
                                <span className="transaction-summary__no-item">Noch keine Transaktionen.</span>
                            </li>
                        </ul>
                    }
                    {!this.state.nothingWasAdded &&
                    <ul>
                        <li>
                            <div className="transaction-summary-mobile__left-side">
                                <div className="transaction-summary__product-name">FDAX Futures M18</div>
                                <div className="transaction-summary__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-summary-mobile__right-side">
                                <div className="transaction-summary__product-cost">9.005,20 €</div>
                                <div className="transaction-summary__product-percent">0,52 %</div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-summary-mobile__left-side">
                                <div className="transaction-summary__product-name">FDAX Futures M18</div>
                                <div className="transaction-summary__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-summary-mobile__right-side">
                                <div className="transaction-summary__product-cost">9.005,20 €</div>
                                <div className="transaction-summary__product-percent">0,52 %</div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-summary-mobile__left-side">
                                <div className="transaction-summary__product-name">FDAX Futures M18</div>
                                <div className="transaction-summary__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-summary-mobile__right-side">
                                <div className="transaction-summary__product-cost">9.005,20 €</div>
                                <div className="transaction-summary__product-percent">0,52 %</div>
                            </div>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        );
    }
}

export default TransactionSummaryMobile;

