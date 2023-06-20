import { TMDBklijent } from "./klijentTMDB";
import { Konfiguracija } from "../konfiguracija";
import { Validacija } from "./api/validacija";

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

function validacijaZahtjeva(korime: string, lozinka: string) {
    return new Validacija().validacijaZahtjeva(korime, lozinka);
}

export class RestTMDB {

    tmdbKlijent: any;
    constructor(api_kljuc: any) {
        this.tmdbKlijent = new TMDBklijent(api_kljuc);
        // console.log(api_kljuc);
    }

    getZanr(zahtjev: any, odgovor: any) {

        // console.log(this);

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            this.tmdbKlijent.dohvatiZanrove().then((zanrovi: any) => {
                //console.log(zanrovi);
                odgovor.type("application/json")
                odgovor.send(zanrovi);
            }).catch((greska: any) => {
                odgovor.json( { greska: greska } );
            });
        } else {
            odgovor.json( { greska: greska } );
        }

    }

    getFilmovi(zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        // console.log(this);
        
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {

            if(stranica == null || rijeci == null){
                odgovor.status("417");
                odgovor.send({greska: "neocekivani podaci"});
                return;
            }

            this.tmdbKlijent.pretraziFilmove(rijeci, stranica).then((filmovi: any) => {
                //console.log(filmovi);
                odgovor.send(filmovi);
            }).catch((greska: any) => {
                odgovor.json( { greska: greska } );
            });

        } else {
            odgovor.json( { greska: greska } );
        }

    }
    
}