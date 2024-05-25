// Obté els elements HTML
var modal = document.getElementById("media-ampliat");
var media = document.querySelectorAll(".imatge-modal, .video-modal"); // Selecciona tant les imatges com els vídeos
var tancar = document.querySelector(".close"); // Botó de tancar

media.forEach(function(element) {
  element.addEventListener("click", function() {
    modal.style.display = "block";
    if (element.tagName === "IMG") {
      modal.querySelector(".modal-content-img").src = element.src;
      canviarContingutAImatge();
    } else if (element.tagName === "IFRAME") {
      var videoSrc = element.getAttribute('src');
      modal.querySelector(".modal-content-vid").src = videoSrc;
      canviarContingutAVideo();
    }
  });
});

// Tancar la finestra modal quan es fa clic en el botó de tancar
tancar.addEventListener("click", function() {
  modal.style.display = "none";
});

// Tancar la finestra modal quan es fa clic fora del mitjà
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});




function canviarImatge(direccio) {
  var mediaActual = modal.querySelector(".modal-content-img, .modal-content-vid");

  var currentIndex = Array.from(media).findIndex(function(element) {
      return element.src === mediaActual.src || element.getAttribute('src') === mediaActual.getAttribute('src');
  });

  var newIndex = currentIndex + direccio;

  // Comprovació addicional de l'índex actual
  if (currentIndex === -1) {
      console.error("No s'ha trobat l'índex de l'element multimèdia actual.");
      return;
  }

  // Comprovació de límits per assegurar-nos que l'índex no surt dels límits de l'array
  if (newIndex < 0 || newIndex >= media.length) {
      console.warn("L'índex està fora dels límits: ", newIndex);
      return;
  }

  var nextMedia = media[newIndex];
  var currentTag = nextMedia.tagName;

  console.log("currentIndex: ", currentIndex);
  console.log("newIndex: ", newIndex);
  console.log("currentTag: ", currentTag);
  console.log("nextMedia: ", nextMedia);

  if (currentTag === "IMG") {
      console.log("IMG");
      canviarContingutAImatge();
      document.getElementById("imatge-ampliada").src = nextMedia.src;
  } else if (currentTag === "IFRAME") {
      console.log("IFRAME");
      canviarContingutAVideo();
      document.getElementById("video-ampliat").src = nextMedia.src;
  } else {
      console.error("Tag desconegut: ", currentTag);
  }
}






function canviarContingutAVideo() {
  var imatge = document.getElementById('imatge-ampliada');
  var iframe = document.getElementById('video-ampliat');
  
  // Amaga la imatge i mostra l'iframe
  imatge.style.display = 'none';
  iframe.style.display = 'block';
}

function canviarContingutAImatge() {
  var imatge = document.getElementById('imatge-ampliada');
  var iframe = document.getElementById('video-ampliat');
  
  // Amaga l'iframe i mostra la imatge
  imatge.style.display = 'block';
  iframe.style.display = 'none';
}
