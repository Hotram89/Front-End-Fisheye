import { displayData } from './factories/photographer.js';
import { PageError } from './providers/PageError.js';

// fonction pour recuperer les données du json
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let response = await fetch('./data/photographers.json');
    let data = '';
    try {
        data = await response.json();
    }
  
    catch { 
        let errorPage = new PageError();
        errorPage.buildIndex();
    }

    return data;
}

// Récupère les datas des photographes
const { photographers } = await getPhotographers();
displayData(photographers);



