"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validacija = void 0;
// import { JWTKlasa } from "../../aplikacija/moduli/jwt";
const konfiguracija_1 = require("../../konfiguracija");
class Validacija {
    konf = new konfiguracija_1.Konfiguracija();
    constructor() {
        this.konf.ucitajKonfiguraciju();
    }
    validacijaZahtjeva(JWT, lozinka) {
        return 200;
        // if(new JWTKlasa().provjeriToken({ session: { jwt: JWT }}))
        //     return 200;
        // else { 
        //     let greska = new Error();
        //     greska.message = "Nevaljani zahjtev.";
        //     greska.name = "400";
        //     console.log(greska);
        //     return greska;
        // }
    }
    regExpValidacija(korime, lozinka) {
        if (!this.konf.injectionValidacija(korime) && !this.konf.injectionValidacija(lozinka)) {
            if (this.konf.korimeValidacija(korime))
                if (this.konf.lozinkaValidacija(lozinka))
                    return true;
        }
        return false;
    }
}
exports.Validacija = Validacija;
