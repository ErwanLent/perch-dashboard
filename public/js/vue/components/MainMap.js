Vue.component('main-map', {
    template: '#main-map-template',
    data: function() {
        return {
            map: null,
            trucks: trucks,
            truckLocations: {},
            bounds: [],
            animatedRouteLines: []
        };
    },
    methods: {
        load: function() {
            this.map = this.$refs.lightmap.map;

            this.add3dBuildings();
            this.getTrucksSchedule();
            this.loadTruckInitialLocations();

            EventBus.$on("newSelectedTruck", truck => {
                if (truck.title == trucks[0].title) {
                    this.addMovingTruck(truck.title, [truck.stops[1].lon, truck.stops[1].lat], [truck.stops[2].lon, truck.stops[2].lat]);
                    return;
                }

                if (this.truckLocations[truck.title]) {
                    this.zoomIn(this.truckLocations[truck.title].lat, this.truckLocations[truck.title].lon);    
                }
            });
        },
        loadTruckInitialLocations: function() {
            for (const truck of trucks) {
                this.bounds.push(truck.currentLocation);
                this.addTruckLogo(truck.title, truck.currentLocation);
                this.truckLocations[truck.title] = {lat: truck.currentLocation[1], lon: truck.currentLocation[0]};
            }

            this.fitBounds();
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
        zoomIn: function(lat, lon, speed) {
            const flyToPayload = {
                center: [lon, lat],
                zoom: 16,
                pitch: 60
            };

            if (speed) {
                flyToPayload.speed = speed;
            }

            this.map.flyTo(flyToPayload);
        },
        getTrucksSchedule: function() {
            // $.get(TruckScheduleEndpoint).done((response) => {
            //     if (!response.trucks || response.trucks.length <= 0) {
            //         console.log(response);
            //         alert('Error loading trucks.');
            //         return;
            //     }

            //     this.trucks = response.trucks;
            //     this.updateTrucks();
            // });

            this.updateTrucks();
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

                        if (!nextStop) {
                            break;
                        }

                        // this.bounds.push([stop.lon, stop.lat]);
                        // this.addMovingTruck(truck.title, [stop.lon, stop.lat], [nextStop.lon, nextStop.lat]);
                        // didAlready = true;
                        break;
                    }

                    if (currentTime < stop.departure) {
                        console.log(`${truck.title} is stopped`);

                        // this.bounds.push([stop.lon, stop.lat]);
                        // this.addTruckLogo(truck.title, [stop.lon, stop.lat]);
                        // this.truckLocations[truck.title] = {lat: stop.lat, lon: stop.lon};

                        break;
                    }                    
                }
            }
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
                this.plotRoute(truckName, route);
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
            
            this.zoomIn(startLocation[1], startLocation[0]);
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
        },
        addFullTruckRoute: function(truckName, coordinates) {
            let layerId = `${truckName.hashCode()}-truck-full-route-layer`;

            if (this.map.getLayer(layerId)) {
                this.map.removeLayer(layerId);
            }       

            if (this.map.getSource(layerId)) {
                this.map.removeSource(layerId);
            }                  

            this.map.addLayer({
                "id": layerId,
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#65C97A",
                    "line-width": 8
                }
            });
        },
        addTruckLogo: function(truckName, coordinates) {
            let layerId = `${truckName.hashCode()}-truck-logo-layer`;

            // Remove previous logo
            if (this.map.getLayer(layerId)) {
                this.map.removeLayer(layerId);
            }      

            if (this.map.getSource(layerId)) {
                this.map.removeSource(layerId);
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
                    'icon-image': 'van5',
                    'icon-allow-overlap': true,
                }
            });            
        },      
        addCircle: function(coordinates) {
            let layerId = uuid();

            // Remove previous logo
            if (this.map.getLayer(layerId)) {
                this.map.removeLayer(layerId);
            }

            if (this.map.getSource(layerId)) {
                this.map.removeSource(layerId);
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
                'type': 'circle',
                'source': layerId,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    "circle-color": storeMapMarkerColor,
                    "circle-opacity": 1,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": storeMapMarkerOutlineColor
                }                
            });
        },
       plotRoute: function(truckName, route) {
            let routePath = [];
            let allRouteIntermediaryPoints = [];

            const routePlotAmount = route.distance / 30;

            distance = route.distance;

            for (let i = 0; i < route.decodedPolyline.length; i++) {
                routePath.push([route.decodedPolyline[i][1], route.decodedPolyline[i][0]]);

                if (i + 1 < route.decodedPolyline.length) {
                    const lineStartLocation = {
                        lat: route.decodedPolyline[i][0],
                        lon: route.decodedPolyline[i][1]
                    };

                    const lineEndLocation = {
                        lat: route.decodedPolyline[i + 1][0],
                        lon: route.decodedPolyline[i + 1][1]
                    };

                    const distanceOfLine = this.distanceBetweenCoordinates([lineStartLocation.lon, lineStartLocation.lat], [lineEndLocation.lon, lineEndLocation.lat]);
                    const numOfPointsOnLineAmount = Math.ceil((distanceOfLine * (routePlotAmount / route.distance)));
                    const pointsToPlot = this.getIntermediatePointsOnLine(lineStartLocation, lineEndLocation, numOfPointsOnLineAmount);

                    allRouteIntermediaryPoints.push.apply(allRouteIntermediaryPoints, pointsToPlot);
                }
            }

            this.addFullTruckRoute(truckName, routePath);

            // Animate route
            this.animateRoute(truckName, allRouteIntermediaryPoints);
        },
        distanceBetweenCoordinates: function(firstLocation, secondLocation) {
            const firstPoint = this.generatePointFeature(firstLocation);
            const secondPoint = this.generatePointFeature(secondLocation);
            const units = "kilometers";

            return turf.distance(firstPoint, secondPoint, units) * 1000;
        },
        getIntermediatePointsOnLine: function(lineStartLocation, lineEndLocation, numOfPointsOnLineAmount) {
            const intermediatePoints = [];
            intermediatePoints.push(lineStartLocation);

            for (let i = 0; i <= numOfPointsOnLineAmount; i++) {
                const calculatedLocation = this.calculatePointOnLine(intermediatePoints[intermediatePoints.length - 1], lineEndLocation, i, numOfPointsOnLineAmount);
                intermediatePoints.push(calculatedLocation);
            }

            return intermediatePoints;
        },
        calculatePointOnLine: function(lineStartLocation, lineEndLocation, k, numOfPointsOnLineAmount) {
            const calculatedLat = (k * ((lineEndLocation.lat - lineStartLocation.lat) / numOfPointsOnLineAmount)) + lineStartLocation.lat;
            const calculatedLon = (k * ((lineEndLocation.lon - lineStartLocation.lon) / numOfPointsOnLineAmount)) + lineStartLocation.lon;

            return {
                lat: calculatedLat,
                lon: calculatedLon
            };
        },           
        animateRoute: function(truckName, routePoints) {
            route = routePoints;
            canAnimate = true;

            // for (const coords of routePoints) {
            //     this.addCircle([coords.lon,coords.lat]);
            // }

            this.addCircle(routePoints[0]);

            truckLayerId = `${truckName.hashCode()}-truck-logo-layer`;

            this.addTruckLogo(truckName, [routePoints[0].lon, routePoints[0].lat]);

            let source = this.map.getSource(truckLayerId);

            setTimeout(() =>  this.animateLogo(), 2500);
        },
        animateLogo: function(timestamp) {
            if (counter >= route.length) {
                return;
            }

            if (timestamp != undefined && startTimestamp == 0) {
                startTimestamp = timestamp;
            }

            let endTimestamp = startTimestamp + (distance * 5);
            let progress = (timestamp - startTimestamp) / (endTimestamp - startTimestamp);
            let index = Math.round(progress * route.length);
            panCounter++;

            if (timestamp == undefined) {
                index = 1;
            }

            if (index >= route.length) {
                return;
            }

            let source = this.map.getSource(truckLayerId);
            source._data.features[0].geometry.coordinates = [route[index].lon, route[index].lat];

            this.map.getSource(truckLayerId).setData(source._data);

            if (canAnimate && panCounter % 20 == 0) {
                this.zoomIn(route[index].lat, route[index].lon, 0.2);      
            }
            
            requestAnimationFrame(this.animateLogo);
        }
    }
});

let counter = 1;
let route;
let truckLayerId;
let startTimestamp = 0;
let distance = 0;
let panCounter = 0;