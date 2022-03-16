import { ApiProvider } from "./providers/apiProvider.js";

import { ProfilPage } from "./pages/ProfilPage.js";
import { Lightbox } from "./utils/Lightbox.js";
import { submitForm } from "./utils/contactForm.js";
import { Filters } from "./utils/Filters.js";
import { PageError} from "./providers/PageError.js"

////////////////////////////////////////

//va chercher les données du json dans la class ApiProvider
new ApiProvider()
  .getPhotographers()

  .then(function (apiResult) {
    return apiResult.json();
  })

    .then(function (res) {
        let profilPage = new ProfilPage(res);
        profilPage.generateAll()
        
        new Lightbox(profilPage.mediaFotographers).generateLightbox();
       
        let menu = document.getElementById('filters')
        menu.addEventListener("change", (event) => {
            let filter = event.target.value;
          profilPage.generateCarrousel(filter);
          profilPage.generateLike()
        })
       
  })


//   //submitForm();

  .catch(function (e) {
    console.log("zut ça ne marche pas");
    let errorPage = new PageError(e)
    errorPage.build()
    console.log(e);
   });


