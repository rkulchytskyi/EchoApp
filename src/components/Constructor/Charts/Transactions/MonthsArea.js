import React, {Component} from 'react';
import Highcharts from 'highcharts';
import applyExporting from 'highcharts/modules/exporting';
import applyOffline from 'highcharts/modules/offline-exporting';
import * as dashboardActions from '../../../../actions/dashboardActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class MonthsArea extends Component {
    componentDidMount(){

        applyExporting(Highcharts);
        applyOffline(Highcharts);

        Highcharts.chart('months-area', {
            chart: {
                type: 'area',
                backgroundColor: '#005166',
                plotBorderWidth: 0,
                margin:[0,0,0,0],

            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                    weekButton: {
                        text: 'Woche',
                        onclick: () => {
                            const {dashboardActions} = this.props;
                            dashboardActions.setDaysArea(true);
                            dashboardActions.setMonthsArea(false);
                            dashboardActions.setYearsArea(false);
                        },
                        align: 'left',
                        buttonSpacing: 5,
                        theme: {
                            fill: 'transparent',
                            strokeWidth: 2,
                            stroke: '#ffffff',
                            r: 0,
                            states: {
                                hover: {
                                    fill: 'transparent'
                                }
                            },
                            style: {
                                color: '#FFFFFF'
                            }
                        },

                    },
                    monthButton: {
                        text: 'Monat',
                        onclick: () => {
                            const {dashboardActions} = this.props;
                            dashboardActions.setDaysArea(false);
                            dashboardActions.setMonthsArea(true);
                            dashboardActions.setYearsArea(false);
                        },
                        align: 'left',
                        buttonSpacing: 5,
                        theme: {
                            fill: 'transparent',
                            strokeWidth: 2,
                            stroke: '#ffffff',
                            r: 0,
                            states: {
                                hover: {
                                    fill: 'transparent'
                                }
                            },
                            style: {
                                color: '#FFFFFF'
                            }
                        },
                    },
                    yearButton: {
                        text: 'YTD',
                        buttonSpacing: 5,
                        onclick: () => {
                            const {dashboardActions} = this.props;
                            dashboardActions.setDaysArea(false);
                            dashboardActions.setMonthsArea(false);
                            dashboardActions.setYearsArea(true);
                        },
                        align: 'left',
                        theme: {
                            fill: 'transparent',
                            strokeWidth: 2,
                            stroke: '#ffffff',
                            r: 0,
                            states: {
                                hover: {
                                    fill: 'transparent'
                                }
                            },
                            style: {
                                color: '#FFFFFF'
                            }
                        },
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                floating: true,
                itemMarginBottom: 5,
                itemHoverStyle: '#ffffff',
                itemStyle: {
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'normal'
                }
            },
            colorAxis: {
                lineColor: '#ffffff'
            },
            xAxis: {
                endOnTick: false,
                startOnTick: false,
                minPadding: 0,
                maxPadding: 0,
                labels: {
                    x: 0,
                    y: -10,
                    rotation: 0,
                    style: {
                        color: '#ffffff',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    }
                },
                crosshair: {
                    width: 1,
                    color: '#ffffff',
                    dashStyle: 'dash',
                    zIndex: 10,
                    align: 'center'
                },
                tickInterval: 1000 * 60 * 60 * 24 * 365 / 12,
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%m.%y',
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                gridLineColor: 'transparent'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                },
                series: {
                    events: {
                        legendItemClick: (e) => {
                            e.preventDefault();
                        }
                    }
                }
            },
            series: [
                {
                    pointStart: Date.UTC(2018, 0, 1),
                    pointInterval: 1000 * 60 * 60 * 24 * 365 / 12, // one month
                    name: 'Rendite',
                    data: [
                        2434, 4126, 5387, 2459, 6056, 3982,
                        3240, 3133, 2224, 2742, 2044, 2416
                    ],
                    color: '#ffffff',
                    lineWidth: 1,

                    fillColor: {
                        linearGradient: [0, 0, 0, 300],
                        stops : [
                            [0, 'rgba(0,81,102, 0.8)'],
                            [1, 'rgba(0,123,155, 0.8)']
                        ]
                    }
                },
                {
                    name: 'Benchmark',
                    pointStart: Date.UTC(2018, 0, 1),
                    pointInterval: 1000 * 60 * 60 * 24 * 365 / 12, // one month
                    data: [
                        1120, 2150, 2600, 1426, 3660, 4869,
                        3060, 2605, 4471, 3322, 4238, 5221
                    ],
                    color: 'rgba(255, 255, 255, 0.54)',
                    lineWidth: 1,
                    fillColor: {
                        linearGradient: [0, 0, 0, 300],
                        stops : [
                            [0, 'rgba(0,81,102, 0.8)'],
                            [1, 'rgba(0,123,155, 0.8)']
                        ]
                    }
                }]
        });
    }

    render() {
        return (
            <div id="months-area" />
        );
    }
}

MonthsArea.propTypes = {
    showDaysArea: PropTypes.bool.isRequired,
    showMonthsArea: PropTypes.bool.isRequired,
    showYearsArea: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        showDaysArea: state.dashboardSetting.showDaysArea,
        showMonthsArea: state.dashboardSetting.showMonthsArea,
        showYearsArea: state.dashboardSetting.showYearsArea
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthsArea)

