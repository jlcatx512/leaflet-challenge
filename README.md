# leaflet-challenge
November 17, 2019

<img width=100% src="Leaflet-Step-1\static\images\leaflet-challenge-screenshot-2019-11-19.jpg">

## ACTION ITEMS ##
- [X] Leaflet tutorials
- [X] Go through class activities.
- [X] https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
    * Start with a small set first.
- All Earthquakes past day is good. About 358? occurences.
- [ ] Add input dropdown menu to select dataset?

- [ ] https://github.com/timwis/leaflet-choropleth/blob/gh-pages/src/choropleth.js

## Drop-down List ##
* Take the selected link as the input.
* Pass the input to URL.
* Have a default.

## Structure 
* Rewatching the videos help.
* immediately invoked function --> keystone
* define the functions above it.
* Need to GET the json from GeoJSON.
* L.geoJSON method takes an array of features. 
* But to get that array of features you need to import the geoJSON string.
* to access only the features part, you need to pass the string to a JSON parser.
* In this case this is d3.
* the point will be auto-generated from L.geoJSON.
* NB subtle bugs in the subtle codes. Better off starting from scratch or copying from one of the Solved classroom activities.

## MUST READ ##
* http://127.0.0.1:5501/1/Activities/10-Stu_Geo-Json/Solved/
* [Main list of feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* A `Feature` is a spacially bounded space, e.g. 
* A `FeatureCollection` is a list of features.
* [GeoJSON Summary Format](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
> GeoJSON is a format for encoding a variety of geographic data structures. A GeoJSON object may represent a geometry, a feature, or a collection of features. GeoJSON uses the JSON standard. The GeoJSONP feed uses the same JSON response, but the GeoJSONP response is wrapped inside the function call, eqfeed_callback. See the GeoJSON site for more information.
* [Past 30 Days Updated every minute. All Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson)
* 

```
L.geoJSON(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);`
``` 

> GeoJSON is a format for encoding a variety of geographic data structures […]. A GeoJSON object may represent a region of space (a Geometry), a spatially bounded entity (a Feature), or a list of Features (a FeatureCollection). GeoJSON supports the following geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, and GeometryCollection. Features in GeoJSON contain a Geometry object and additional properties, and a FeatureCollection contains a list of Features.

## FLOW ##
| Method | Argument | Example   |
| ---   | ---   | ---   |
|`L.map.()` | `div` element |     |
|`L.tileLayer()`| takes URL template. access token. id, zoom level | xx |
|`L.addTo()`| takes map `L.map` map object as argument. Usually chained to `L.tileLayer()` | |

## MapBox Tile Styles ##
`mapbox.satellite`

## Attributions ##
* [Leaflet.js](https://leafletjs.com/examples/quick-start/)
> Whenever using anything based on OpenStreetMap, an attribution is obligatory as per the copyright notice. Most other tile providers (such as MapBox, Stamen or Thunderforest) require an attribution as well. Make sure to give credit where credit is due.

## MapBox access token ##
* Use public default key.
* Add to `config.js` file and add config.js to `.gitignore`.
* Add line to index.html to import `config.js` BEFORE main `logic.js`.
    * e.g 
    `<script type="text/javascript" src="config.js"></script>`

## How to hide? ##
### Create `.gitignore` ###
* What happens if you load to github.io?

## GeoJson ##
* a list of features.
* features.properties
* properties object
* mag:
* geometry
* coordiantes
* https://stackoverflow.com/questions/32615391/parsing-geojson-with-leaflet-from-an-external-api
## How to parse the geoJSON format ##
* https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
* [GeoJSON](https://leafletjs.com/reference-1.6.0.html#geojson)
> Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map. Extends FeatureGroup.

## Layer Groups ##
* Make markers based on coordinates and bind popups in the same line.
* Create a Layers Group from an array of markers.

## Event handling ##
* On zoom
~~~ 
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);
~~~

> Each object has its own set of events — see documentation for details. The first argument of the listener function is an event object — it contains useful information about the event that happened. For example, map click event object (e in the example above) has latlng property which is a location at which the click occurred.

## Preparing the HTML page ##
* confirm leaflet src
1. js AND
2. CSS --> goes before js??

## Map must have defined height ##
* Can be in CSS.
* e.g. 100%

## Leaflet legend ##
* [Interactive Choropleth Map](https://leafletjs.com/examples/choropleth/)
* Helpful with color scale too.

## tool tips ##
* https://leafletjs.com/reference-1.6.0.html#map-zoom

## Useful VS Code Extensions ##
> Name: Live Server
> Id: ritwickdey.liveserver
> Description: Launch a development local Server with live reload feature for static & dynamic pages
> Version: 5.6.1
> Publisher: Ritwick Dey
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
