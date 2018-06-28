import React, {Component} from 'react';
import './Portfolio.css';
import DashboardMenu from '../../Constructor/DashboardMenu/DashboardMenu'
import PortfolioComposition from '../../Constructor/PortfolioComposition/PortfolioComposition'
import AccountSummary from '../../Constructor/AccountSummary/AccountSummary'
import FooterMini from '../../Constructor/FooterMini/FooterMini'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import WorldShapes from '../../Constructor/Charts/WorldShapes/WorldShapes'
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Portfolio extends Component {
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

    // Here we can see what we getting after import component
    render() {

        let {windowWidth, fixedHeader} = this.state;

        windowWidth = windowWidth || window.innerWidth;

        const isIPad = windowWidth <= 1024;
        const isMobile = windowWidth < 768;

        return (
            <div className="wrapper dashboard">
                <header
                    className={`${fixedHeader ? 'fixed' : ''}`}
                >
                    <NavOverlay />
                    <DashboardMenu />
                </header>

                {!isIPad &&
                <div className="dashboard__content layout">
                    <div className="dashboard__inner">
                        <div className="dashboard__left_side">
                            <div className="portfolio__info_1">
                                <PortfolioComposition />
                            </div>
                        </div>
                        <div className="dashboard__right_side">
                            <div className="portfolio__info_2">
                                <WorldShapes />
                            </div>
                            <div className="portfolio__info_3">
                                <AccountSummary />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__aside">

                    </div>
                </div>
                }
                {(isIPad && !isMobile) &&
                <div className="dashboard__content layout">
                    <div className="dashboard__inner">
                        <div className="portfolio__info_2">
                            <WorldShapes />
                        </div>
                        <div className="portfolio__info_1">
                            <PortfolioComposition />
                        </div>

                        <div className="portfolio__info_3">
                            <AccountSummary />
                        </div>

                    </div>
                    <div className="dashboard__aside">

                    </div>
                </div>
                }
                {isMobile &&
                <div className="layout">
                    <div className="mobile-view">
                        <div className="dashboard-title">
                            <span>Portfolio</span>
                        </div>
                        <PortfolioComposition />
                    </div>
                </div>
                }
                <FooterMini />
            </div>
        );
    }
}

Portfolio.propTypes = {
    showDaysArea: PropTypes.bool.isRequired,
    showMonthsArea: PropTypes.bool.isRequired,
    showYearsArea: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen,
        showDaysArea: state.dashboardSetting.showDaysArea,
        showMonthsArea: state.dashboardSetting.showMonthsArea,
        showYearsArea: state.dashboardSetting.showYearsArea
    }
}

export default connect(mapStateToProps, null)(Portfolio)

