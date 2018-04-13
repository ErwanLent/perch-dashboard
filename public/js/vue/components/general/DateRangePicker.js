Vue.component('date-range-picker', {
    template: '#date-range-picker-template',
    props: {
        onDateChange: {
            type: Function,
            default: function() {}
        }
    },
    data: function() {
        return {};
    },
    mounted: function() {
        $(this.$vnode.elm).find('[name="datepicker"]').val(`${moment("2018 01 01", "YYYY MM DD").format('M/D/YYYY')} - ${moment().utc().endOf('day').format('M/D/YYYY')}`);

        $(this.$vnode.elm).find('[name="datepicker"]').daterangepicker({ 
            ranges: {
                'Year To Date': [moment("2018 01 01", "YYYY MM DD"), moment().utc().endOf('day')],
                '2017': [moment("2017 01 01", "YYYY MM DD"), moment("2017 12 31", "YYYY MM DD")],
                '2016': [moment("2016 01 01", "YYYY MM DD"), moment("2016 12 31", "YYYY MM DD")],
            } 
        }, this.onChange);    

        $(this.$vnode.elm).find('[name="datepicker"]').val('Year To Date');     
    },
    methods: {
        onChange: function(start, end) {
            console.log('on date picker change');
            //$(this.$vnode.elm).find('[name="datepicker"]').val(`${start.utc().startOf('day').format('MM/DD/YYYY')} - ${end.utc().endOf('day').format('MM/DD/YYYY')}`);
            //$(this.$vnode.elm).find('[name="datepicker"]').val('All Time');
            this.onDateChange();
        },
        set: function(val) {

        }
    }
});