import { ApiProvider } from './providers/ApiProvider.js';

import { ProfilPage } from './pages/ProfilPage.js';
import { Lightbox } from './utils/Lightbox.js';
import { submitForm } from './utils/contactForm.js';
import { Filters } from './utils/Filters.js';
import { PageError } from './providers/PageError.js';

////////////////////////////////////////

//va chercher les données du json dans la class ApiProvider
new ApiProvider()
    .getPhotographers()
    .then(function (apiResult) {
        return apiResult.json();
    })

    .then(function (res) {
        let profilPage = new ProfilPage(res);
        profilPage.generateAll();

        new Lightbox(profilPage.mediaFotographers).generateLightbox();

        let menu = document.getElementById('filters');
        menu.addEventListener('click', (event) => {
            let filter = event.target.innerHTML;
            profilPage.generateCarrousel(filter);
            profilPage.setTotalLikes();
            profilPage.generateLike();
        });
    })


    .catch(function (e) {
        let errorPage = new PageError(e);
        errorPage.build();
        console.log(e);
    });
