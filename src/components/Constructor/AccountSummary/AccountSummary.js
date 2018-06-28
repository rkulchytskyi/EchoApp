import React, {Component} from 'react';
import './AccountSummary.css';

class AccountSummary extends Component {
    render() {
        return (
            <div className="account-summary">
                <div className="account-summary__header">Kontoübersicht</div>
                <div className="account-summary__body">
                    <div className="account-summary__content">
                        <div className="account-summary__left-side">
                            <ul className="account-summary__stat">
                                <li>
                                    <div><span>Mittlerer Gewinn</span></div>
                                    <div>9.005,20 €</div>
                                </li>
                                <li>
                                    <div>Gewinnquote</div>
                                    <div>61,54 %</div>
                                </li>
                                <li>
                                    <div>Sharpe Ratio</div>
                                    <div>5,30</div>
                                </li>
                                <li>
                                    <div>Größter Werteinbruch</div>
                                    <div>- 5,25 %</div>
                                </li>
                            </ul>
                        </div>
                        <div className="account-summary__right-side">
                            <div className="account-summary__btns">
                                <button>Geld einzahlen</button>
                                <button>Geld abbuchen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountSummary;

