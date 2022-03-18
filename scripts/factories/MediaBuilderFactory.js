//////////////////////////////////////////////
//affiche le nombre de media image et video
class MediaBuilderFactory {
    
    build(media) {
        const sectionGallery = document.querySelector(".pictures");
        
      if (media.image) {
        const htmlInbox = `<a>
         <img id=${media.id} src="./assets/photos/${media.image}" class="gallery-media" alt="${media.title}, closeup view"></img>
         <div class="photo-details">
              <h3>${media.title} </h3>
              <div class="likes"><span class="likes__nbr">${media.likes}</span>&nbsp<span class="fas fa-heart" aria-label="likes"></span></div>
          </div
     </a>`;
  
        const article = document.createElement("article");
        article.innerHTML = htmlInbox;

        sectionGallery.appendChild(article);
        article.classList.add('article-media');    }
      if (media.video) {
        const htmlInbox = `<a>
         <video id=${media.id} poster="./assets/thumbs/${media.title}.jpg" 
         src="./assets/photos/${media.video}" type="video/mp4" class="gallery-media" alt="${media.title}, closeup view">
         </video>
         <div class="photo-details">
              <h3>${media.title} </h3>
              <div class="likes"><span class="likes__nbr">${media.likes}</span>&nbsp<span class="fas fa-heart" aria-label="likes"></span></div>
          </div
     </a>`;
     const article = document.createElement("article");
        article.innerHTML = htmlInbox;
        sectionGallery.appendChild(article);
        article.classList.add('article-media'); 
      }
    }
  }

  export {MediaBuilderFactory}
