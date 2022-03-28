//////////////////////////////////////////////
//affiche le nombre de media image et video
class MediaBuilderFactory {
    
    build(media) {
        const sectionGallery = document.querySelector('.pictures');
        
        if (media.image) {
            const htmlInbox = `<article>
         <a>
         <img id=${media.id} src='./assets/photos/${media.image}' class='gallery-media' alt='${media.title}, closeup view' tabindex="0"></img></a>
         <div class='photo-details'>
              <h3>${media.title} </h3>
              <div class='likes' tabindex="0">
                <span class='likes__nbr'>${media.likes}</span>
                &nbsp<span class='fas fa-heart' aria-label='likes' aria-hidden='true'></span></div>
          </div
     </article>`;
  
            const article = document.createElement('article');
            article.innerHTML = htmlInbox;

            sectionGallery.appendChild(article);
            article.classList.add('article-media');    }
        if (media.video) {
            const htmlInbox = `<article>
         <a>
         <video id=${media.id} poster='./assets/thumbs/${media.title}.jpg' 
         src='./assets/photos/${media.video}' type='video/mp4' class='gallery-media' alt='${media.title}, closeup view' tabindex="0">
         </video>
         </a>
         <div class='photo-details'>
              <h3>${media.title} </h3>
              <div class='likes' tabindex="0"><span class='likes__nbr'>${media.likes}</span>&nbsp<span class='fas fa-heart' aria-label='likes' aria-hidden='true'></span></div>
          </div
     </article>`;
            const article = document.createElement('div');
            article.innerHTML = htmlInbox;
            sectionGallery.appendChild(article);
            article.classList.add('article-media'); 
        }
    }
}

export {MediaBuilderFactory}
