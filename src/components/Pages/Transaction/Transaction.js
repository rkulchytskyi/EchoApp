import React, {Component} from 'react';
import './Transaction.css';
import DashboardMenu from '../../Constructor/DashboardMenu/DashboardMenu'
import TransactionSummaryWhole from '../../Constructor/TransactionSummaryWhole/TransactionSummaryWhole'
import TransactionMobile from '../../Constructor/TransactionMobile/TransactionMobile'
import FooterMini from '../../Constructor/FooterMini/FooterMini'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import {connect} from 'react-redux';

class Transaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            fixedHeader: false
        };
        this.updateWidth = this.updateWidth.bind(this);
        this.showFixedHeader = this.showFixedHeader.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
        window.addEventListener('scroll', this.showFixedHeader, true);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

    showFixedHeader() {
        const menuHeight = document.getElementById('main-menu');
        if(!menuHeight) return;

        if(window.scrollY > (menuHeight.offsetHeight - 70)) {
            this.setState({
                fixedHeader: true
            })
        } else {
            this.setState({
                fixedHeader: false
            })
        }
    }

    render() {

        let {
            windowWidth,
            fixedHeader
        } = this.state;

        windowWidth = windowWidth || window.innerWidth;

        const isMobile = windowWidth < 768;

        return (
            <div className="wrapper dashboard">
                <header
                    className={`${fixedHeader ? 'fixed' : ''}`}
                >
                    <NavOverlay />
                    <DashboardMenu />
                </header>
                {!isMobile &&
                <div className="dashboard__content layout">
                    <div className="dashboard__inner">
                        <TransactionSummaryWhole/>
                    </div>
                </div>
                }
                {isMobile &&
                <div className="layout">
                    <div className="mobile-view">
                        <div className="dashboard-title">
                            <span>Transaktionen</span>
                        </div>
                        <TransactionMobile />
                    </div>
                </div>
                }
                <FooterMini />
            </div>
        );
    }
}

export default Transaction;

