"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikDAO = void 0;
// const Baza = require("../build/baza.js");
const baza_1 = require("./baza");
class KorisnikDAO {
    baza;
    constructor() {
        this.baza = new baza_1.Baza();
    }
    dajSve = async () => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM korisnik;";
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();
        return podaci;
    };
    daj = async (korime) => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM korisnik WHERE korime=?;";
        var podaci = await this.baza.izvrsiUpit(sql, [korime]);
        this.baza.zatvoriVezu();
        if (podaci.length == 1)
            return podaci[0];
        else
            return null;
    };
    dodaj = async (korisnik) => {
        console.log(korisnik);
        if ((await this.baza.izvrsiUpit("SELECT * FROM korisnik WHERE korime='"
            + korisnik.korime + "'", [])).length > 0) {
            console.log("USER LENGTH", (await this.baza.izvrsiUpit("SELECT * FROM korisnik WHERE korime='"
                + korisnik.korime + "'", [])).length);
            // return new Error("Korisnik već postoji.");
            return true;
        }
        else {
            let sql = "SELECT * FROM korisnik;";
            var podaci = await this.baza.izvrsiUpit(sql, []);
            let id = podaci.length + 1;
            // console.log(id);
            sql = `INSERT INTO korisnik ` +
                `(id, ime, prezime, adresa, korime, lozinka, email, blokiran, tip_korisnika_id) ` +
                `VALUES (?,?,?,?,?,?,?,?,?)`;
            podaci = [id, korisnik.ime, korisnik.prezime, "",
                korisnik.korime, korisnik.lozinka, korisnik.email, 0, 0];
            await this.baza.izvrsiUpit(sql, podaci);
            return true;
        }
    };
    obrisi = async (korime) => {
        let sql = "DELETE FROM korisnik WHERE korime=?";
        await this.baza.izvrsiUpit(sql, [korime]);
        return true;
    };
    azuriraj = async (korime, korisnik) => {
        this.baza.spojiSeNaBazu();
        console.log(korime, korisnik);
        let sql = "SELECT * FROM korisnik WHERE korime=?;";
        var k = await this.baza.izvrsiUpit(sql, [korime]);
        if (k.length != 1)
            return false;
        sql = "UPDATE korisnik SET ime=?, prezime=?, adresa=?, lozinka=? WHERE id=?";
        let podaci = [korisnik.ime, korisnik.prezime, korisnik.adresa, korisnik.lozinka, k[0].id];
        await this.baza.izvrsiUpit(sql, podaci);
        this.baza.zatvoriVezu();
        return true;
    };
}
exports.KorisnikDAO = KorisnikDAO;
