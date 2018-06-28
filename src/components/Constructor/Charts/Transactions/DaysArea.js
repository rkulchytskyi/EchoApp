import React, {Component} from 'react';
import Highcharts from 'highcharts';
import applyExporting from 'highcharts/modules/exporting';
import applyOffline from 'highcharts/modules/offline-exporting';
import * as dashboardActions from '../../../../actions/dashboardActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class DaysArea extends Component {
    componentDidMount(){

        applyExporting(Highcharts);
        applyOffline(Highcharts);

        Highcharts.chart('days-area', {
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
                allowDecimals: false,
                labels: {
                    useHTML: true,
                    align: 'center',
                    x: 0,
                    y: -10,
                    style: {
                        color: '#ffffff',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    },
                },
                crosshair: {
                    width: 1,
                    color: '#ffffff',
                    dashStyle: 'dash',
                    zIndex: 10,
                    align: 'center'
                },
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%d.%m',
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
                    pointInterval: 24 * 3600 * 1000, // one day
                    name: 'Rendite',
                    data: [
                         6300, 5500, 4512, 4502, 4500
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
                    pointInterval: 24 * 3600 * 1000, // one day
                    data: [
                        2013, 4354, 4804, 5368, 4018
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
            <div id="days-area" />
        );
    }
}

DaysArea.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DaysArea)

