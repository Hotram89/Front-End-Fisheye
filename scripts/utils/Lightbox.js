class Lightbox {
    constructor(medias) {
        this.medias = medias;
    }

    generateLightbox() {
        this.lightboxBuilder();
        this.addEventListener();
        this.keyboardNav();
    }

    emptyLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.innerHTML = ''
    }

    setMedias(mediaArray) {
        this.medias = mediaArray
    }

    lightboxBuilder() {
        // on recupere le template de la ligthbox
        const template = document.getElementById('lightbox_template');
        const lightbox = document.getElementById('lightbox');

        // On clone le template
        const clone = document.importNode(template.content, true);
        // on met les elements du template dans la lightbox
        lightbox.appendChild(clone);
        lightbox.setAttribute('aria-label', 'image closeup view');
        
        let medias  = this.medias;

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

    keyboardNav(){
        const lightbox = document.getElementById('lightbox');
        const lightboxMedias = document.querySelectorAll('.lightboxMedias');
        const mediasArray = Array.from(lightboxMedias);
        const articles = document.querySelectorAll('.article-media img, .article-media video')

        articles.forEach((article) => {
            article.addEventListener('keydown', (e) => {
                if (e.key ==='Enter') {
                    lightbox.classList.add('active');       
                }
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
        const lightbox = document.getElementById('lightbox');
        document.body.addEventListener('click', handleClick)
        function handleClick(event) {
            let lightboxMedias = document.querySelectorAll('.lightboxMedias');

            // ------------- DOM ELEMENTS ------------- //
            // Event Targets
            const targetClasses = event.target.className;
            // Gallery medias
            const media = targetClasses.includes('gallery-media')
            // Lightbox close button
            const lightboxCloseButton = targetClasses.includes('lightbox__close')
            // Lightbox button 'next'
            const lightboxNextButton = targetClasses.includes('fa-chevron-right')
            // Lightbox button 'previous
            const lightboxPreviousButton = targetClasses.includes('fa-chevron-left')
            // ----------------------------------------- //

            // Ouvrir la lightbox
            if (media) {
                lightbox.classList.add('active');

                // Afficher le premier media dans la lightbox
                lightboxMedias.forEach((mediaDiv) => {
                    let img = mediaDiv.querySelector('img, video');
                    if (img.src == event.target.src) mediaDiv.classList.add('lightboxImg')
                });
            }

            let mediasArray = Array.from(lightboxMedias);
            let activeMedia = document.querySelector('.lightboxImg');
            let index = mediasArray.indexOf(activeMedia);

            // Fermer la lightbox
            if (lightboxCloseButton) {
                let activeImg = document.querySelector('.lightboxImg');
                lightbox.classList.remove('active');
                activeImg.classList.remove('lightboxImg');
            }

            // Bouton "Suivant"
            if (lightboxNextButton) {

                let activeMedia = document.querySelector('.lightboxImg');
                activeMedia.classList.remove('lightboxImg');
                index++;
                if (index >= lightboxMedias.length) index = 0;
                lightboxMedias[index].classList.add('lightboxImg');
            }

            // Bouton "Précédent"
            if (lightboxPreviousButton) {
                let activeMedia = document.querySelector('.lightboxImg');
                index--;
                if (index < 0) index = lightboxMedias.length - 1;
                activeMedia.classList.remove('lightboxImg');
                lightboxMedias[index].classList.add('lightboxImg');
            }
        };
    }
    
}



export { Lightbox };
