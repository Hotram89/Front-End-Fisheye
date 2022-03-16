import { displayData } from "./factories/photographer.js";
import { PageError } from "./providers/PageError.js"

// fonction pour recuperer les données du json
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let response = await fetch("./data/photographers.json");
  let data = ''
  try {
     data = await response.json();
  }
  
  catch { 
      console.log("ohé");
      let errorPage = new PageError()
        errorPage.buildIndex()
    }

  
console.dir(data)
 
  return data;
}

// Récupère les datas des photographes
const { photographers } = await getPhotographers();
displayData(photographers);
