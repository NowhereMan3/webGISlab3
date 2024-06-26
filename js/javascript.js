let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
osm.addTo(map)

async function addDistrictsGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const polygons = L.geoJson(data, {
 onEachFeature: popUPinfo,
 style: polygonStyle,
 })
 polygons.addTo(map)
}
addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

// add geoJSON layer
async function addCelltowersGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const markers = L.geoJson(data) 
 const clusters = L.markerClusterGroup() 
 clusters.addLayer(markers) 
 clusters.addTo(map) 
}
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')
// default map settings
function defaultMapSettings() {
 map.setView([58.373523, 26.716045], 12)
}


// get color from feature property
function getColor(property) {
 switch (property) {
 case 1:
 return '#ff0000'
 case 13:
 return '#009933'
 case 6:
 return '#0000ff'
 case 7:
 return '#ff0066'
 default:
 return '#ffffff'
 }
}


// polygon style
function polygonStyle(feature) {
 return {
 fillColor: getColor(feature.properties.OBJECTID),
 fillOpacity: 0.5,
 weight: 1,
 opacity: 1,
 color: 'grey',
 }
}

