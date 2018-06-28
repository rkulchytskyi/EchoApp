import React, {Component} from 'react';
import './TransactionMobile.css';
import { Icon, Select } from 'antd';
import 'antd/lib/select/style/index.css'
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import localization from 'moment/locale/de'
import 'react-datepicker/dist/react-datepicker.css';

class TransactionMobile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.localeGermany = this.localeGermany.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.localeGermany();
    }

    localeGermany(){
        moment().locale("de", localization).format('LLL')
    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;
        if (startDate && startDate.isAfter(endDate)) {
            endDate = startDate
        }

        this.setState({ startDate, endDate })
    };

    handleChangeStart = (startDate) => this.handleChange({ startDate });

    handleChangeEnd = (endDate) => this.handleChange({ endDate });

    onChangeSelect(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }

    render() {

        const Option = Select.Option;

        return (
            <div className="transaction-mobile">
                <div className="transaction-mobile__filter">
                    <div className="transaction-mobile__date">
                        <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStart}
                            locale="de"
                            placeholderText="Startdatum"
                            shouldCloseOnSelect={false}
                        />
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                            locale="de"
                            popperPlacement="bottom-end"
                            placeholderText="Zeitraum"
                            shouldCloseOnSelect={false}
                        />
                    </div>
                    <div className="transaction-mobile__markets">
                        <Select
                            dropdownClassName="rb-select-dropdown"
                            className="rb-select"
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Märkte"
                            optionFilterProp="children"
                            value={this.state.markets}
                            onChange={this.onChangeSelect('markets')}
                            filterOption={
                                (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option
                                key="3"
                                className="rb-option"
                                value="3"
                            >
                                Märkte
                            </Option>
                        </Select>
                    </div>
                </div>
                <div className="transaction-mobile__list">
                    <ul>
                        <li>
                            <div className="transaction-mobile__left-side">
                                <div className="transaction-mobile__product-name">FDAX Futures M18</div>
                                <div className="transaction-mobile__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-mobile__right-side">
                                <div>
                                    <div className="transaction-mobile__product-cost">9.005,20 €</div>
                                    <div className="transaction-mobile__product-percent">0,52 %</div>
                                </div>
                                <div className="transaction-mobile__status">
                                    <Icon type="swap-left" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-mobile__left-side">
                                <div className="transaction-mobile__product-name">FDAX Futures M18</div>
                                <div className="transaction-mobile__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-mobile__right-side">
                                <div>
                                    <div className="transaction-mobile__product-cost">9.005,20 €</div>
                                    <div className="transaction-mobile__product-percent">0,52 %</div>
                                </div>
                                <div className="transaction-mobile__status">
                                    <Icon type="swap-right"/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-mobile__left-side">
                                <div className="transaction-mobile__product-name">FDAX Futures M18</div>
                                <div className="transaction-mobile__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-mobile__right-side">
                                <div>
                                    <div className="transaction-mobile__product-cost">9.005,20 €</div>
                                    <div className="transaction-mobile__product-percent">0,52 %</div>
                                </div>
                                <div className="transaction-mobile__status">
                                    <Icon type="swap-right"/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-mobile__left-side">
                                <div className="transaction-mobile__product-name">FDAX Futures M18</div>
                                <div className="transaction-mobile__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-mobile__right-side">
                                <div>
                                    <div className="transaction-mobile__product-cost">9.005,20 €</div>
                                    <div className="transaction-mobile__product-percent">0,52 %</div>
                                </div>
                                <div className="transaction-mobile__status">
                                    <Icon type="swap-right"/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="transaction-mobile__left-side">
                                <div className="transaction-mobile__product-name">FDAX Futures M18</div>
                                <div className="transaction-mobile__product-number">ISIN DE2029384010</div>
                            </div>
                            <div className="transaction-mobile__right-side">
                                <div>
                                    <div className="transaction-mobile__product-cost">9.005,20 €</div>
                                    <div className="transaction-mobile__product-percent">0,52 %</div>
                                </div>
                                <div className="transaction-mobile__status">
                                    <Icon type="swap-right"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default TransactionMobile;

