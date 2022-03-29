class Filters {
  constructor(medias) {
    this.medias = medias;
  }
  
  openFilters() {
    const filtersMenu = document.querySelector(".filtersMenu");
    const selectedFilter = document.querySelector(".selected");
    const wrapper = document.querySelector(".wrap");
    const chevron = document.querySelector(".filtersMenu img");

    filtersMenu.focus();

    filtersMenu.addEventListener("click", (event) => {
      
      wrapper.classList.toggle("active");
      chevron.classList.toggle("active");

      let monContenu = event.target.innerHTML;

      if ((monContenu === "Date")) {
        event.target.innerHTML = selectedFilter.innerHTML;
        selectedFilter.innerHTML = "Date";
      }
      if (monContenu === "Titre") {
        event.target.innerHTML = selectedFilter.innerHTML;
        selectedFilter.innerHTML = "Titre";
      }
      if (monContenu === "Popularité") {
         event.target.innerHTML = selectedFilter.innerHTML;
         selectedFilter.innerHTML = "Popularité";
      }
    });

    filtersMenu.addEventListener("keydown", (e) => {
      let focus = document.querySelector(":focus");
      focus = focus.innerHTML;

      if (e.key === "Enter") {
        wrapper.classList.toggle("active");
        chevron.classList.toggle("active");
      }

      if (focus == "Date" && e.key === "Enter") {
        e.target.innerHTML = selectedFilter.innerHTML;
        selectedFilter.innerHTML = "Date";
      }

      if (focus == "Titre" && e.key === "Enter") {
        e.target.innerHTML = selectedFilter.innerHTML;
        selectedFilter.innerHTML = "Titre";
      }

      if (focus == "Popularité" && e.key === "Enter") {
        e.target.innerHTML = selectedFilter.innerHTML;
        selectedFilter.innerHTML = "Popularité";
      }
    });
  }

  sortBy(typeDeTrie) {
    this.openFilters();
    switch (typeDeTrie) {
      case "Popularité":
        return this.likeFilter();
      case "Titre":
        return this.titleFilter();
      case "Date":
        return this.dateFilter();
      default:
        return this.likeFilter();
    }
  }

  likeFilter() {
    let array = Array.from(this.medias);
    array.sort(function compare(a, b) {
      if (a.likes < b.likes) {
        return -1;
      } else if (a.likes == b.likes) {
        return 0;
      } else {
        return 1;
      }
    });
    return array.reverse();
  }

  titleFilter() {
    let array = Array.from(this.medias);
    array.sort(function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      } else if (a.title == b.title) {
        return 0;
      } else {
        return 1;
      }
    });
    return array;
  }

  dateFilter() {
    let array = Array.from(this.medias);
    array.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
    });
    return array.reverse();
  }
}

export { Filters };
