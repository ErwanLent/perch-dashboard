Vue.component('checkbox', {
    template: '#checkbox-template',
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
            type: String
        }
    },
    data: function() {
        return {
            triggerCallback: true
        };
    },
    mounted: function() {
        if (this.checked) {
            $(this.$vnode.elm).checkbox('check');
        }

        $(this.$vnode.elm).checkbox({
            onChange: this.onChange
        });
    },
    methods: {
        onChange: function() {
            const isChecked = $(this.$vnode.elm).checkbox('is checked');
            const payload = (!this.name) ? isChecked : {
                name: this.name,
                isChecked
            };

            if (!this.triggerCallback) {
                this.triggerCallback = true;
                return;
            }

            this.onToggle(payload);
        },
        set: function(val, triggerCallback = true) {
            const isChecked = $(this.$vnode.elm).checkbox('is checked');

            if (val == isChecked) {
                return;
            }

            this.triggerCallback = triggerCallback;

            if (val) {
                $(this.$vnode.elm).checkbox('check');
            } else {
                $(this.$vnode.elm).checkbox('uncheck');
            }
        }
    }
});