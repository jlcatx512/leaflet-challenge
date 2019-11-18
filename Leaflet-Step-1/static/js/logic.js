// Jadd Cheng
// November 17, 2019

// Function create features from earthquakeData.
function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        console.log(feature)
        // layer.circle()
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    // earthquakeData --> data.features

    // create Circle marker function. to put in radius option.
    function circleSize(feature){
        magnitude = parseFloat(feature.properties.mag)
        console.log(magnitude)
        return magnitude
    }

    function circleColor(feature, magnitude) {
        pass
    }

    function createCircleMarker(feature, latlng) {
        let geojsonMarkerOptions = {
            // radius: 30,
            radius: feature.properties.mag*15,
            fillColor: "#ff7800",
            // fillColor: feature.properties.mag,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

    const earthquakes = L.geoJSON(earthquakeData, {
        
        pointToLayer: createCircleMarker,
        onEachFeature: onEachFeature

    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
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

    // Define a baseMaps object to hold our base layers
    const baseMaps = {
            "Street Map": streetmap,
            "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    const overlayMaps = {
            Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    const myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
    }).addTo(myMap);
}

// (async function(){
//     // earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
//     // earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
//     // earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
//     // const queryUrl = buildUrl();
//     const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//     console.log("The geojson source is " + queryUrl)
//     const data = await d3.json(queryUrl);
//     console.log(data)
//     // Once we get a response, send the data.features object to the createFeatures function
//     createFeatures(data.features);
// })()
(async function(){
    // const queryUrl = buildUrl();
    // const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    const data = await d3.json(queryUrl);
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
})()