var redIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});  

var greenIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});  


function crearmapa(id, nom, zoom) {
    var map = L.map(id, { zoomControl: true });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    var gpxLayer = omnivore.gpx(nom).addTo(map);

    gpxLayer.on('ready', function() {
    map.fitBounds(gpxLayer.getBounds());

    map.setZoom(map.getZoom() - zoom);

    var coordinates = [];
    gpxLayer.eachLayer(function(layer) {
        if (layer.getLatLng) {
            coordinates.push(layer.getLatLng());
        } else if (layer.getLatLngs) {
            coordinates = coordinates.concat(layer.getLatLngs());
        }
    });

    L.marker(coordinates[0], {icon: greenIcon}).addTo(map).bindPopup("Sortida");
    L.marker(coordinates[coordinates.length - 1], {icon: redIcon}).addTo(map).bindPopup("Arribada");

    });
}


function creartitol(Id, textContent, classe) {
    var paragraf = document.createElement("p");
    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add(classe);

    document.getElementById(Id).appendChild(paragraf);
}

function creartitolabans(Id, textContent, classe) {
    var paragraf = document.createElement("p");
    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add(classe);

    var parentElement = document.getElementById(Id);
    var firstChild = parentElement.firstChild; // Obté el primer fill del div

    parentElement.insertBefore(paragraf, firstChild);
}


function crearimatges(Id, textContent, imageUrl) {
    var paragraf = document.createElement("p");

    var img = document.createElement("img");
    img.src = imageUrl;

    img.className = "icones";

    paragraf.appendChild(img);

    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add('text_icones');

    document.getElementById(Id).appendChild(paragraf);
}

fetch('mapa.txt')
    .then(response => response.text())
    .then(rawData => {
        const lines = rawData.split('\n');
        lines.forEach((line, index) => {
            const [id, km, estona, desnivell, ritme, lloc, data, zoom, media] = line.split(',');
            crearmapa(`mapa${id}`, `gpx/${id}.gpx`, zoom);
            
            
            if (id === "1") {
                creartitol(`titol${id}`, `${id}a "SORTIDA"`, "titol");

            } else if (id === "cursa") {
                creartitol(`titol${id}`, `CURSA AL CASTELL DE RACCONIGI`, "titol");

            } else if (id === "16") {
                creartitol(`titol${id}`, `${id}a SORTIDA (Ainhoa sola)`, "titol");   

            } else if (id === "25") {
                creartitol(`titol${id}`, `40ENA MARATÓ D'ATENES`, "titol");
                
            } else {
                creartitol(`titol${id}`, `${id}a SORTIDA`, "titol");
            }

            crearimatges(`mapText${id}`, `Temps: ${estona}`, '../../Icones/temps.png');
            crearimatges(`mapText${id}`, `Quilòmetres: ${km} km`, '../../Icones/distancia.png');
            crearimatges(`mapText${id}`, `Desnivell: ${desnivell} m`, '../../Icones/desnivell.png');
            crearimatges(`mapText${id}`, `Ritme: ${ritme} km/m`, '../../Icones/ritme.png');
            crearimatges(`mapText${id}`, `Lloc: ${lloc}`, '../../Icones/mapa.png');
            crearimatges(`mapText${id}`, `Data: ${data}`, '../../Icones/calendari.png');

            creartitolabans(`fotos${id}`, `Media (${media})`, "titolmedia");

        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
});

//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);








// Obtenir elements del DOM
const overlay = document.getElementById('overlay');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');

// Afegir esdeveniment clic a les imatges
document.querySelectorAll('.grid-item img').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('src');
        modalImg.setAttribute('src', imgSrc);
        overlay.style.display = 'flex';
    });
});

// Afegir esdeveniment clic al botó de tancar
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});


// Obtenir elements del DOM
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images = document.querySelectorAll('.grid-item img');
let currentIndex = 0;


// Funció per mostrar la imatge següent
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const imgSrc = images[currentIndex].getAttribute('src');
    modalImg.setAttribute('src', imgSrc);
}

// Funció per mostrar la imatge anterior
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const imgSrc = images[currentIndex].getAttribute('src');
    modalImg.setAttribute('src', imgSrc);
}

// Afegir esdeveniment clic a les fletxes
prevBtn.addEventListener('click', showPreviousImage);
nextBtn.addEventListener('click', showNextImage);