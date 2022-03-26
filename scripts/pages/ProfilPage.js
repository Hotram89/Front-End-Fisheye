import { MediaBuilderFactory } from '../factories/MediaBuilderFactory.js';
import { Filters } from '../utils/Filters.js';
///////////////////////////////////////////////
// constuction de la page photographer.js
class ProfilPage {
    constructor(response) {
        this.medias = response.media;
        this.photographers = response.photographers;

        let url = new URL(window.location.href);
        let photographerId = url.searchParams.get('id');

        this.mediaFotographers = new Set();
        this.medias.forEach((media) => {
            if (photographerId == media.photographerId) {
                this.mediaFotographers.add(media);
            }
        });

        this.photographers.forEach((photograph) => {
            if (photographerId == photograph.id) {
                this.photographer = photograph;
            }
        });

        this.likes = 0;
    }

    // initialise tout
    generateAll() {
        this.generateProfilDetail();
        this.generateCarrousel();
        this.generateFooter();
        this.generateLike();
        this.nameContactModal();
        
    }
  
      
    //////////////////////////////////////////////////
    // construit le header de la page photographer.html
    generateProfilDetail() {
        //get DOM elements
        const photographersHeader = document.querySelector('.photograph-header');
        const contactBtn = document.querySelector('.contact_button');

        let profil = this.photographer;
        //create HTML bloc
        const userImg = `
        <img src='./assets/photographers/${profil.portrait}' alt='${profil.name}'></img>`;
        const htmlHeader = `
                    <h2>${profil.name}</h2>       
                <div class='photographer-details'>
                            <h3>${profil.city}, ${profil.country}</h3>
                            <h5>${profil.tagline}</h5>
                           
                </div>`;

        //create variables and put HTML inside
        let image = document.createElement('div');
        image.innerHTML = userImg;
        const article = document.createElement('article');
        article.innerHTML = htmlHeader;

        // insert HTML into the page
        photographersHeader.appendChild(image);
        photographersHeader.insertBefore(article, contactBtn);
        let ariaName = "contact me " + profil.name
        contactBtn.setAttribute("aria-label", ariaName)
    }

    ////////////////////////////////////////////
    // construit la gallerie de photos et videos
    generateCarrousel(filter) {
        this.likes = 0;
        const sectionGallery = document.querySelector('.pictures');
        sectionGallery.innerHTML = '';
        let builder = new MediaBuilderFactory();
        let medias  = this.mediaFotographers;
        let filters = new Filters(medias);
        medias = filters.sortBy(filter)
        
        medias.forEach((media) => {
            builder.build(media);

            this.likes += media.likes;            
        });
    }
    nameContactModal() {
        let profil = this.photographer
        const name = document.getElementById('contactName')
        name.innerHTML= profil.name
    }
    ////////////////////////////////////////////
    // construit le footer avec le prix et les likes
    generateFooter() {
        let profil = this.photographer;

        const prix = document.createElement('div');
        prix.classList.add('priceBox');
        const htmlPrice = `
            <div class='numbersOfLikes'><span>${this.likes}</span> <i class='fas fa-heart' aria-label='likes' aria-hidden='true'></i></div>
            <div class='price'>${profil.price}€ /jour</div>`;
        prix.innerHTML = htmlPrice;
        main.append(prix);
    }

    setTotalLikes() {
        document.querySelector('.numbersOfLikes  span').innerHTML= this.likes;
    }

    generateLike() {

        const likes = document.querySelectorAll('.likes');
        let footer = document.querySelector('.numbersOfLikes  span');
        let totalLikes = parseInt(footer.innerHTML);

        likes.forEach((el) => {
            el.addEventListener('click', (e) => {
            
                //recup le span nombre
                const numero = el.querySelector('.likes__nbr');
                const coeur = el.querySelector('.fa-heart');

                //recup le html existant
                let elNbLike = parseInt(numero.innerHTML);

                //remplace le html par un nombre et ajoute 1
            
                coeur.classList.toggle('liked')

                //ajoute une classe
                let isLiked = coeur.classList.contains('liked')
                numero.innerHTML = isLiked ? ++elNbLike : --elNbLike;
            
                footer.innerHTML = isLiked ? ++totalLikes : --totalLikes;

                localStorage.setItem('gcliké', 'oui');
            });
        });
    }
}

export { ProfilPage };
