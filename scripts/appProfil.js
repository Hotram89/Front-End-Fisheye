import { ApiProvider } from './providers/ApiProvider.js';
import { ProfilPage } from './pages/ProfilPage.js';
import { Lightbox } from './utils/Lightbox.js';
import { submitForm } from './utils/contactForm.js';
import { Filters } from './utils/Filters.js';
import { PageError } from './providers/PageError.js';

// Va chercher les données du json dans la class ApiProvider
new ApiProvider()
    .getPhotographers()
    .then(function (apiResult) {
        return apiResult.json();
    })

    .then(function (res) {
        let profilPage = new ProfilPage(res);
        let lightbox = new Lightbox(profilPage.mediaFotographers)
        let menu = document.getElementById('filters');

        profilPage.generateAll();
        lightbox.generateLightbox();
        // On ajoute les event listeners au menu
        menu.addEventListener('click', (event) => {
            
            const domItem = event.target.className

            // Si l'élément qui a reçu le clic est une option du menu (pas celle affichée)
            if (domItem.includes('filters') && !domItem.includes('selected')) {
                // On rafraîchit la galerie avec les médias triés selon l'option
                let filter = event.target.innerHTML;
                profilPage.generateCarrousel(filter);
                profilPage.setTotalLikes();
                profilPage.generateLike();
                // On exporte le tableau trié qu'on stocke dans newGallery
                const newGallery = profilPage.getMedias()
                // On vide la Lightbox
                lightbox.emptyLightbox();
                // On met à jour le tableau de médias (trié) dans l'objet lightbox
                lightbox.setMedias(newGallery)
                // On remplit la lightbox a partir du nouveau tableau trié
                lightbox.lightboxBuilder()
            }
            
        });

        menu.addEventListener('keydown',(e) => {
            let focus = document.querySelector(':focus')
            focus = focus.innerHTML;
            profilPage.generateCarrousel(focus);
            profilPage.setTotalLikes();
            profilPage.generateLike();
            
            
        })
    })


    .catch(function (e) {
        let errorPage = new PageError(e);
        errorPage.build();
        console.log(e);
    });
