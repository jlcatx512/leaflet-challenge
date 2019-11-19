// Jadd Cheng
// November 17, 2019


function createEarthquakeFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        // console.log(feature)
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    // earthquakeData --> data.features
    function circleColor(d) {
        // return d > 5 ? '#800026' :
        return d > 5 ? 'red' :
                // d > 4  ? '#BD0026' :
                d > 4  ? 'pink' :
                // d > 3  ? '#E31A1C' :
                d > 3  ? 'yellow' :
                // d > 2  ? '#FC4E2A' :
                d > 2  ? 'orange' :
                // d > 1   ? '#FD8D3C' :
                d > 1   ? 'lime' :
                // d > 0   ? '#FEB24C' :
                // d > 0   ? '#00ff00' :
                d > 0   ? 'green' :
            // d > 0   ? '#FED976' :
                        '#FFEDA0';
        // return "#ff7800"
    }

    // create Circle marker function. to put in radius option.
    function circleSize(feature){
        magnitude = parseFloat(feature.properties.mag)
        // console.log(magnitude)
        return magnitude
    }

    function createCircleMarker(feature, latlng) {
        let geojsonMarkerOptions = {
            radius: feature.properties.mag*5,
            fillColor: circleColor(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            // fillOpacity: 0.8
            fillOpacity: 1.2
        }
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

    const earthquakes = L.geoJSON(earthquakeData, {
    
        pointToLayer: createCircleMarker,
        onEachFeature: onEachFeature
    
    });

    // Sending our earthquakes layer to the createMap function
    // createMap(earthquakes);
    return earthquakes;
}

// Create faultlines geoJSON layer.
function createFaultlineFeatures(faultlinesData) {
    const faultlines = L.geoJSON(faultlinesData)
    return faultlines
}

function createMap(earthquakes, faultlines) {

    // Define satellite, streetmap and darkmap layers
    const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: API_KEY
    });

    const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.dark",
            accessToken: API_KEY
    });
 
    const satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.satellite",
            accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    const baseMaps = {
            "Satellite": satellitemap,   
            "Dark Map": darkmap,
            "Street Map": streetmap
    };

    // Create overlay object to hold our overlay layer
    const overlayMaps = {
            Earthquakes: earthquakes,
            "Fault Lines": faultlines
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    const myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [satellitemap, faultlines, earthquakes] // layers shown by default.
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
    }).addTo(myMap);

    const legend = L.control({position: "bottomright"});

    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    // var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };

    legend.addTo(myMap);
}

// ADD LEGEND


function circleColor(d) {
    // return d > 5 ? '#800026' :
    return d > 5 ? 'red' :
            // d > 4  ? '#BD0026' :
            d > 4  ? 'pink' :
            // d > 3  ? '#E31A1C' :
            d > 3  ? 'yellow' :
            // d > 2  ? '#FC4E2A' :
            d > 2  ? 'orange' :
            // d > 1   ? '#FD8D3C' :
            d > 1   ? 'lime' :
            // d > 0   ? '#FEB24C' :
            // d > 0   ? '#00ff00' :
            d > 0   ? 'green' :
        // d > 0   ? '#FED976' :
                    '#FFEDA0';
    // return "#ff7800"
}

function createLegend (map) {
    const legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    // var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };

    legend.addTo(myMap);
};

// IMMEDIATELY INVOKED Function.
// This is what runs when the page loads.
// LOGIC OF THE CODE.

(async function(){
    const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    const faultlinesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
    // const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    const earthquakeData = await d3.json(earthquakeUrl);
    const faultlinesData = await d3.json(faultlinesUrl);
    // console.log(data);

    // Once we get a response, send the data.features object to the createFeatures function
    var earthquakes = createEarthquakeFeatures(earthquakeData.features);
    var faultlines = createFaultlineFeatures(faultlinesData.features);

    createMap(earthquakes, faultlines);
})()