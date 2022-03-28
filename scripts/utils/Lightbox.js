import { Filters } from './Filters.js'

class Lightbox {
    constructor(medias) {
        this.medias = medias;
        
    }
    generateLightbox() {
        this.lightboxBuilder();
        this.addEventListener();
        this.keyboardNav();
    }

    lightboxBuilder(filter) {
        // on recupere le template de la ligthbox
        const template = document.getElementById('lightbox_template');
        const lightbox = document.getElementById('lightbox');

        // On clone le template
        const clone = document.importNode(template.content, true);
        // on met les elements du template dans la lightbox
        lightbox.appendChild(clone);
        lightbox.setAttribute('aria-label', 'image closeup view');
        
        let medias  = this.medias;
        let filters = new Filters(medias);
        medias = filters.sortBy(filter)
        console.log(filters);

        //on creer les cards medias de la ligthbox
        medias.forEach((media) => {
        // const buildLightboxMedia = lightbox.createElement('div');
            const containerLightbox = lightbox.querySelector('.container');
            const mediaCard = document.createElement('div');


            if (media.video) {
                mediaCard.innerHTML = `<video controls src='./assets/photos/${media.video}' alt='${media.title}'></video>
                                                <h2>${media.title} </h2>`;
                containerLightbox.appendChild(mediaCard);
            } else
                mediaCard.innerHTML = `<img src='./assets/photos/${media.image}' alt='${media.title}'/>
                <h2>${media.title}</h2>`;
            containerLightbox.appendChild(mediaCard);
            mediaCard.classList.add('lightboxMedias');
        });
    }

    destroyLightbox(){
        const lightbox = document.getElementById('lightbox');
    lightbox.innerHTML = ''
    }


    keyboardNav(){
        const lightbox = document.getElementById('lightbox');
        const lightboxMedias = document.querySelectorAll('.lightboxMedias');
        const mediasArray = Array.from(lightboxMedias);
        const articles = document.querySelectorAll('.article-media img, .article-media video')

        articles.forEach((article) => {
            article.addEventListener('keydown', (e) => {
                if (e.key ==='Enter') {
                    console.log('coucou');
                    lightbox.classList.add('active');       
                }
                console.log(e);
            })
        })
    
        let activMedia = document.querySelector('.lightboxImg');
        let index = mediasArray.indexOf(activMedia);

        lightbox.addEventListener('keydown', (e) => {

            //press next key
            if (e.keyCode === 39) {
                let activMedia = document.querySelector('.lightboxImg');
                activMedia.classList.remove('lightboxImg');
                index++;
                if (index >= lightboxMedias.length) {
                    index = 0;
                }
                lightboxMedias[index].classList.add('lightboxImg');
            }
            else if (e.keyCode === 37) {
                let activMedia = document.querySelector('.lightboxImg');
                index--;
                if (index < 0) {
                    index = lightboxMedias.length - 1;
                }
                activMedia.classList.remove('lightboxImg');
                lightboxMedias[index].classList.add('lightboxImg'); 
            }      
        });
    }

    addEventListener() {
        const gallery = document.querySelector('body');
        const lightbox = document.getElementById('lightbox');
        const lightboxMedias = document.querySelectorAll('.lightboxMedias');

        gallery.addEventListener('click', function (event) {
            let classes = event.target.className;
            let isActiv = classes.includes('gallery-media');

            //ouvrir la lightbox
            if (isActiv) {
                lightbox.classList.add('active');
            }

            // fermer la lightbox
            isActiv = classes.includes('lightbox__close');
            if (isActiv) {
                let activImg = document.querySelector('.lightboxImg');
                lightbox.classList.remove('active');
                activImg.classList.remove('lightboxImg');
            }

            // afficher le media dans la lightbox
            lightboxMedias.forEach((media) => {
                let img = media.querySelector('img, video');

                if (img.src == event.target.src) {
                    media.classList.add('lightboxImg');
                }
            });

            // bouton suivant
            isActiv = classes.includes('fa-chevron-right');
            const mediasArray = Array.from(lightboxMedias);

            let activMedia = document.querySelector('.lightboxImg');
            let index = mediasArray.indexOf(activMedia);

            if (isActiv) {
                let activMedia = document.querySelector('.lightboxImg');
                activMedia.classList.remove('lightboxImg');
                index++;
                if (index >= lightboxMedias.length) {
                    index = 0;
                }
                lightboxMedias[index].classList.add('lightboxImg');
            }

            isActiv = classes.includes('fa-chevron-left');
            if (isActiv) {
                let activMedia = document.querySelector('.lightboxImg');

                index--;
                if (index < 0) {
                    index = lightboxMedias.length - 1;
                }
                activMedia.classList.remove('lightboxImg');
                lightboxMedias[index].classList.add('lightboxImg');
            }
        });
    }
}

export { Lightbox };
