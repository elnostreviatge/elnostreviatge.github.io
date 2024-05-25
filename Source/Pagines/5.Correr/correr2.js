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

function creartitol(Id, textContent) {
    var paragraf = document.createElement("p");
    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add('titol');

    document.getElementById(Id).appendChild(paragraf);
}

function creartitolclass(Id, textContent, classe) {
    var paragraf = document.createElement("p");
    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add(classe);

    var parentElement = document.getElementById(Id);
    var firstChild = parentElement.firstChild; // Obté el primer fill del div

    parentElement.insertBefore(paragraf, firstChild);
}

function crearimatges(Id, boldContent, textContent, imageUrl) {
    var paragraf = document.createElement("p");

    var img = document.createElement("img");
    img.src = imageUrl;
    img.className = 'icones';
    img.setAttribute("loading", "lazy"); // Afegeix l'atribut per càrrega mandrosa

    paragraf.appendChild(img);

    var strong = document.createElement("strong");
    var strongText = document.createTextNode(boldContent);
    strong.appendChild(strongText);
    paragraf.appendChild(strong);

    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add('text_icones');

    document.getElementById(Id).appendChild(paragraf);
}

function crearcomentari(Id, boldContent, textContent, imageUrl) {
    var paragraf = document.createElement("p");

    var img = document.createElement("img");
    img.src = imageUrl;
    img.className = 'icones';

    paragraf.appendChild(img);

    var strong = document.createElement("strong");
    var strongText = document.createTextNode(boldContent);
    strong.appendChild(strongText);
    paragraf.appendChild(strong);

    paragraf.appendChild(document.createElement("br")); // Afegir un salt de línia
    paragraf.appendChild(document.createElement("br")); // Afegir un salt de línia

    var text = document.createTextNode(textContent);
    paragraf.appendChild(text);
    paragraf.classList.add('text_icones');

    document.getElementById(Id).appendChild(paragraf);
}

function generarHTML(id) {
    // Crear el div amb la classe 'titols' i l'id 'titol1'
    var titolDiv = document.createElement("div");
    titolDiv.className = "titols";
    titolDiv.id = `sortida${id}`;

    // Crear el div amb la classe 'informacio'
    var informacioDiv = document.createElement("div");
    informacioDiv.className = "informacio";

    // Crear el div amb la classe 'mapa' i l'id 'mapa1'
    var mapaDiv = document.createElement("div");
    mapaDiv.className = "mapa";
    mapaDiv.id = `mapa${id}`;

    // Crear el div amb la classe 'map-text' i l'id 'mapText1'
    var mapTextDiv = document.createElement("div");
    mapTextDiv.className = "map-text";
    mapTextDiv.id = `mapText${id}`;

    // Crear el div amb la classe 'fotos' i l'id 'fotos1'
    var fotosDiv = document.createElement("div");
    fotosDiv.className = "fotos";
    fotosDiv.id = `fotos${id}`;

    // Crear el div amb la classe 'gallery' i l'id 'gallery1'
    var galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";
    galleryDiv.id = `gallery${id}`;

    // Afegir els elements creats al div amb la classe 'map-section'
    var mapSectionDiv = document.querySelector(".map-section");
    mapSectionDiv.appendChild(titolDiv);
    mapSectionDiv.appendChild(informacioDiv);
    informacioDiv.appendChild(mapaDiv);
    informacioDiv.appendChild(mapTextDiv);
    informacioDiv.appendChild(fotosDiv);
    fotosDiv.appendChild(galleryDiv);

}

function crearMedia(numeroArgument, cadenamedia, id) {
    var numero = parseInt(numeroArgument);
    var arrayCadenes = cadenamedia.split(",");

    for (var i = 0; i < numero; i++) {
        var nouElement;
        if (arrayCadenes[i].startsWith("https://www.youtube.com/")) {
            // Si és una URL de YouTube, crea un element iframe
            var videoId = arrayCadenes[i].split("/embed/")[1];
            nouElement = document.createElement("iframe");
            nouElement.src = "https://www.youtube.com/embed/" + videoId;
            nouElement.loading = "lazy"; 
            nouElement.alt = "Vídeo " + (i + 1);
            nouElement.allowFullscreen = true;
            nouElement.controls = true;
            nouElement.classList.add("video");


        } else {
            // Si no, crea un element d'imatge
            nouElement = document.createElement("img");
            nouElement.src = "../5.Correr/Imatges/" + id + "/" + (i + 1) + "." + arrayCadenes[i];
            nouElement.alt = "Imatge " + (i + 1);
            nouElement.loading = "lazy"; 
        }

        var nouDiv = document.createElement("div");
        nouDiv.classList.add("grid-item");
        nouDiv.appendChild(nouElement);

        var pare = document.getElementById("gallery" + id);
        pare.appendChild(nouDiv);
    }
}





fetch('mapa.txt')
    .then(response => response.text())
    .then(rawData => {
        const lines = rawData.split('\n');
        lines.forEach((line, index) => {
            const [titol, id, km, estona, desnivell, ritme, lloc, data, zoom, media, cadenamedia, comentari] = line.split('#');
            generarHTML(id)

            crearmapa(`mapa${id}`, `gpx/${id}.gpx`, zoom);
            
            if (id === "1") {
                creartitol(`sortida${id}`, `${id}a "SORTIDA"`);

            } else if (id === "cursa") {
                creartitol(`sortida${id}`, `CURSA AL CASTELL DE RACCONIGI`);

            } else if (id === "marato") {
                creartitol(`sortida${id}`, `40ENA MARATÓ D'ATENES`);
                
            } else {
                creartitol(`sortida${id}`, `${id}a SORTIDA${titol}`);
            }

            crearimatges(`mapText${id}`, "Temps: ", estona, '../../Icones/temps.png');
            crearimatges(`mapText${id}`, "Quilòmetres: ", `${km} km`, '../../Icones/distancia.png');
            crearimatges(`mapText${id}`, "Desnivell: ", `${desnivell} m`, '../../Icones/desnivell.png');
            crearimatges(`mapText${id}`, "Ritme: ", `${ritme} m/km`, '../../Icones/ritme.png');
            crearimatges(`mapText${id}`, "Lloc: ", lloc, '../../Icones/mapa.png');
            crearimatges(`mapText${id}`, "Data: ", data, '../../Icones/calendari.png');
            crearcomentari(`mapText${id}`, "Comentari Ignasi: ", comentari, '../../Icones/comentari.png');

            creartitolclass(`fotos${id}`, `Multimèdia (${media})`, "titolmedia");

            if (media !== 0) {
                crearMedia(media, cadenamedia, id)
                }

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
