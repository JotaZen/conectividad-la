// Mapa
var map = L.map('map').setView(coordenadasCentroLA, 10)
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
let marcador
const button = document.getElementById('coordenadas')
map.on('click', function (m) {
  if (marcador){marcador.remove()}
  marcador = L.marker(m.latlng).addTo(map)
  button.innerHTML = `Latitud: ${m.latlng.lat} , Longitud: ${m.latlng.lng}`
  button.style.backgroundColor = '#00FFAB'
  button.addEventListener('click', () => {
    var aux = document.createElement("input");
    aux.setAttribute("value", button.innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    button.style.backgroundColor = 'grey'
  })
})

// Recuperar datos del formulario
window.addEventListener('load', getData)
async function getData(){
  let response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSsvgLtFTpz7lsQBIzEsQYAsT0FeuMfw_lzb3dcOrs0QgQFsCTeTTz8cSXEVpY36EUnn_StGf_qpgeL/pub?gid=1770946352&single=true&output=csv')
  let data = await response.text()
  let filas = data.split('\n')
  filas = filas.map((fila) => fila.split(',')).slice(1)
  filas.forEach((row) => {
  try {
    const ltd = row[4].split(" ").filter((x) => {
      x = parseInt(x)
      if (x == NaN) {}
      else {return x}
    })
    const lng = row[5].split(" ").filter((x) => {
      x = parseInt(x)
      if (x == NaN) {}
      else {return x}
    })
    lng[0] = lng[0].split('"')[0]

    // Añadir marcadores de encuestas al mapa
    const circulo = L.circle([ltd[0],lng[0]], {
      color: sample.compañias[row[1]].color,
      fillColor: sample.compañias[row[1]].color,
      fillOpacity: 0.2,
      radius: row[2] !== 'Satelital' ? 550 : 1000
    }).addTo(map)
    circulo.bindPopup(`${row[1]}\n${row[2]}\n${row[3]}\n`)
  }catch (e){}})
}


