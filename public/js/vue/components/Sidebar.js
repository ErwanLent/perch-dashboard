Vue.component('sidebar', {
    template: '#sidebar-template',
    data: function() {
        return {
            trucks: trucks,
            todaysRevenue: 4018,
            selectedTruck: {},
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
        },
        showTruckPopup: function(truck) {
            if (!isPopupOpen) {
                $('.truck-popup').toggle("slide", {
                    direction: "right"
                });

                isPopupOpen = true;
            }

            this.selectedTruck = truck;
            EventBus.$emit("newSelectedTruck", truck);
        }
    }
});