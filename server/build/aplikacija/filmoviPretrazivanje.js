"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmoviZanroviPretrazivanje = void 0;
const konfiguracija_1 = require("../konfiguracija");
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
// const portRest = require(konst.dirPortova + "portovi_rest.js").jfletcher20;
const portovi_1 = require("../servis/portovi");
const portovi = new portovi_1.Portovi();
const portRest = portovi.rest();
const url = portovi.url() + ":" + portRest + "/api";
// const kodovi = require("./moduli/kodovi.js")
const kodovi_1 = require("./moduli/kodovi");
const kodovi = new kodovi_1.Kodovi();
// var autorizacija;
class FilmoviZanroviPretrazivanje {
    async dohvatiFilmove(stranica, kljucnaRijec = "", dodatni_parametri_i_jwt) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let putanja = url + "/filmovi/" + stranica + "&" + kljucnaRijec + dodatni_parametri_i_jwt;
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        return filmovi;
    }
    async dohvatiTMDBZanrove(autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let odgovor = await fetch(url + "/tmdb/zanr/" + autorizacija);
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }
    async dohvatiSveZanrove(autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        // console.log("Made it all the way here!", url + "/zanr" + autorizacija)
        let odgovor = await fetch(url + "/zanr" + autorizacija);
        let podaci = await odgovor.text();
        // console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }
    async dohvatiNasumceFilm(zanr, autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        // console.log("Made it all the way here!");
        let odgovor = await fetch(url + "/filmovi/1&200" + autorizacija);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        // let rez = [filmovi[kodovi.dajNasumceBroj(0, filmovi.length)],
        //             filmovi[kodovi.dajNasumceBroj(0, filmovi.length)]];
        let rez = [];
        let c = 0;
        let ind = kodovi.dajNasumceBroj(0, filmovi.length);
        let id;
        try {
            ind = kodovi.dajNasumceBroj(0, filmovi.length);
            id = filmovi[ind].id;
        }
        catch (e) {
            return rez;
        }
        let zodgovor = await fetch(url + "/veze/film/zanr" + autorizacija);
        let zpodaci = await zodgovor.text();
        let zanrovi = JSON.parse(zpodaci);
        let limit = 50;
        try {
            do {
                ind = kodovi.dajNasumceBroj(0, filmovi.length - 1);
                id = filmovi[ind].id;
                for (var z in zanrovi)
                    if (zanrovi[z].zanr_id == zanr && zanrovi[z].film_id == id) {
                        rez[c++] = filmovi[ind];
                        break;
                    }
            } while (rez.length < 2 && limit-- > 0);
        }
        catch (e) {
            return rez;
        }
        return rez;
    }
    async dodajZanr(body, autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let putanja = url + "/zanr" + autorizacija;
        // console.log("Dodavanje: " + body)
        let odgovor = await fetch(putanja, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return odgovor;
    }
    async azurirajZanr(id, body, autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let putanja = url + "/zanr/" + id + autorizacija;
        // console.log("Azuriranje: " + body)
        let odgovor = await fetch(putanja, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return odgovor;
    }
    async ukloniZanr(id, autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let putanja = url + "/zanr/" + id + autorizacija;
        // console.log("Brisanje: " + id)
        let odgovor = await fetch(putanja, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return odgovor;
    }
    async ukloniSveZanrove(autorizacija) {
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        let putanja = url + "/zanr" + autorizacija;
        // console.log("Brisanje svih nereferenciranih zanrova.")
        // console.log(putanja);
        let odgovor = await fetch(putanja, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return odgovor;
    }
    async dajSveFilmove(autorizacija) {
        console.log("[aplikacija/filmoviPretrazivanje ln:152]: Tko me budi iz sna?");
        // why are we still here? just to suffer?
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
    }
    async dajFilm(id, autorizacija) {
        // autorizacija = "?jwt=" + await new Konfiguracija().osvjeziAutorizaciju();
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let putanja = url + "/filmovi/" + id + autorizacija;
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let film = JSON.parse(podaci);
        return film;
    }
}
exports.FilmoviZanroviPretrazivanje = FilmoviZanroviPretrazivanje;
