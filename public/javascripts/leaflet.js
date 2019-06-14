var MyMaps = L.map('MapsWorld').setView([45.866667, 2.333333], 6);
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; ' + mapLink + ' Contributors', maxZoom: 18, }).addTo(MyMaps);

var customIcon = L.icon({
    iconUrl: '/images/pin.png',
    iconSize: [48, 64],
    iconAnchor: [25, 60],
    popupAnchor: [-3, -76]
});

// var latitude = document.getElementById('latitude');
// var longitude = document.getElementById('longitude');

// var LatVille = latitude.dataset.lat;
// var LonVille = longitude.dataset.lng;


var gps = document.getElementsByClassName('list-group');

for (var i = 0; i < gps.length; i++) {
    L.marker([gps[i].dataset.lat, gps[i].dataset.lng], { icon: customIcon }).bindPopup(gps[i].dataset.lat, gps[i].dataset.lng).addTo(MyMaps);
}





// MyMaps.on('click', function onMapClick(e) {

//     console.log(e.latlng);
//     L.marker(e.latlng, { icon: customIcon }).addTo(MyMaps);

// });
