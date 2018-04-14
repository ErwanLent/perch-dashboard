Vue.component('light-map', {
    template: '#light-map-template',
    props: {
        onMapLoaded: {
            type: Function,
            default: function() {}
        }
    },    
    data: function() {
        return {
            map: null
        };
    },
    mounted: function() {
        this.map = new mapboxgl.Map({
            container: this.$vnode.elm,
            style: LightMapStyleUrl,
            center: [-98.9987099, 39.9930193],
            zoom: 3
        });

        // setTimeout(() => this.onMapLoad(), 100);

        this.map.on('load', this.onMapLoad);

        EventBus.$on('invalidateMap', this.resize);
    },
    methods: {
        onMapLoad: function() {
            $('.mapboxgl-ctrl.mapboxgl-ctrl-attrib').remove();
            $('.mapboxgl-ctrl-logo').remove();

            this.onMapLoaded();
        },
        resize: function() {
            setTimeout(() => this.map.resize(), 100);
        }
    }
});