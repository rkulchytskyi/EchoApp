import React, {Component} from 'react';
import Highcharts from 'highcharts';
import applyExporting from 'highcharts/modules/exporting';
import applyOffline from 'highcharts/modules/offline-exporting';

class WorldShapes extends Component {
    componentDidMount(){

        applyExporting(Highcharts);
        applyOffline(Highcharts);

        Highcharts.chart('world-shapes-area', {
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
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [
                {
                    name: "WorldShapes",
                    colorByPoint: true,
                    data: [
                        {
                            "name": "Aktien\n" +
                            "Europa",
                            "y": 40.74,
                            color: '#ec6531',
                        },
                        {
                            "name": "Aktien \n" +
                            "Deutschl.",
                            "y": 10.57,
                            color: '#ec6531',
                        },
                        {
                            "name": "Aktien USA",
                            "y": 7.23,
                            color: '#ec6531',
                        },
                        {
                            "name": "Rohstoffe",
                            "y": 5.58,
                            color: '#ec6531',
                        },
                        {
                            "name": "Staats-anleihen",
                            "y": 10.57,
                            color: '#ec6531',
                        },
                        {
                            "name": "Geldmarkt-produkte",
                            "y": 7.23,
                            color: '#ec6531',
                        },
                        {
                            "name": "Volatilitäts-produkte",
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
            <div id="world-shapes-area" />
        );
    }
}

export default WorldShapes;

