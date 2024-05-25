//Back to top
var backToTopLink = document.createElement('a');
backToTopLink.href = '#top';
backToTopLink.innerHTML = 'Torna a dalt';
backToTopLink.classList.add('back-to-top-link');
document.body.appendChild(backToTopLink);


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
  

  document.addEventListener('DOMContentLoaded', function() {
    // Crida a generateGallery amb els paràmetres desitjats
    generateGallery("4", "1", "galeria");
});
