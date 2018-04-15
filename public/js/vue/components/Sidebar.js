Vue.component('sidebar', {
    template: '#sidebar-template',
    data: function() {
        return {
            todaysRevenue: 6013,
            performanceChart: cloneObject(performanceConfig)
        };
    },
    methods: {

    }
});