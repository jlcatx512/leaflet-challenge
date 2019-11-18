// Jadd Cheng
// November 17, 2019

// Change center.
var mymap = L.map('map').setView([51.505, -0.09], 13);

// Add tile layer. Add to map.
// Consider changing the theme.

let id = 'mapbox.streets'; 
    // id: 'mapbox.streets',
    // id: 'mapbox.light',
    // id: 'mapbox.pirates',
    // id: 'mapbox.satellite',

// Import Mapbox API key from config.js.
const MapboxAccessToken = API_KEY;
const mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

// MapID
var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution}),
streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});

const map = L.tileLayer(mapboxUrl, {
    attribution: mapboxAttribution,
    maxZoom: 18,
    // id: 'mapbox.streets',
    // id: 'mapbox.light',
    id: 'mapbox.pirates',
    // id: 'mapbox.satellite',
    layers: [grayscale, streets],
    accessToken: MapboxAccessToken
}).addTo(mymap);

var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};

L.control.layers(baseMaps).addTo(map);


// Read GeoJson
// var myLayer = L.geoJSON().addTo(map);
// myLayer.addData(geojsonFeature);
// https://leafletjs.com/examples/geojson/

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

// Custom markers?
// 1. location --> 
// 2. color --> magnitude --> color scale
// 3. radius --> magnitude
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

// Tooltip --> magnitude and location
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("Yo yo yo!");
// polygon.bindPopup("I am a polygon.");

// Layers 
// https://leafletjs.com/examples/layers-control/


// legend
// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);
// https://leafletjs.com/examples/choropleth/

// function to create circle size
function circleSize(magnitude) {
    return magnitude/1000
    // normalize size. comes from properties.mag?
};
// pass in foreach

// function to color circle
function circleColor(magnitude) {
    // return magnitude
    pass
};

const earthquakes = L.geoJSON(

);

earthquakes.forEach(earthquake => {
    L.circle(earthquake.geometry.coordinates)
})
/*
//  geometry: {
    type: "Point",
    coordinates: [
      longitude,
      latitude,
      depth

// Loop through the cities array and create one marker for each city object
cities.forEach(city => {
    L.circle(city.location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: markerSize(city.population)
    }).bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population: " + city.population + "</h3>").addTo(myMap);
})
*/