Vue.component('radio-button', {
    template: '#radio-button-template',
    props: {
        text: {
            type: String,
            default: "Checkbox"
        },
        onToggle: {
            type: Function,
            default: function() {}
        },
        checked: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: 'radio'
        }
    },
    data: function() {
        return {};
    },
    mounted: function() {
        if (this.checked) {
            $(this.$vnode.elm).checkbox('check');
        }

        $(this.$vnode.elm).checkbox({
            onChange: this.onToggle
        });
    }
});