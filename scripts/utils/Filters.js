class Filters {
    constructor(medias) {
        this.medias = medias;
    }

    sortBy(typeDeTrie) {
        switch(typeDeTrie) {
        case 'popularity':
            return this.likeFilter();
        case 'title' :
            return this.titleFilter();
        case 'date' :
            return this.dateFilter();
        default :
            return this.medias;                
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
        })
        return array.reverse()
    }
}

export { Filters };
