import React, {Component} from 'react';
import './TransactionSummaryWhole.css';
import { Icon } from 'antd';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import PropTypes from "prop-types";

class TransactionSummaryWhole extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="transaction-summary-whole">
                <div className="transaction-summary-whole__header">Transaktionsübersicht</div>
                <div className="transaction-summary-whole__body">
                    <div className="transaction-summary-whole__content">
                        <div className="transaction-info">
                            <div className="transaction-info__part">
                                <div>
                                    <span className="product-name">Aktueller Kontostand: </span>
                                    <span className="product-value">125.023,25 € </span>
                                </div>
                                <div>
                                    <span className="product-name">Ersteinzahlung: </span>
                                    <span className="product-value">115.000,00 € </span>
                                </div>
                            </div>
                            <div className="transaction-info__part">
                                <div>
                                    <span className="product-name">Angefallene Gebühren: </span>
                                    <span className="product-value">5.023,25 € </span>
                                </div>
                                <div>
                                    <span className="product-name">Angefallene Transaktionskosten: </span>
                                    <span className="product-value">500,00 € </span>
                                </div>
                            </div>
                            <div className="transaction-info__part">
                                <div className="transaction-info__btn">
                                    <button>Kontoauszug</button>
                                </div>
                            </div>
                        </div>
                        <div className="transaction-summary-whole__table">
                            <table>
                                <tbody>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">KAUF</td>
                                    <td className="product-date">25.08.2017</td>
                                    <td className="product-date"><Icon type="download" style={{ fontSize: 20 }}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

TransactionSummaryWhole.propTypes = {

};

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSummaryWhole)

