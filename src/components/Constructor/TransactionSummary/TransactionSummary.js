import React, {Component} from 'react';
import './TransactionSummary.css';
import {connect} from 'react-redux';

class TransactionSummary extends Component {
    render() {
        return (
            <div className="transaction-summary">
                <div className="transaction-summary__header">Transaktionsübersicht</div>
                <div className="transaction-summary__body">
                    <div className="transaction-summary__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Produktkennnummer</th>
                                    <th>Gewinn / Verlust (%)</th>
                                    <th>Datum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                                <tr>
                                    <td className="product-name">FDAX Futures M18 </td>
                                    <td className="product-number">ISIN DE2029384010</td>
                                    <td className="product-value">
                                        <span className="product-value__bold">9.005,20 €</span>
                                        <span> 0,52 %</span>
                                    </td>
                                    <td className="product-date">25.08.2017</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default TransactionSummary;

