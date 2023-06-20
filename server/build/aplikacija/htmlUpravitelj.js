"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLUpravitelj = void 0;
const autentifikacija_1 = require("./autentifikacija");
const konfiguracija_1 = require("../konfiguracija");
const jwt_1 = require("./moduli/jwt");
const portovi_1 = require("../servis/portovi");
const kodovi_1 = require("./moduli/kodovi");
const jwt = new jwt_1.JWTKlasa();
const kodovi = new kodovi_1.Kodovi();
let auth = new autentifikacija_1.Autentifikacija();
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
class HTMLUpravitelj {
    registracija = async (zahtjev, odgovor) => {
        let greska = "";
        if (zahtjev.method == "POST") {
            // console.log("ZAHTJEV ZA REGISTRACIJU", zahtjev.method, zahtjev.body);
            if (zahtjev.body.ime == undefined || zahtjev.body.prezime == undefined
                || zahtjev.body.lozinka == undefined || zahtjev.body.email == undefined
                || zahtjev.body.korime == undefined) {
                odgovor.send({ greska: "Nepotpuni podaci." });
                return;
            }
            var korisnik = {
                ime: zahtjev.body.ime,
                prezime: zahtjev.body.prezime,
                lozinka: zahtjev.body.lozinka,
                email: zahtjev.body.email,
                korime: zahtjev.body.korime,
            };
            await auth.dodajKorisnika(korisnik);
            if (greska == "") {
                odgovor.redirect("/prijava");
                return;
            }
        }
    };
    odjava = async (zahtjev, odgovor) => {
        zahtjev.session.jwt = null;
        zahtjev.session.korime = null;
        zahtjev.session.tip_korisnika_id = null;
        odgovor.redirect("/prijava");
    };
    prijava = async (zahtjev, odgovor) => {
        if (zahtjev.method == "POST") {
            var korime = zahtjev.body.korime;
            var lozinka = zahtjev.body.lozinka;
            var korisnik = await auth.prijaviKorisnika(korime, lozinka);
            if (korisnik) {
                zahtjev.session.jwt = jwt.kreirajToken(JSON.parse(korisnik));
                zahtjev.session.korime = korime;
                zahtjev.session.tip_korisnika_id = JSON.parse(korisnik).tip_korisnika_id;
                odgovor.send(zahtjev.session);
                // odgovor.redirect("/");
                return "Prijava u tijeku...";
            }
            else {
                odgovor.send({ greska: "Krivi podaci." });
            }
        }
        return "Prijava u tijeku...";
    };
    profil = async (zahtjev, odgovor) => {
        if (zahtjev.method == "POST") {
            const portovi = new portovi_1.Portovi();
            const url = portovi.url() + ":";
            const restPort = portovi.rest();
            // let autorizacija = "?jwt=" + zahtjev.session.jwt;
            // console.log("za aplikacija/htmlUpravitelj > profil > ln:87,",
            //     "imamo autorizaciju", autorizacija);
            let autorizacija = "?korime="
                + konf.dajKonf()["rest.korime"]
                + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
            let body = {
                ime: zahtjev.body.ime,
                prezime: zahtjev.body.prezime,
                adresa: zahtjev.body.adresa,
                lozinka: kodovi.kreirajSHA256(zahtjev.body.lozinka, zahtjev.session.korime),
            };
            let putanja = url + restPort + "/api/korisnici/" + zahtjev.session.korime + autorizacija;
            // console.log("Upućivanje poziva na", putanja);
            let val = await fetch(putanja, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            odgovor.send(val.status);
            // odgovor.send({ status: 200 });
            // return val;
        }
    };
}
exports.HTMLUpravitelj = HTMLUpravitelj;
