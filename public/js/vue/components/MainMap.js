Vue.component('main-map', {
    template: '#main-map-template',
    data: function() {
        return {
            map: null,
            trucks: [],
            bounds: []
        };
    },
    methods: {
        load: function() {
            this.map = this.$refs.lightmap.map;

            this.add3dBuildings();
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
        addTruckLogo: function(truckName, coordinates) {
            let layerId = `${truckName.hashCode()}-truck-logo-layer`;

            // Remove previous logo
            if (this.map.getLayer(layerId)) {
                // remove logo here
            }

            const feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinates
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

            this.bounds = [];

            let didAlready = false;

            const currentTime = Date.time();
            for (const truck of this.trucks) {
                for (const [index, stop] of truck.stops.entries()) {
                    if (currentTime < stop.arrival) {
                        console.log(`${truck.title} is in transit`);

                        const nextStop = truck.stops[index + 1];

                        if (didAlready) {
                            break;
                        }

                        this.bounds.push([stop.lon, stop.lat]);
                        this.addMovingTruck(truck.title, [stop.lon, stop.lat], [nextStop.lon, nextStop.lat]);
                        didAlready = true;
                        break;
                    }

                    if (currentTime < stop.departure) {
                        console.log(`${truck.title} is stopped`);

                        this.bounds.push([stop.lon, stop.lat]);
                        this.addTruckLogo(truck.title, [stop.lon, stop.lat]);
                        break;
                    }                    
                }
            }
        
            this.fitBounds();
        },
        fitBounds: function() {
            const bounds = new mapboxgl.LngLatBounds();

            for (const bound of this.bounds) {
                bounds.extend(new mapboxgl.LngLat(bound[0], bound[1]));    
            }

            this.map.fitBounds(bounds, { padding: 100 });            
        },
        addMovingTruck: function(truckName, startLocation, endLocation) {
            this.getRoute(startLocation, endLocation, (route) => {
                console.log(route);
                this.plotRoute(route);
            });
        },
        getRoute: function(startLocation, endLocation, callback) {
            const routeUrl = DirectionsBaseUrl + `${startLocation[0]},${startLocation[1]};${endLocation[0]},${endLocation[1]}?access_token=${mapboxgl.accessToken}`;
            
            $.get(routeUrl, (response) => {
                // Response validation
                if (response.code != "Ok") {
                    callback();
                    return;
                }

                const route = {
                    duration: response.routes[0].duration,
                    distance: response.routes[0].distance,
                    decodedPolyline: polyline.decode(response.routes[0].geometry)
                };

                callback(route);
            });
        },
        plotRoute: function(route) {
            let routePath = [];
            let allRouteIntermediaryPoints = [];

            routePlotAmount = route.distance / 40;

            for (let i = 0; i < route.decodedPolyline.length; i++) {
                routePath.push([route.decodedPolyline[i][1], route.decodedPolyline[i][0]]);

                if (i + 1 < route.decodedPolyline.length) {
                    let lineStartLocation = {
                        lat: route.decodedPolyline[i][0],
                        lon: route.decodedPolyline[i][1]
                    };

                    let lineEndLocation = {
                        lat: route.decodedPolyline[i + 1][0],
                        lon: route.decodedPolyline[i + 1][1]
                    };

                    let distanceOfLine = this.distanceBetweenCoordinates([lineStartLocation.lon, lineStartLocation.lat], [lineEndLocation.lon, lineEndLocation.lat]);
                    console.log(distanceOfLine);
                    // let numOfPointsOnLineAmount = Math.ceil((distanceOfLine * (routePlotAmount / route.distance)));
                    // let pointsToPlot = getIntermediatePointsOnLine(lineStartLocation, lineEndLocation, numOfPointsOnLineAmount);

                    // allRouteIntermediaryPoints.push.apply(allRouteIntermediaryPoints, pointsToPlot);
                }
            }

            // Animate route
            //animateRoute(allRouteIntermediaryPoints, 0);
        },
        distanceBetweenCoordinates: function(firstLocation, secondLocation) {
            const firstPoint = this.generatePointFeature(firstLocation);
            const secondPoint = this.generatePointFeature(secondLocation);
            const units = "kilometers";

            return turf.distance(firstPoint, secondPoint, units) * 1000;
        },
        generatePointFeature: function(coordinates) {
            return {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": coordinates
                }
            };
        }
    }
});