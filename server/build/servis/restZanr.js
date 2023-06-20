"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestZanr = void 0;
// const Validacija = require("../api/validacija.js")
const konfiguracija_1 = require("../konfiguracija");
const validacija_1 = require("./api/validacija");
const zanrDAO_1 = require("./zanrDAO");
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
function validacijaZahtjeva(korime, lozinka) {
    return new validacija_1.Validacija().validacijaZahtjeva(korime, lozinka);
}
class RestZanr {
    nedopusteno = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        odgovor.status(405);
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            let poruka = { greska: "Metoda nije dopuštena." };
            odgovor.send(JSON.stringify(poruka));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    getZanrovi = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.dajSve().then((zanr) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    postZanrovi = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let podaci = zahtjev.body;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.dodaj(podaci).then((poruka) => {
                // console.log(zahtjev)
                odgovor.send(JSON.stringify(poruka));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    deleteZanrovi = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.dajNereferencirano().then((zanr) => console.log(zanr));
            zdao.obrisiNereferencirano().then((zanr) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    getZanr = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.daj(id).then((zanr) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    putZanr = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let id = zahtjev.params.id;
        let naziv = zahtjev.body;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.azuriraj(naziv, id).then((zanr) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    deleteZanr = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let zdao = new zanrDAO_1.ZanrDAO();
        let id = zahtjev.params.id;
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            zdao.obrisi(id).then((zanr) => {
                // console.log(zanr);
                odgovor.send(JSON.stringify(zanr));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    notImplementedException = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" };
        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if (greska == 200) {
            odgovor.send(JSON.stringify(poruka));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
    getZanroviTest = function (zahtjev, odgovor) {
        odgovor.type("application/json");
        let poruka = { code: "200", status: "OK" };
        let zdao = new zanrDAO_1.ZanrDAO();
        // let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        console.log(zahtjev.query);
        let greska = 200;
        if (greska == 200) {
            zdao.dajSve().then((zanr) => {
                odgovor.send(JSON.stringify(poruka));
            }).catch((greska) => odgovor.json({ greska: greska }));
        }
        else {
            odgovor.json({ greska: greska });
        }
    };
}
exports.RestZanr = RestZanr;
