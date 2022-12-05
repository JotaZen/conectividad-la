// [Latitud, Longitud]
const coordenadasCentroLA = [-37.4697300, -72.3536600]

var map = L.map('map').setView(coordenadasCentroLA, 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var comuna = L.polygon(
    comunaLA    
).addTo(map);