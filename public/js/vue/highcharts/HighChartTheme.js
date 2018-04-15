Highcharts.theme = {
    colors: ["#2ea4a2", "#2b8c99", "#29728f", "#295984", "#2a407a"],
    chart: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        align: "left",
        style: {
            color: '#747D87',
            align: "left"
        }
    },
    subtitle: {
        style: {
            color: '#747D87',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    plotOptions: {
        series: {
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.9)'
        },
        columnrange: {
            dataLabels: {
                style: {
                    textShadow: false
                }
            }
        }
    },
    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle: {
            color: 'gray'
        }
    },
    credits: {
        enabled: false
    },
    xAxis: {
        // gridLineColor: "rgba(0, 0, 0, 0.1)",
        // gridLineWidth: 2,
        labels: {
            // align: "center",
            style: {
                color: 'rgba(0, 0, 0, 0.6)'
            }
        },
        tickColor: 'rgba(0, 0, 0, 0.1)',
        tickWidth: 2
    },
    yAxis: {
        gridLineColor: "rgba(0, 0, 0, 0.1)",
        gridLineWidth: 2,
        labels: {
            align: "center",
            style: {
                color: 'rgba(0, 0, 0, 0.3)'
            }
        },
        tickColor: 'rgba(0, 0, 0, 0.1)',
        tickWidth: 2
    }

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});