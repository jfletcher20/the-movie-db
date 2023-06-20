import { Konfiguracija } from "../konfiguracija";
import { Portovi } from "../servis/portovi";
import { Kodovi } from "./moduli/kodovi";
const portovi = new Portovi();
const portRest = portovi.rest();
const url = portovi.url() + ":";
const kodovi = new Kodovi();

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

let autorizacija: string = "?korime="
    + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
// let autorizacija: string;
async function ucitajAuth() {
    let jwtAut: string = "?jwt=";
    await setTimeout(async () => {
        console.log("JWT vrijednosti kod autentifikacija.ts: ", await portovi.getJWT());
        jwtAut += await portovi.getJWT();
    }, 2000);
    console.log(jwtAut);
    return jwtAut;
}

export class Autentifikacija {

    constructor(){ ucitajAuth(); };

    async dodajKorisnika(korisnik: any) {
        
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
        }
        let odgovor = await fetch(url + portRest + "/api/korisnici" + autorizacija, parametri)

        if (odgovor.status == 200) {
            // console.log("Korisnik ubačen na servis s podacima", korisnik);
            return true;
        } else {
            console.log("Registracija korisnika vratilo else...", odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async prijaviKorisnika(korime: string, lozinka: string) {
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
        }
        // console.log("prijava korisnika s lozinkom...", tijelo);
        let odgovor = await fetch(url + portRest + "/api/korisnici/" + korime + "/prijava"
            + autorizacija, parametri)

        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

}