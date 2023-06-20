// const Validacija = require("../api/validacija.js")
import { FilmDAO } from "./filmDAO";
import { Konfiguracija } from "../konfiguracija";

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

import { Validacija } from "./api/validacija";
function validacijaZahtjeva(korime: string, lozinka: string) {
    return new Validacija().validacijaZahtjeva(korime, lozinka);
}

export class RestFilm {

    getFilmovi = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let fdao = new FilmDAO();

        let brojFilmova = zahtjev.params.brojFilmova;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            // fdao.dajSve().then((film: any) => {
            fdao.dajNekoliko(brojFilmova, zahtjev.query.prijedlozi).then((film: any) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    async getFilmById(id: any) {
        let odg = await fetch("https://api.themoviedb.org/3/movie/"
            + id + "?api_key=" + konf.dajKonf()["tmdb.apikey.v3"])
        let film = await odg.text()
        film = JSON.parse(film)
        // console.log(film)
        return film;
    }

    postFilmovi = async function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        let fdao = new FilmDAO(), id = zahtjev.body.id, filmTMDB: any = await fdao.getFilmById(id);
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            try {
                let porukaTotal = "";
                fdao.dodaj(filmTMDB).then((poruka: any) => {
                    porukaTotal += JSON.stringify(poruka);
                }).catch((greska: any) => console.log(greska));
                // 2. param. treba dinamicki ucitati
                // fdao.dodajKorisnikPremaID(id, 1);
                setTimeout(() => {
                    try {
                        filmTMDB.genres.forEach((element: any) => { 
                            fdao.dodajZanr(id, element.id).then((poruka: any) => {
                                porukaTotal += JSON.stringify(poruka);
                            }).catch((greska: any) => { console.log(greska); })
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }, 1);
                odgovor.send(porukaTotal);
            } catch(greska) {
                console.log(greska);
            }
        } else {
            odgovor.send(greska);
        }
    }

    getFilm = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        let fdao = new FilmDAO();

        let id = zahtjev.params.id;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.daj(id).then((film: any) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    putFilm = function (zahtjev: any, odgovor: any) {
        
        odgovor.type("application/json");
        let fdao = new FilmDAO();

        let id = zahtjev.params.id;
        let film = zahtjev.body;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.azuriraj(film, id).then((film: any) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            })
        } else {
            odgovor.send(greska);
        }

    }

    deleteFilm = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        let fdao = new FilmDAO();

        let id = zahtjev.params.id;
        
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.obrisi(id).then((film: any) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    getZanroviFilma = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let fdao = new FilmDAO();
        let id = zahtjev.params.id;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.dajZanroveFilma(id).then((zanrovi_filma: any) => {
                odgovor.send(JSON.stringify(zanrovi_filma));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    getZanrFilmVeze = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let fdao = new FilmDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.dajZanroviFilmVeze().then((film_ima_zanr: any) => {
                odgovor.send(JSON.stringify(film_ima_zanr));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    getKorisnikFilmVeze = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let fdao = new FilmDAO();
        let id = zahtjev.params.id;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.dajKorisniciFilmVeze(id).then((korisnik_has_film: any) => {
                odgovor.send(JSON.stringify(korisnik_has_film));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    getFilmoviPrijedlozi = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        let fdao = new FilmDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.dajFilmoviPrijedlog().then((prijedlozi: any) => {
                odgovor.send(JSON.stringify(prijedlozi));
            }).catch((greska: any) => odgovor.send(greska));
        } else {
            odgovor.send(greska);
        }

    }

    putFilmPrihvat = function (zahtjev: any, odgovor: any) {
        
        odgovor.type("application/json");
        let fdao = new FilmDAO();

        let id = zahtjev.params.id;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            fdao.prihvatiPrijedlogFilma(id).then((film: any) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            })
        } else {
            odgovor.send(greska);
        }

    }

}