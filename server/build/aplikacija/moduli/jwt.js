"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTKlasa = void 0;
// const konst = require("../../konstante.js");
const konstante_1 = require("../../konstante");
const konst = konstante_1.konstante;
const jwt = require(konst.dirModula + "jsonwebtoken");
class JWTKlasa {
    kreirajToken = (korisnik) => {
        let token = jwt.sign({ korime: korisnik.korime,
            tip_korisnika_id: korisnik.tip_korisnika_id }, konst.tajniKljucJWT, { expiresIn: "1500s" });
        console.log("[aplikacija/moduli/jwt.js ln:10]: KREIRAN JWT ZA", { korime: korisnik.korime,
            tip_korisnika_id: korisnik.tip_korisnika_id });
        // console.log(token);
        // console.log("created token for user ", korisnik, " as value-set", this.dajTijelo(token));
        // this.ispisiDijelove(token);
        return token;
    };
    provjeriToken = (zahtjev) => {
        try {
            this.dajTijelo(zahtjev.session.jwt);
            // console.log("Provjera tokena: " + this.dajTijelo(zahtjev.session.jwt));
        }
        catch (e) {
            return false;
        }
        if (zahtjev.session.jwt != null) {
            // console.log(zahtjev.session.jwt);
            let token = zahtjev.session.jwt;
            try {
                /*let podaci = */ jwt.verify(token, konst.tajniKljucJWT);
                // console.log("JWT podaci su:", podaci);
                console.log("Token verified");
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }
        return false;
    };
    ispisiDijelove = (token) => {
        let dijelovi = token.split(".");
        let zaglavlje = this.dekodirajBase64(dijelovi[0]);
        console.log(zaglavlje);
        let tijelo = this.dekodirajBase64(dijelovi[1]);
        console.log(tijelo);
        let potpis = this.dekodirajBase64(dijelovi[2]);
        console.log(potpis);
    };
    dajTijelo = (token) => {
        let dijelovi = token.split(".");
        return JSON.parse(this.dekodirajBase64(dijelovi[1]));
    };
    dekodirajBase64(data) {
        let buff = new Buffer(data, 'base64');
        return buff.toString('ascii');
    }
}
exports.JWTKlasa = JWTKlasa;
