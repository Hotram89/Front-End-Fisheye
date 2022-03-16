class PageError {

    build() {
        const section = document.querySelector('.gallerie')
        let content = ` <section id="erreurProfil">Oups, les données du photographe n'ont pas pu être chargées
        </section>`
        section.innerHTML = content
    }

    buildIndex() {
        const section = document.querySelector('main')
        let content = ` <section id="erreurProfil">Oups, les données des differents photographes n'ont pas pu être chargées
        </section>`
        section.innerHTML = content
    }
}

export { PageError}
