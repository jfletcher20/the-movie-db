"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Konfiguracija = void 0;
const korimeBrojRegExp = new RegExp(".*[0-9].*[0-9]");
const korimeSlovaRegExp = new RegExp(".*[A-Za-z].*[A-Za-z]");
const lozinkaBrojRegExp = new RegExp(".*[0-9].*[0-9].*[0-9]");
const lozinkaSlovaRegExp = new RegExp(".*[A-Za-z].*[A-Za-z].*[A-Za-z]");
// const lozinkaRegExp = new RegExp("(?=[0-9].*[0-9]){3}.(?=[A-Za-z].*[A-Za-z]){3}");
const simboliRegExp = new RegExp(".*[~!@#$%^&*?.:;'\"`(,){/}].*[~!@#$%^&*?.:;'\"`(,){/}].*[~!@#$%^&*?.:;'\"`(,){/}]");
const prevencijaSQLinjectionS = new RegExp(".*<");
const prevencijaSQLinjectionG = new RegExp(".*>");
const fsPromise = require("fs/promises");
// import { Portovi } from "./servis/portovi";
class Konfiguracija {
    konf;
    // autorizacija: any;
    constructor() {
        this.konf = {};
        // this.osvjeziAutorizaciju();
    }
    // public async osvjeziAutorizaciju() {
    //     this.autorizacija = await (new Portovi().getJWT());
    //     // return this.autorizacija;
    // }
    // dajAuth() {
    //     return this.autorizacija;
    // }
    dajKonf() {
        return this.konf;
    }
    async ucitajKonfiguraciju() {
        var podaci = await fsPromise.readFile(process.argv[2], "UTF-8");
        this.konf = this.pretvoriJSONkonfig(podaci);
        let greska;
        if (!this.korimeValidacija(this.konf["rest.korime"])) {
            greska = new Error("Korisničko ime ne valja.");
            greska.name = "INVALIDNA_KONFIGURACIJA";
            throw greska;
        }
        if (!this.lozinkaValidacija(this.konf["rest.lozinka"])) {
            greska = new Error("Lozinka ne valja.");
            greska.name = "INVALIDNA_KONFIGURACIJA";
            throw greska;
        }
        if (!this.stranicaValidacija(this.konf["app.broj.stranica"])) {
            greska = new Error("Broj stranica ne valja.");
            greska.name = "INVALIDNA_KONFIGURACIJA";
            throw greska;
        }
    }
    injectionValidacija(string) {
        if (prevencijaSQLinjectionS.test(string)
            || prevencijaSQLinjectionG.test(string)) {
            console.log(string + " nije prošlo validaciju jer ima < ili > u sebi, što nije dopušteno.");
            return false;
        }
        return true;
    }
    korimeValidacija(korime) {
        if (!this.injectionValidacija(korime))
            return false;
        if (korime.length >= 15 && korime.length <= 20)
            if (korimeBrojRegExp.test(korime))
                if (korimeSlovaRegExp.test(korime))
                    return true;
                else
                    console.log("Korime nije prošlo validaciju za minimalno 2 slova.");
            else
                console.log("Korime nije prošlo validaciju za minimalno 2 broja.");
        else
            console.log("Korime nije prošlo validaciju za duljinu od minimalno 15 i maksimalno 20.");
        // console.log("Korisničko ime nije prošlo validaciju.");
        return false;
    }
    lozinkaValidacija(lozinka) {
        if (!this.injectionValidacija(lozinka))
            return false;
        if (lozinka.length >= 20 && lozinka.length <= 100)
            if (lozinkaBrojRegExp.test(lozinka))
                if (lozinkaSlovaRegExp.test(lozinka))
                    if (simboliRegExp.test(lozinka))
                        return true;
                    else
                        console.log("Lozinka nije prošlo validaciju za minimalno 3 konzekutivna simbola iz popisa: ", simboliRegExp);
                else
                    console.log("Lozinka nije prošlo validaciju za minimalno 3 slova.");
            else
                console.log("Lozinka nije prošlo validaciju za minimalno 3 broja.");
        else
            console.log("Lozinka nije prošlo validaciju za duljinu od minimalno 20 i maksimalno 100.");
        // console.log("Lozinka nije prošla validaciju.");
        return false;
    }
    stranicaValidacija(stranica) {
        if (!this.injectionValidacija(stranica))
            return false;
        if (parseInt(stranica) >= 5 && parseInt(stranica) <= 100)
            return true;
        console.log("Broj stranica nije prošlo validaciju. Treba biti između 5 i 100.");
        return false;
    }
    pretvoriJSONkonfig(podaci) {
        // console.log(podaci);
        let konf = {};
        var nizPodataka = podaci.split("\n");
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            // console.log(naziv, ": ", vrijednost)
            konf[naziv] = vrijednost;
        }
        return konf;
    }
}
exports.Konfiguracija = Konfiguracija;
