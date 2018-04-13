Vue.component('range-slider', {
    template: '#range-slider-template',
    props: {
        onSliderChange: {
            type: Function,
            default: function() {}
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 100
        },    
        values: {
            type: Array,
            default: [25, 75]
        }
    },
    data: function() {
        return {};
    },
    mounted: function() {
        $(this.$vnode.elm).slider({
              range: true,
              min: this.min,
              max: this.max,
              values: this.values,
              slide: this.onChange
        });
    },
    methods: {
        onChange: function(event, ui) {
            this.onSliderChange(ui.values);
        }
    }
});