Vue.component('main-map', {
    template: '#main-map-template',
    data: function() {
        return {
            map: null,
            trucks: []
        };
    },
    methods: {
        load: function() {
            this.map = this.$refs.lightmap.map;
            this.add3dBuildings();
            this.addTruckLogo();

            this.getTrucksSchedule();
        },
        add3dBuildings: function() {
            let labelLayerId;
            for (let layer of this.map.getStyle().layers) {
                if (layer.type === 'symbol' && layer.layout['text-field']) {
                    labelLayerId = layer.id;
                    break;
                }                
            }

            this.map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    'fill-extrusion-height': [
                        "interpolate", ["linear"],
                        ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"],
                        ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        },
        zoomIn: function(lat, lon) {
            this.map.flyTo({
                center: [lon, lat],
                zoom: 16,
                pitch: 60
            });
        },
        addTruckLogo: function() {
            let layerId = `truck-logo-layer`;

            // Remove previous logo
            if (this.map.getLayer(layerId)) {
                // remove logo here
            }

            const feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-118.491968, 34.010589]
                }
            };

            this.map.addSource(layerId, {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [feature]
                }
            });

            this.map.addLayer({
                'id': layerId,
                'type': 'symbol',
                'source': layerId,
                'layout': {
                    'icon-image': 'truck2',
                    'icon-allow-overlap': true,
                }
            });            
        },
        getTrucksSchedule: function() {
            $.get(TruckScheduleEndpoint).done((response) => {
                if (!response.trucks || response.trucks.length <= 0) {
                    console.log(response);
                    alert('Error loading trucks.');
                    return;
                }

                this.trucks = response.trucks;
                this.updateTrucks();
            });
        },
        updateTrucks: function() {
            if (this.trucks.length <= 0) {
                return;
            }

            const currentTime = Date.time();
            for (const truck of this.trucks) {
                for (const stop of truck.stops) {
                    if (currentTime < stop.arrival) {
                        console.log(`${truck.title} is in transit`);
                        break;
                    }

                    if (currentTime < stop.departure) {
                        console.log(`${truck.title} is stopped`);
                        break;
                    }                    
                }
            }
        }
    }
});