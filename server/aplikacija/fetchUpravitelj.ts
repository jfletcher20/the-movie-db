import { FilmoviZanroviPretrazivanje } from "./filmoviPretrazivanje";
const FilmoviPretrazivanje = FilmoviZanroviPretrazivanje;
// const kodovi = require("./moduli/kodovi.js");
import { Konfiguracija } from "../konfiguracija";
import { JWTKlasa } from "./moduli/jwt";
const jwt = new JWTKlasa();

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

import { Portovi } from "../servis/portovi";
const port: Portovi = new Portovi();
const url = port.url() + ":";
const restPort = port.rest();
// const appPort = 4200;

var autorizacija;

let fp = new FilmoviPretrazivanje();

export class FetchUpravitelj {

    apiTest = async (zahtjev: any, odgovor: any) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/zanr/test" + autorizacija);
        // console.log(rest)
        odgovor.json(rest)
    }

    korisnik = async (zahtjev: any, odgovor: any) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/korisnici/" + zahtjev.params.korime + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    }

    dajKorisnikFilm = async (zahtjev: any, odgovor: any) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/veze/film/" + zahtjev.params.id + "/korisnici" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    }

    dajPrijedloge = async (zahtjev: any, odgovor: any) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/filmovi/prijedlozi" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    }

    prihvatiPrijedlog = async (zahtjev: any, odgovor: any) => {
        autorizacija = "?jwt=" + zahtjev.session.jwt;
        // autorizacija = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka="
            //+ konf.dajKonf()["rest.lozinka"];
        let rest = await fetch(url + restPort + "/api/filmovi/" + zahtjev.params.id
            + "/prihvati" + autorizacija);
        let odg = await rest.text();
        odgovor.json(JSON.parse(odg));
    }

    brojStranica = async (zahtjev: any, odgovor: any) => {
        odgovor.json(konf.dajKonf()["app.broj.stranica"]);
    }

    dajTMDBZanrove = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.dohvatiTMDBZanrove("?jwt=" + zahtjev.session.jwt));
    }

    dajSveZanrove = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.dohvatiSveZanrove("?jwt=" + zahtjev.session.jwt));
    }

    dajDvaFilma = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr, "?jwt=" + zahtjev.session.jwt));
    }

    dajSveFilmove = async (zahtjev: any, odgovor: any) => {
        let prijedlozi = zahtjev.query.prijedlozi;
        switch(prijedlozi) {
            case undefined:
                prijedlozi = "";
                break;
            default:
                prijedlozi = "&prijedlozi=" + zahtjev.query.prijedlozi;
                break;
        }
        odgovor.json(await fp.dohvatiFilmove(1, 1000,
            "?jwt=" + zahtjev.session.jwt + prijedlozi));
    }

    dodajZanr = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.dodajZanr(zahtjev.body, "?jwt=" + zahtjev.session.jwt));
    }

    azurirajZanr = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.azurirajZanr(zahtjev.params.id, zahtjev.body, "?jwt=" + zahtjev.session.jwt));
    }

    ukloniZanr = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.ukloniZanr(zahtjev.params.id, "?jwt=" + zahtjev.session.jwt));
    }

    ukloniSveZanrove = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.ukloniSveZanrove("?jwt=" + zahtjev.session.jwt));
    }

    dajFilm = async (zahtjev: any, odgovor: any) => {
        odgovor.json(await fp.dajFilm(zahtjev.params.id, "?jwt=" + zahtjev.session.jwt));
    }

    prijavljen = async (zahtjev: any, odgovor: any) => {
        console.log("/prijavljen provjerava: jwt:", zahtjev.session.jwt != undefined, zahtjev.session.korime);
        /*if (!jwt.provjeriToken(zahtjev)) {
            console.log("Nitko nije prijavljen");
            odgovor.json({ korime: "Nije prijavljen" })
        } else*/ if(zahtjev.session.korime == null) {
            // console.log("Nitko nije prijavljen u sesiji");
            odgovor.json({ korime: "Nije prijavljen" })
        } else {
            console.log("Korisnik je prijavljen.", jwt.dajTijelo(zahtjev.session.jwt).korime,
                jwt.dajTijelo(zahtjev.session.jwt).tip_korisnika_id);
            odgovor.json(jwt.dajTijelo(zahtjev.session.jwt));
        }
    }

    dodajFilm = async (zahtjev: any, odgovor: any) => {
        console.log("[aplikacija/fetchUpravitelj.ts ln:119]: Poziv funkcije dodajFilm... Why tho")
        // console.log(zahtjev.body);
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neaoutorizirani pristup" });
        } else {
            //TODO obradi zahtjev
            odgovor.json({ok: "OK"});
        }
    }

}