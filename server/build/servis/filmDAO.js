"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmDAO = void 0;
const baza_1 = require("./baza");
const konfiguracija_1 = require("../konfiguracija");
const restTMDB_1 = require("./restTMDB");
let konf = new konfiguracija_1.Konfiguracija();
konf.ucitajKonfiguraciju();
class FilmDAO {
    baza;
    restTMDB;
    constructor() {
        this.baza = new baza_1.Baza();
        this.restTMDB = new restTMDB_1.RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
        // console.log(konf.dajKonf()["tmdb.apikey.v3"]);
    }
    async getFilmById(id) {
        let odg = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=99d77adf9c02e0a70d13e4fc87fac134");
        let film = await odg.text();
        film = JSON.parse(film);
        // console.log(film)
        return film;
    }
    dajSve = async () => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM film;";
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();
        return podaci;
    };
    daj = async (id) => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM film WHERE id=?;";
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();
        if (podaci.length == 1)
            return podaci[0];
        else
            return null;
    };
    dajFilmoviPrijedlog = async () => {
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM film WHERE prijedlog=1;";
        var podaci = await this.baza.izvrsiUpit(sql, []);
        this.baza.zatvoriVezu();
        return podaci;
    };
    dajNekoliko = async (brojFilmova, prijedlozi) => {
        let sql, podaci;
        switch (prijedlozi) {
            case "1":
                this.baza.spojiSeNaBazu();
                sql = "SELECT * FROM film WHERE prijedlog=1 LIMIT " + brojFilmova + ";";
                podaci = await this.baza.izvrsiUpit(sql, []);
                // console.log("Returned: ", podaci.length);
                this.baza.zatvoriVezu();
                return podaci;
            case "0":
                this.baza.spojiSeNaBazu();
                sql = "SELECT * FROM film WHERE prijedlog=0 LIMIT " + brojFilmova + ";";
                podaci = await this.baza.izvrsiUpit(sql, []);
                // console.log("Returned: ", podaci.length);
                this.baza.zatvoriVezu();
                return podaci;
            default:
                this.baza.spojiSeNaBazu();
                sql = "SELECT * FROM film LIMIT " + brojFilmova + ";";
                podaci = await this.baza.izvrsiUpit(sql, []);
                // console.log("Returned: ", podaci.length);
                this.baza.zatvoriVezu();
                return podaci;
        }
    };
    dodaj = async (filmTMDB) => {
        // let filmTMDB = await getFilmById(id);
        // console.log("Film pronaden: ", filmTMDB, /*" :: ", filmTMDB*/);
        let sql = "INSERT INTO film("
            + "id,"
            // + "imdb_id,"
            + "za_odrasle,"
            + "bd_putanje,"
            + "pripada_kolekciji,"
            + "budzet,"
            // + "pocetna_stranica,"
            + "originalni_jezik,"
            + "originalni_naslov,"
            + "pregled,"
            + "popularnost,"
            + "poster_putanje,"
            + "datum_izlaska,"
            + "prihod,"
            + "trajanje,"
            + "status,"
            + "slogan,"
            + "naslov,"
            + "video,"
            + "prosjek_glasova,"
            + "broj_glasova,"
            + "datum_unosa,"
            + "prijedlog) "
            + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        // console.log(dateTime)
        let podaci = [filmTMDB.id, /*filmTMDB.imdb_id,*/ filmTMDB.adult, filmTMDB.backdrop_path,
            null, filmTMDB.budget, filmTMDB.original_language, filmTMDB.original_title,
            filmTMDB.overview, filmTMDB.popularity, filmTMDB.poster_path, filmTMDB.release_date,
            filmTMDB.revenue, filmTMDB.runtime, filmTMDB.status, filmTMDB.tagline,
            filmTMDB.title, filmTMDB.video, filmTMDB.vote_average, filmTMDB.vote_count,
            dateTime, 1];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
    postojiZanr = async (zanr_id) => {
        let sql = "SELECT * FROM zanr WHERE id=?";
        let res = await this.baza.izvrsiUpit(sql, zanr_id);
        if (res != null && res != undefined)
            return true;
        else
            return false;
    };
    dajZanroveFilma = async (film_id) => {
        let sql = "SELECT * FROM film_ima_zanr WHERE film_id=?";
        return await this.baza.izvrsiUpit(sql, film_id);
    };
    dajZanroviFilmVeze = async () => {
        let sql = "SELECT * FROM film_ima_zanr";
        return await this.baza.izvrsiUpit(sql, []);
    };
    dajKorisniciFilmVeze = async (film_id) => {
        let sql = "SELECT korime FROM korisnik WHERE id=(SELECT korisnik_id FROM korisnik_has_film WHERE film_id=?)";
        return await this.baza.izvrsiUpit(sql, film_id);
    };
    dodajZanr = async (film_id, zanr_id) => {
        let sql = "INSERT INTO film_ima_zanr(film_id, zanr_id) VALUES(?, ?)";
        let podaci = [film_id, zanr_id];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
    dodajKorisnik = async (film_id, korime) => {
        let sql = "SELECT id FROM korisnik WHERE korime=?";
        let korisnik_id = await this.baza.izvrsiUpit(sql, korime);
        // console.log(korisnik_id);
        sql = "INSERT INTO korisnik_has_film(film_id, korisnik_id) VALUES(?, ?)";
        await this.baza.izvrsiUpit(sql, [film_id, korisnik_id]);
        return true;
    };
    dodajKorisnikPremaID = async (film_id, korisnik_id) => {
        let sql = "INSERT INTO korisnik_has_film(film_id, korisnik_id) VALUES(?, ?)";
        await this.baza.izvrsiUpit(sql, [film_id, korisnik_id]);
        return true;
    };
    obrisi = async (id) => {
        let sql = "DELETE FROM film_ima_zanr WHERE film_id=?"; // NECESSARY (?)
        await this.baza.izvrsiUpit(sql, [id]);
        sql = "DELETE FROM korisnik_has_film WHERE film_id=?"; // NECESSARY (?)
        await this.baza.izvrsiUpit(sql, [id]);
        sql = "DELETE FROM film WHERE id=?";
        await this.baza.izvrsiUpit(sql, [id]);
        return true;
    };
    azuriraj = async (film, id) => {
        let sql = "UPDATE film SET "
            + "za_odrasle=?,"
            + "bd_putanje=?,"
            + "pripada_kolekciji=?,"
            + "budzet=?,"
            + "originalni_jezik=?,"
            + "originalni_naslov=?,"
            + "pregled=?,"
            + "popularnost=?,"
            + "poster_putanje=?,"
            + "datum_izlaska=?,"
            + "prihod=?,"
            + "trajanje=?,"
            + "status=?,"
            + "slogan=?,"
            + "naslov=?,"
            + "video=?,"
            + "prosjek_glasova=?,"
            + "broj_glasova=?,"
            + "datum_unosa=?,"
            + "prijedlog=? "
            + "WHERE id=?";
        var danas = new Date();
        var date = danas.getFullYear() + '-' + (danas.getMonth() + 1) + '-' + danas.getDate();
        var time = danas.getHours() + ":" + danas.getMinutes() + ":" + danas.getSeconds();
        var dateTime = date + ' ' + time;
        var datum_izlaska = film.datum_izlaska;
        var datumParsiran = datum_izlaska.substring(0, 9) + " " + datum_izlaska.substring(11, 19);
        let podaci = [
            film.za_odrasle,
            film.bd_putanje,
            null,
            film.budzet,
            film.originalni_jezik,
            film.originalni_naslov,
            film.pregled,
            film.popularnost,
            film.poster_putanje,
            datumParsiran,
            film.prihod,
            film.trajanje,
            film.status,
            film.slogan,
            film.naslov,
            film.video,
            film.prosjek_glasova,
            film.broj_glasova,
            dateTime,
            film.prijedlog,
            id
        ];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    };
    prihvatiPrijedlogFilma = async (id) => {
        let sql = "UPDATE film SET prijedlog=0 WHERE id=?;";
        await this.baza.izvrsiUpit(sql, id);
        return true;
    };
}
exports.FilmDAO = FilmDAO;
