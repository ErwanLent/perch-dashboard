/* ==========================================================================
   Global Variables
   ========================================================================== */

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJ3YW5sZW50IiwiYSI6IjA4YzY2Zjg2OTBkNDY5MDEyODBmN2RkOTdjMDc0NTY0In0.NY4En8vkN8h4JvlSDlhLfw';
   
const LightMapStyleUrl = 'mapbox://styles/erwanlent/cjfytcs2ue6j92srvbdgoblmf';
const DirectionsBaseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/';

let isPopupOpen = false;
let canAnimate = false;

/* ==========================================================================
   Data API Endpoints
   ========================================================================== */

const TruckScheduleEndpoint = "http://flask-env.qfkjpmpp82.us-west-2.elasticbeanstalk.com/random_truck_schedule";