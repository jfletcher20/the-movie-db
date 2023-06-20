"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestTMDB = void 0;
const klijentTMDB_1 = require("./klijentTMDB");
const konfiguracija_1 = require("../konfiguracija");
const validacija_1 = require("./api/validacija");
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
function validacijaZahtjeva(korime, lozinka) {
    return new validacija_1.Validacija().validacijaZahtjeva(korime, lozinka);
}
class RestTMDB {
    tmdbKlijent;
    constructor(api_kljuc) {
        this.tmdbKlijent = new klijentTMDB_1.TMDBklijent(api_kljuc);
        // console.log(api_kljuc);
    }
    getZanr(zahtjev, odgovor) {
        // console.log(this);
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            this.tmdbKlijent.dohvatiZanrove().then((zanrovi) => {
                //console.log(zanrovi);
                odgovor.type("application/json");
                odgovor.send(zanrovi);
            }).catch((greska) => {
                odgovor.json({ greska: greska });
            });
        }
        else {
            odgovor.json({ greska: greska });
        }
    }
    getFilmovi(zahtjev, odgovor) {
        odgovor.type("application/json");
        // console.log(this);
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            if (stranica == null || rijeci == null) {
                odgovor.status("417");
                odgovor.send({ greska: "neocekivani podaci" });
                return;
            }
            this.tmdbKlijent.pretraziFilmove(rijeci, stranica).then((filmovi) => {
                //console.log(filmovi);
                odgovor.send(filmovi);
            }).catch((greska) => {
                odgovor.json({ greska: greska });
            });
        }
        else {
            odgovor.json({ greska: greska });
        }
    }
}
exports.RestTMDB = RestTMDB;
