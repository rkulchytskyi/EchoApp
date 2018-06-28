import React, {Component} from 'react';
import Highcharts from 'highcharts';
import applyExporting from 'highcharts/modules/exporting';
import applyOffline from 'highcharts/modules/offline-exporting';

class Assets extends Component {

    componentDidMount(){

        applyExporting(Highcharts);
        applyOffline(Highcharts);

        Highcharts.chart('assets-area', {
            chart: {
                type: 'column',
                backgroundColor: {
                    linearGradient: [0, 0, 0, 300],
                    stops : [
                        [0, 'rgba(0,81,102, 0.8)'],
                        [1, 'rgba(0,123,155, 0.8)']
                    ]
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
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
            xAxis: {
                type: 'category',
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                }
            },
            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        color: '#ffffff',
                        enabled: true,
                        format: '{point.y:.1f}%',
                        crop: false,
                        style: {
                            textOutline: 'none'
                        }
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [
                {
                    name: "Assets",
                    colorByPoint: true,
                    data: [
                        {
                            "name": "Aktien",
                            "y": 62.74,
                            color: '#ec6531',
                        },
                        {
                            "name": "Derivate",
                            "y": 10.57,
                            color: '#ec6531',
                        },
                        {
                            "name": "Anleihen",
                            "y": 7.23,
                            color: '#ec6531',
                        },
                        {
                            "name": "Sonstige",
                            "y": 5.58,
                            color: '#ec6531',
                        }
                    ]
                }
            ]
        });
    }

    render() {
        return (
            <div id="assets-area" />
        );
    }
}

export default Assets;

