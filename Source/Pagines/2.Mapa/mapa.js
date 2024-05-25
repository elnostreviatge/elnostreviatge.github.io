//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);


google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);
  
  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['País', 'Dies'],
      ['France', 60],
      ['Italy', 47],
      ['Greece', 91],
      ['Spain', 4],
      ['', 0],
      ['', 100]
    ]);
  
    var options = {
      region: '150', 
    };
  
    var chart = new google.visualization.GeoChart(document.getElementById('mapa_div'));
  
    chart.draw(data, options);
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
  parentElement.appendChild(paragraf);
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

function creardiv(Idpare, Idpropi, classe) {
  var div = document.createElement("div");
  div.classList.add(classe);
  div.id = Idpropi;

  var parentElement = document.getElementById(Idpare);
  parentElement.appendChild(div);
}

fetch('cases.txt')
    .then(response => response.text())
    .then(rawData => {
        const lines = rawData.split('\n');
        lines.forEach((line, index) => {
            const [id, nom, host, nits, truites, imatges] = line.split('.');

            var segonid = `${id}.${id}`;
            creartitol(id, nom)

            creardiv(id, segonid, "informacio")

            creardiv(segonid, `text${id}`, "text")
            creardiv(segonid, `imatges${id}`, "imatges")
            generateGallery(imatges, id, `imatges${id}`)

            crearimatges(`text${id}`, "Host: ", host, "../../Icones/host.png")
            crearimatges(`text${id}`, "Nits: ", nits, "../../Icones/nits.png")
            crearimatges(`text${id}`, "Truites: ", truites, "../../Icones/truita.png")

            if (id === "1") {
              crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
              imprimirLiniesDesitjades([1,2,3], `text${id}`);

          } else if (id === "2") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([4,5,6,7], `text${id}`);
              
          } else if (id === "3") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([8,9], `text${id}`);
              
          } else if (id === "5") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([10,11,12,13,14,15,16,17,18,19,20], `text${id}`);
              
          } else if (id === "7") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([21], `text${id}`);

          } else if (id === "8") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([22], `text${id}`);

          } else if (id === "13") {
            crearimatges(`text${id}`, "Companys: ", "", "../../Icones/companys.png")
            imprimirLiniesDesitjades([23], `text${id}`);

              
          } else {
          }

        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
});


function imprimirLiniesDesitjades(liniesDesitjades, id) {  
  fetch('companys.txt')
    .then(response => response.text())
    .then(text => {
      var liniesArray = text.split('\n');
      liniesDesitjades.forEach(function(index) {
        if (index >= 0 && index < liniesArray.length) {
          creartitolclass(id, liniesArray[index-1], 'companys_text');
        }
      });
    })
    .catch(error => console.error('Error:', error));
}





function generateGallery(numImages, id, parentId) {
  const galleryContainer = document.getElementById(parentId);

  if (!galleryContainer) {
    console.error(`Element with id ${parentId} not found.`);
    return;
  }

  const largeImage = document.createElement('img');
  largeImage.id = `largeImage${id}`;
  largeImage.className = 'large-image';
  largeImage.src = `Imatges/${id}/1.jpg`;
  largeImage.alt = 'Imatge Gran';
  largeImage.loading = 'lazy';
  galleryContainer.appendChild(largeImage);

  const thumbnailsContainer = document.createElement('div');
  thumbnailsContainer.className = 'thumbnails';
  galleryContainer.appendChild(thumbnailsContainer);

  for (let i = 1; i <= numImages; i++) {
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'thumbnail';

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = `Imatges/${id}/${i}.jpg`;
    thumbnailImg.alt = `Imatge ${i}`;
    thumbnailImg.loading = 'lazy';

    thumbnailImg.addEventListener('click', function() {
      changeImage(`Imatges/${id}/${i}.jpg`, id);
    });

    thumbnailDiv.appendChild(thumbnailImg);
    thumbnailsContainer.appendChild(thumbnailDiv);
  }
}

function changeImage(src, id) {
  const largeImage = document.getElementById(`largeImage${id}`);
  largeImage.src = src;
}
