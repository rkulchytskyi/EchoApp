import React, {Component} from 'react';
import Highcharts from 'highcharts';

class Investments extends Component {
    componentDidMount(){
        // Create the chart
        Highcharts.chart('investments-pie', {
            chart: {
                type: 'pie',
                backgroundColor: '#005166',
                margin: 0
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            plotOptions: {
                series: {

                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: <br> {point.y:.1f}%',
                        align: 'left',
                        connectorColor: 'red',
                        distance: -70,
                        color: 'white',
                        className: 'data-labels',
                        crop: false,
                        style: {
                            textOutline: 'none'
                        }
                    },
                    size: '100%',
                    shadow: true,

                },
                pie: {
                    center: ["50%", "50%"],
                    startAngle: 270,
                    borderWidth: 0,
                }
            },

            tooltip: {
                backgroundColor: 'rgba(255,120,0,0.9)',
                borderColor: '#ffffff',
                style: {
                    color: '#ffffff'
                },
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span >{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [
                {
                data: [
                        {
                            name: "Barbestände",
                            y: 100.00,
                            color: '#006985'
                        },
                    ],
                size: '86%',
                innerSize: '70%',
                enableMouseTracking: false,
                dataLabels: {
                    enabled: false,
                    color: '#ffffff'
                }
            }, {
                name: 'Invest',
                data: [
                        {
                            y: 75.00,
                            name: "Investiert",
                            drilldown: "Investiert",
                            color: '#ffffff'
                        },
                        {
                            name: "Barbestände",
                            y: 25.00,
                            drilldown: "Barbestände",
                            color: '#004050'
                        },
                    ],
                size: '100%',
                innerSize: '90%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                            this.y + '%' : null;
                    },
                    distance: -60
                },
                // id: 'versions'
            }],
        });

    }

    render() {

        return (
            <div id="investments-pie" />
        );
    }
}

export default Investments;

