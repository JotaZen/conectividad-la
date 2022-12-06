let marcador
var map = L.map('map').setView(coordenadasCentroLA, 10)
const coordenadas = document.getElementById('coordenadas')

// Mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 16,
  minZoom: 9,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Layout de la comuna
const comuna = L.polygon(
  comunaLA,
  {color: 'blue',
  fillOpacity: 0.08}    
).addTo(map)

// Marcador y coordenadas de usuario
map.on('click', function (m) {
  if (marcador){marcador.remove()}
  marcador = L.marker(m.latlng).addTo(map)
  console.log(m.latlng)
  coordenadas.innerHTML = `>lat: ${m.latlng.lat}, lng: ${m.latlng.lng}`
})

// Recuperar datos del formulario
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSsvgLtFTpz7lsQBIzEsQYAsT0FeuMfw_lzb3dcOrs0QgQFsCTeTTz8cSXEVpY36EUnn_StGf_qpgeL/pub?gid=1770946352&single=true&output=csv')
  .then((response) => response.text())
  .then((data) => {
    console.log(data)
  });
  