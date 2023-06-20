"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestFilm = void 0;
// const Validacija = require("../api/validacija.js")
const filmDAO_1 = require("./filmDAO");
const konfiguracija_1 = require("../konfiguracija");
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
const validacija_1 = require("./api/validacija");
function validacijaZahtjeva(korime, lozinka) {
    return new validacija_1.Validacija().validacijaZahtjeva(korime, lozinka);
}
class RestFilm {
    getFilmovi = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let brojFilmova = zahtjev.params.brojFilmova;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            // fdao.dajSve().then((film: any) => {
            fdao.dajNekoliko(brojFilmova, zahtjev.query.prijedlozi).then((film) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    async getFilmById(id) {
        let odg = await fetch("https://api.themoviedb.org/3/movie/"
            + id + "?api_key=" + konf.dajKonf()["tmdb.apikey.v3"]);
        let film = await odg.text();
        film = JSON.parse(film);
        // console.log(film)
        return film;
    }
    postFilmovi = async function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO(), id = zahtjev.body.id, filmTMDB = await fdao.getFilmById(id);
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            try {
                let porukaTotal = "";
                fdao.dodaj(filmTMDB).then((poruka) => {
                    porukaTotal += JSON.stringify(poruka);
                }).catch((greska) => console.log(greska));
                // 2. param. treba dinamicki ucitati
                // fdao.dodajKorisnikPremaID(id, 1);
                setTimeout(() => {
                    try {
                        filmTMDB.genres.forEach((element) => {
                            fdao.dodajZanr(id, element.id).then((poruka) => {
                                porukaTotal += JSON.stringify(poruka);
                            }).catch((greska) => { console.log(greska); });
                        });
                    }
                    catch (err) {
                        console.log(err);
                    }
                }, 1);
                odgovor.send(porukaTotal);
            }
            catch (greska) {
                console.log(greska);
            }
        }
        else {
            odgovor.send(greska);
        }
    };
    getFilm = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.daj(id).then((film) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    putFilm = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let film = zahtjev.body;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.azuriraj(film, id).then((film) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            });
        }
        else {
            odgovor.send(greska);
        }
    };
    deleteFilm = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.obrisi(id).then((film) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    getZanroviFilma = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.dajZanroveFilma(id).then((zanrovi_filma) => {
                odgovor.send(JSON.stringify(zanrovi_filma));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    getZanrFilmVeze = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.dajZanroviFilmVeze().then((film_ima_zanr) => {
                odgovor.send(JSON.stringify(film_ima_zanr));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    getKorisnikFilmVeze = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.dajKorisniciFilmVeze(id).then((korisnik_has_film) => {
                odgovor.send(JSON.stringify(korisnik_has_film));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    getFilmoviPrijedlozi = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.dajFilmoviPrijedlog().then((prijedlozi) => {
                odgovor.send(JSON.stringify(prijedlozi));
            }).catch((greska) => odgovor.send(greska));
        }
        else {
            odgovor.send(greska);
        }
    };
    putFilmPrihvat = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let fdao = new filmDAO_1.FilmDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            fdao.prihvatiPrijedlogFilma(id).then((film) => {
                // console.log(film);
                odgovor.send(JSON.stringify(film));
            });
        }
        else {
            odgovor.send(greska);
        }
    };
}
exports.RestFilm = RestFilm;
