import { Autentifikacija } from "./autentifikacija";
import { Konfiguracija } from "../konfiguracija";
import { JWTKlasa } from "./moduli/jwt";
import { Portovi } from "../servis/portovi";
import { Kodovi } from "./moduli/kodovi";

const jwt = new JWTKlasa();
const kodovi = new Kodovi();
let auth = new Autentifikacija();
let konf = new Konfiguracija();

konf.ucitajKonfiguraciju();

export class HTMLUpravitelj {

    registracija = async (zahtjev: any, odgovor: any) => {
        let greska = "";
        if (zahtjev.method == "POST") {
            // console.log("ZAHTJEV ZA REGISTRACIJU", zahtjev.method, zahtjev.body);
            if(zahtjev.body.ime == undefined || zahtjev.body.prezime == undefined
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
            }
            await auth.dodajKorisnika(korisnik);
            if (greska == "") {
                odgovor.redirect("/prijava");
                return;
            }
        }
    }

    odjava = async (zahtjev: any, odgovor: any) => {
        zahtjev.session.jwt = null;
        zahtjev.session.korime = null;
        zahtjev.session.tip_korisnika_id = null;
        odgovor.redirect("/prijava");
    };

    prijava = async (zahtjev: any, odgovor: any) => {
        if (zahtjev.method == "POST") {
            var korime = zahtjev.body.korime;
            var lozinka = zahtjev.body.lozinka;
            var korisnik: any = await auth.prijaviKorisnika(korime, lozinka);
            if (korisnik) {
                zahtjev.session.jwt = jwt.kreirajToken(JSON.parse(korisnik))
                zahtjev.session.korime = korime;
                zahtjev.session.tip_korisnika_id = JSON.parse(korisnik).tip_korisnika_id;
                odgovor.send(zahtjev.session);
                // odgovor.redirect("/");
                return "Prijava u tijeku...";
            } else {
                odgovor.send({ greska: "Krivi podaci." })
            }
        }
        return "Prijava u tijeku...";
    }

    profil = async (zahtjev: any, odgovor: any) => {
        if(zahtjev.method == "POST") {
            const portovi: Portovi = new Portovi();
            const url = portovi.url() + ":";
            const restPort = portovi.rest();
            // let autorizacija = "?jwt=" + zahtjev.session.jwt;
            // console.log("za aplikacija/htmlUpravitelj > profil > ln:87,",
            //     "imamo autorizaciju", autorizacija);
            let autorizacija: string = "?korime="
                + konf.dajKonf()["rest.korime"]
                + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
            let body = {
                ime: zahtjev.body.ime,
                prezime: zahtjev.body.prezime,
                adresa: zahtjev.body.adresa,
                lozinka: kodovi.kreirajSHA256(zahtjev.body.lozinka, zahtjev.session.korime),
            }
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
    }

}