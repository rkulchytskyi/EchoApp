import React, {Component} from 'react';
import './Dashboard.css';
import DashboardMenu from '../../Constructor/DashboardMenu/DashboardMenu'
import Investments from '../../Constructor/Charts/Investments/Investments'
import DaysArea from '../../Constructor/Charts/Transactions/DaysArea'
import MonthsArea from '../../Constructor/Charts/Transactions/MonthsArea'
import YearsArea from '../../Constructor/Charts/Transactions/YearsArea'
import TransactionSummary from '../../Constructor/TransactionSummary/TransactionSummary'
import TransactionSummaryMobile from '../../Constructor/TransactionSummaryMobile/TransactionSummaryMobile'
import Assets from '../../Constructor/Charts/Assets/Assets'
import FooterMini from '../../Constructor/FooterMini/FooterMini'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Dashboard extends Component {
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

        const {showDaysArea, showMonthsArea, showYearsArea} = this.props;
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
                            <div className="dashboard__info_1">
                                <div className="info-trades">
                                    <div className="weeks-data">
                                        <span>29</span><br/>
                                        Wochen
                                    </div>
                                    <div className="total-data">
                                        <span>239.502,01 € </span><br/>
                                        Total - 0,72 %
                                    </div>
                                    <div className="trade-data">
                                        <span>202</span><br/>
                                        Trades
                                    </div>
                                </div>

                                <Investments />
                                <Assets />
                            </div>
                        </div>
                        <div className="dashboard__right_side">
                            <div className="dashboard__info_2">
                                {showDaysArea &&
                                <DaysArea />
                                }
                                {showMonthsArea &&
                                <MonthsArea />
                                }
                                {showYearsArea &&
                                <YearsArea />
                                }
                            </div>
                            <div className="dashboard__info_3">
                                <TransactionSummary />
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
                        <div className="dashboard__info_2">
                            {showDaysArea &&
                            <DaysArea />
                            }
                            {showMonthsArea &&
                            <MonthsArea />
                            }
                            {showYearsArea &&
                            <YearsArea />
                            }
                        </div>
                        <div className="dashboard__info_1">
                            <Investments />
                            <Assets />
                        </div>

                        <div className="dashboard__info_3">
                            <TransactionSummaryMobile/>
                        </div>

                    </div>
                    <div className="dashboard__aside">

                    </div>
                </div>
                }
                {isMobile &&
                    <div className="layout">
                        <div className="dashboard-slider__header">
                            <Slider
                                ref={slider => (this.slider1 = slider)}
                                className="dashboard-slider__titles"
                                dots={false}
                                arrows={false}
                                centerMode={true}
                                infinite={false}
                                centerPadding="0px"
                                slidesToShow={1}
                                speed={100}
                                variableWidth={true}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                afterChange={(index) => {
                                    this.slider2.slickGoTo(index)
                                }}
                            >
                                <div className="dashboard-slider__title">Dashboard</div>
                                <div className="dashboard-slider__title">Transaktionen</div>
                                <div className="dashboard-slider__title">Portfolio</div>
                            </Slider>

                        </div>
                        <div className="dashboard-slider__body">
                            <Slider
                                className="dashboard-slider"
                                ref={slider => (this.slider2 = slider)}
                                dots={true}
                                infinite={false}
                                adaptiveHeight={true}
                                speed={100}
                                arrows={false}
                                slidesToShow={1}
                                slidesToScroll={1}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                afterChange={(index) => {
                                    this.slider1.slickGoTo(index)
                                }}
                            >
                                <div className="dashboard__info_2">
                                    {showDaysArea &&
                                    <DaysArea />
                                    }
                                    {showMonthsArea &&
                                    <MonthsArea />
                                    }
                                    {showYearsArea &&
                                    <YearsArea />
                                    }
                                </div>
                                <div className="dashboard__info_1">
                                    <Investments />
                                    <Assets />
                                </div>
                                <div className="dashboard__info_3">
                                    <TransactionSummaryMobile/>
                                </div>
                            </Slider>
                        </div>
                    </div>
                }
                <FooterMini />
            </div>
        );
    }
}

Dashboard.propTypes = {
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

export default connect(mapStateToProps, null)(Dashboard)

