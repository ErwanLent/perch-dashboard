Vue.component('sidebar', {
    template: '#sidebar-template',
    data: function() {
        return {
            trucks: trucks,
            todaysRevenue: 6013,
            performanceChart: {}
        };
    },
    mounted: function() {
        setTimeout(() => this.resizeChart(), 1500);
    },
    methods: {
        resizeChart: function() {
            this.performanceChart = cloneObject(performanceConfig);
            // this.$refs.performanceChart.chart.reflow();
        }
    }
});