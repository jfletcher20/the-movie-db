"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autentifikacija = void 0;
const konfiguracija_1 = require("../konfiguracija");
const portovi_1 = require("../servis/portovi");
const kodovi_1 = require("./moduli/kodovi");
const portovi = new portovi_1.Portovi();
const portRest = portovi.rest();
const url = portovi.url() + ":";
const kodovi = new kodovi_1.Kodovi();
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
let autorizacija = "?korime="
    + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
// let autorizacija: string;
async function ucitajAuth() {
    let jwtAut = "?jwt=";
    await setTimeout(async () => {
        console.log("JWT vrijednosti kod autentifikacija.ts: ", await portovi.getJWT());
        jwtAut += await portovi.getJWT();
    }, 2000);
    console.log(jwtAut);
    return jwtAut;
}
class Autentifikacija {
    constructor() { ucitajAuth(); }
    ;
    async dodajKorisnika(korisnik) {
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, korisnik.korime),
            email: korisnik.email,
            korime: korisnik.korime
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        };
        let odgovor = await fetch(url + portRest + "/api/korisnici" + autorizacija, parametri);
        if (odgovor.status == 200) {
            // console.log("Korisnik ubačen na servis s podacima", korisnik);
            return true;
        }
        else {
            console.log("Registracija korisnika vratilo else...", odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }
    async prijaviKorisnika(korime, lozinka) {
        console.log(korime);
        lozinka = kodovi.kreirajSHA256(lozinka, korime);
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        };
        // console.log("prijava korisnika s lozinkom...", tijelo);
        let odgovor = await fetch(url + portRest + "/api/korisnici/" + korime + "/prijava"
            + autorizacija, parametri);
        if (odgovor.status == 200) {
            return await odgovor.text();
        }
        else {
            return false;
        }
    }
}
exports.Autentifikacija = Autentifikacija;
