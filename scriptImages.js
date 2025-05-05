
function showImageWhenReady() {
    const image1Images = document.querySelectorAll('.image1Containers .image1');
    const coverImageImages = document.querySelectorAll('.coverImage');
    
    image1Images.forEach((img) => {
      const container = img.closest('.image1Containers'); 
      if (!img || !container) return;
  
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = "1"; 
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          img.style.opacity = "1"; 
        });
      }
    });
  
    // Handle coverImage images
    coverImageImages.forEach((img) => {
      const container = img.closest('.coverImageContainer'); 
      
      if (!img || !container) return;
  
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = "1"; 
        container.style.backgroundColor = 'white';
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          img.style.opacity = "1"; 
        });
      }
    });
  }
  
  window.addEventListener("pageshow", showImageWhenReady); 
  document.addEventListener("DOMContentLoaded", showImageWhenReady);