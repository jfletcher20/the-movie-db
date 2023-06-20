export class TMDBklijent {

    bazicniURL = "https://api.themoviedb.org/3";
 
    apiKljuc: any;
    constructor(apiKljuc: any) {
        this.apiKljuc = apiKljuc; 
    }
 
    async dohvatiZanrove() {
        let resurs = "/genre/movie/list";
        let odgovor = await this.obaviZahtjev(resurs);
        return odgovor;
    }
 
    async dohvatiFilm(id: any) {
        let resurs = "/movie/" + id;
        let odgovor = await this.obaviZahtjev(resurs);
        return odgovor;
    }
 
    async pretraziFilmove(rijeci: any, stranica: any) {
 
        let resurs = "/discover/movie";
    
        let parametri: any = {
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: stranica,
            with_keywords: await this.dajKljucneRijeci(rijeci)
        };
    
        let odgovor = await this.obaviZahtjev(resurs, parametri);
        return odgovor;
 
    }
 
    async obaviZahtjev(resurs: any, parametri: any = "") {
 
        let zahtjev = this.bazicniURL + resurs + "?api_key=" + this.apiKljuc;
        for(let p in parametri) {
            zahtjev += "&" + p + "=" + parametri[p];
        }
    
        // console.log("klijentTMDB:", zahtjev);
    
        let odgovor = await fetch(zahtjev);
        let rezultat = await odgovor.text();
        return rezultat;
 
    }
 
    async dajKljucneRijeci(rijeci: any) {
 
        let resurs = "/search/keyword";
        let odgovor = "";

        if(rijeci == "")
            return odgovor;

        let prva = true;
    
        for(let rijec of rijeci.split(",")) {

            let parametri = {query: rijec, page: 1}
        
            let o = await this.obaviZahtjev(resurs,parametri);
            let r = JSON.parse(o);
        
            if (r.results.length == 0)
                return "0";

            // console.log("klijentTMDB:", r);
        
            if(prva) {
                odgovor += r.results[0].id;
                prva = false;
            } else
                odgovor += ","+r.results[0].id;

        }
    
        // console.log("klijentTMDB:", odgovor)
        return odgovor;
 
    }      

}