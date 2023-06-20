"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZanrDAO = void 0;
const baza_1 = require("./baza");
class ZanrDAO {
    baza;
    constructor() {
        this.baza = new baza_1.Baza();
    }
    dajSve = async () => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM zanr;";
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();
        return podaci;
    };
    dajNereferencirano = async () => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT tip_korisnika.id FROM tip_korisnika WHERE " +
            "tip_korisnika.id NOT IN(SELECT korisnik.tip_korisnika_id FROM korisnik)";
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();
        return podaci;
    };
    daj = async (id) => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM zanr WHERE id=?;";
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();
        if (podaci.length == 1)
            return podaci[0];
        else
            return null;
    };
    dodaj = async (zanr) => {
        console.log(zanr);
        let sql = `INSERT INTO zanr (id, naziv) VALUES (?,?)`;
        let podaci = [zanr.id, zanr.naziv]; // tmdb id ? 
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
    obrisi = async (id) => {
        let sql = "DELETE FROM zanr WHERE id=?";
        await this.baza.izvrsiUpit(sql, [id]);
        return true;
    };
    obrisiNereferencirano = async () => {
        let sql = "DELETE FROM zanr WHERE id NOT IN(SELECT film_ima_zanr.zanr_id FROM film_ima_zanr)";
        await this.baza.izvrsiUpit(sql, []);
        return true;
    };
    azuriraj = async (zanr, id) => {
        let sql = `UPDATE zanr SET naziv=? WHERE id=?`;
        let podaci = [zanr.naziv, id];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
}
exports.ZanrDAO = ZanrDAO;
