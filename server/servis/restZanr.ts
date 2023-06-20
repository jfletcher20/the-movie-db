// const Validacija = require("../api/validacija.js")
import { Konfiguracija } from "../konfiguracija";
import { Validacija } from "./api/validacija";
import { ZanrDAO } from "./zanrDAO";

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

function validacijaZahtjeva(korime: string, lozinka: string) {
    return new Validacija().validacijaZahtjeva(korime, lozinka);
}

export class RestZanr {

    nedopusteno = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        odgovor.status(405);

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            let poruka = { greska: "Metoda nije dopuštena." }
            odgovor.send(JSON.stringify(poruka));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    getZanrovi = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let zdao = new ZanrDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.dajSve().then((zanr: any) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    postZanrovi = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let zdao = new ZanrDAO();

        let podaci = zahtjev.body;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.dodaj(podaci).then((poruka: any) => {
                // console.log(zahtjev)
                odgovor.send(JSON.stringify(poruka));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    deleteZanrovi = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");

        let zdao = new ZanrDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.dajNereferencirano().then((zanr: any) => console.log(zanr))
            zdao.obrisiNereferencirano().then((zanr: any) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    getZanr = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        let zdao = new ZanrDAO();

        let id = zahtjev.params.id;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.daj(id).then((zanr: any) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    putZanr = function (zahtjev: any, odgovor: any) {
        
        odgovor.type("application/json");
        let zdao = new ZanrDAO();

        let id = zahtjev.params.id;
        let naziv = zahtjev.body;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.azuriraj(naziv, id).then((zanr: any) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    deleteZanr = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        let zdao = new ZanrDAO();

        let id = zahtjev.params.id;
        
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            zdao.obrisi(id).then((zanr: any) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    notImplementedException = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");
        odgovor.status(501);

        let poruka = { greska: "metoda nije implementirana" }
        
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            odgovor.send(JSON.stringify(poruka));
        } else {
            odgovor.json({ greska: greska });
        }

    }

    getZanroviTest = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json");

        let poruka = { code: "200", status: "OK" }
        let zdao = new ZanrDAO();

        // let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        console.log(zahtjev.query);
        let greska = 200;
        if(greska == 200) {
            zdao.dajSve().then((zanr: any) => {
                odgovor.send(JSON.stringify(poruka));
            }).catch((greska: any) => odgovor.json({ greska: greska }));
        } else {
            odgovor.json({ greska: greska });
        }

    }
    
}