Vue.component('switch-slider', {
    template: '#switch-slider-template',
    props: {
        text: {
            type: Array,
            default: function() {
                return ['Left', 'Right'];
            }
        },
        onChange: {
            type: Function,
            default: function() {

            }
        },
        checkedProp: {
            type: String,
            default: 'left'
        }
    },
    data: function() {
        return {
            id: this._uid,
            checked: this.checkedProp
        };
    },
    watch: {
        checked: function() {
            this.onChange(this.checked);
        }
    }
});