Vue.component('loading-overlay', {
    template: '#loading-overlay-template',
    data: function() {
        return {};
    },
    methods: {
        show: function() {
            $(this.$vnode.elm).show();
        },
        hide: function() {
            $(this.$vnode.elm).hide();
        }
    }
});