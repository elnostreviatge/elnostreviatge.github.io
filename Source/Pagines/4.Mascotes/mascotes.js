document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');

  filters.forEach(filter => {
      filter.addEventListener('click', function () {
          // Elimina la classe de tots els botons
          filters.forEach(btn => btn.classList.remove('selected-filter'));

          // Afegeix la classe només al botó actual
          this.classList.add('selected-filter');

          const category = this.getAttribute('data-category');
          filterImages(category);
      });
  });

  function filterImages(category) {
      const galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          if (category === 'all' || category === itemCategory) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  }
});

function assignAltText() {
  // Obté totes les instàncies de la classe .gallery-item
  var galleryItems = document.querySelectorAll('.gallery-item');

  // Recorre cada element de la col·lecció
  galleryItems.forEach(function (item) {
      // Obté el text de l'element h3 dins de cada .gallery-item
      var textH3 = item.querySelector('h3').innerText;

      // Obté la imatge dins de cada .gallery-item
      var imgElement = item.querySelector('img');

      // Assigna el text com a valor de l'atribut alt de la imatge
      imgElement.alt = textH3;
  });
}


document.addEventListener("DOMContentLoaded", function() {
  // Obtenir l'element div amb la classe "gallery" dins del main
  const galleryContainer = document.getElementById('image-gallery');

  // Fer una crida AJAX amb fetch per obtenir el contingut del fitxer de text
  fetch('mascotes.txt')
    .then(response => response.text())
    .then(rawData => {
      // Dividir les línies de l'arxiu de text
      const lines = rawData.split('\n');

      // Crear una divisió per a cada línia
      lines.forEach(line => {
        const [nom, id, category, location, country, orientation, jpg] = line.split(',');
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', category);
      
        // Afegir la classe 'horizontal' si la categoria d'orientació és 'horizontal'
        if (orientation.trim().toLowerCase() === 'h') {
          galleryItem.classList.add('horizontal');
        }
      
        galleryItem.innerHTML = `
        <a href="Fotos/${nom}.${jpg}" onclick="return false;">
        <img src="Fotos/${nom}.${jpg}" loading="lazy" alt="${id}, ${category}">
        </a>
        <h3>${id}</h3>
        <p id="migtítol">${category}</p>
        <p>${location}, ${country}</p>
      `;
            
        galleryContainer.appendChild(galleryItem);
      });
     })
    .catch(error => {
      console.error('Error en carregar el fitxer:', error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const galleryContainer = document.getElementById('image-gallery');

  filters.forEach(filter => {
    filter.addEventListener('click', function () {
      filters.forEach(btn => btn.classList.remove('selected-filter'));
      this.classList.add('selected-filter');

      const category = this.getAttribute('data-category');
      filterImages(category);
    });
  });

  function filterImages(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (category === 'all' || category === itemCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function assignAltText() {
    var galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
      var textH3 = item.querySelector('h3').innerText;
      var imgElement = item.querySelector('img');
      imgElement.alt = textH3;
    });
  }

  galleryContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG' && clickedElement.parentElement.tagName === 'A') {
      event.preventDefault();
      const imageUrl = clickedElement.parentElement.href;
      const imageTitle = clickedElement.alt;
      openModal(imageUrl, imageTitle);
    }
  });

  function openModal(imageUrl, imageTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalImage = document.createElement('img');
    modalImage.src = imageUrl;

    var modalText = document.createElement('h2');
    modalText.textContent = imageTitle;

    modal.appendChild(modalImage);
    modal.appendChild(modalText);

    document.body.appendChild(modal);

    modal.addEventListener('click', function () {
        closeModal(modal);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal(modal);
        }
    });}

  function closeModal(modal) {
    document.body.removeChild(modal);
  }

  assignAltText();
});




//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);