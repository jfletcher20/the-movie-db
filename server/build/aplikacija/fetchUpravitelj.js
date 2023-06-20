"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchUpravitelj = void 0;
const filmoviPretrazivanje_1 = require("./filmoviPretrazivanje");
const FilmoviPretrazivanje = filmoviPretrazivanje_1.FilmoviZanroviPretrazivanje;
// const kodovi = require("./moduli/kodovi.js");
const konfiguracija_1 = require("../konfiguracija");
const jwt_1 = require("./moduli/jwt");
const jwt = new jwt_1.JWTKlasa();
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
const portovi_1 = require("../servis/portovi");
const port = new portovi_1.Portovi();
const url = port.url() + ":";
const restPort = port.rest();
// const appPort = 4200;
var autorizacija;
let fp = new FilmoviPretrazivanje();
class FetchUpravitelj {
    apiTest = async (zahtjev, odgovor) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/zanr/test" + autorizacija);
        // console.log(rest)
        odgovor.json(rest);
    };
    korisnik = async (zahtjev, odgovor) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/korisnici/" + zahtjev.params.korime + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    };
    dajKorisnikFilm = async (zahtjev, odgovor) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/veze/film/" + zahtjev.params.id + "/korisnici" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    };
    dajPrijedloge = async (zahtjev, odgovor) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/filmovi/prijedlozi" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    };
    prihvatiPrijedlog = async (zahtjev, odgovor) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka="
        //+ konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/filmovi/" + zahtjev.params.id
            + "/prihvati" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    };
    brojStranica = async (zahtjev, odgovor) => {
        odgovor.json(konf.dajKonf()["app.broj.stranica"]);
    };
    dajTMDBZanrove = async (zahtjev, odgovor) => {
        odgovor.json(await fp.dohvatiTMDBZanrove("?jwt=" + zahtjev.session.jwt));
    };
    dajSveZanrove = async (zahtjev, odgovor) => {
        odgovor.json(await fp.dohvatiSveZanrove("?jwt=" + zahtjev.session.jwt));
    };
    dajDvaFilma = async (zahtjev, odgovor) => {
        odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr, "?jwt=" + zahtjev.session.jwt));
    };
    dajSveFilmove = async (zahtjev, odgovor) => {
        let prijedlozi = zahtjev.query.prijedlozi;
        switch (prijedlozi) {
            case undefined:
                prijedlozi = "";
                break;
            default:
                prijedlozi = "&prijedlozi=" + zahtjev.query.prijedlozi;
                break;
        }
        odgovor.json(await fp.dohvatiFilmove(1, 1000, "?jwt=" + zahtjev.session.jwt + prijedlozi));
    };
    dodajZanr = async (zahtjev, odgovor) => {
        odgovor.json(await fp.dodajZanr(zahtjev.body, "?jwt=" + zahtjev.session.jwt));
    };
    azurirajZanr = async (zahtjev, odgovor) => {
        odgovor.json(await fp.azurirajZanr(zahtjev.params.id, zahtjev.body, "?jwt=" + zahtjev.session.jwt));
    };
    ukloniZanr = async (zahtjev, odgovor) => {
        odgovor.json(await fp.ukloniZanr(zahtjev.params.id, "?jwt=" + zahtjev.session.jwt));
    };
    ukloniSveZanrove = async (zahtjev, odgovor) => {
        odgovor.json(await fp.ukloniSveZanrove("?jwt=" + zahtjev.session.jwt));
    };
    dajFilm = async (zahtjev, odgovor) => {
        odgovor.json(await fp.dajFilm(zahtjev.params.id, "?jwt=" + zahtjev.session.jwt));
    };
    prijavljen = async (zahtjev, odgovor) => {
        console.log("/prijavljen provjerava: jwt:", zahtjev.session.jwt != undefined, zahtjev.session.korime);
        /*if (!jwt.provjeriToken(zahtjev)) {
            console.log("Nitko nije prijavljen");
            odgovor.json({ korime: "Nije prijavljen" })
        } else*/ if (zahtjev.session.korime == null) {
            // console.log("Nitko nije prijavljen u sesiji");
            odgovor.json({ korime: "Nije prijavljen" });
        }
        else {
            console.log("Korisnik je prijavljen.", jwt.dajTijelo(zahtjev.session.jwt).korime, jwt.dajTijelo(zahtjev.session.jwt).tip_korisnika_id);
            odgovor.json(jwt.dajTijelo(zahtjev.session.jwt));
        }
    };
    dodajFilm = async (zahtjev, odgovor) => {
        console.log("[aplikacija/fetchUpravitelj.ts ln:119]: Poziv funkcije dodajFilm... Why tho");
        // console.log(zahtjev.body);
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neaoutorizirani pristup" });
        }
        else {
            //TODO obradi zahtjev
            odgovor.json({ ok: "OK" });
        }
    };
}
exports.FetchUpravitelj = FetchUpravitelj;
