function time() {
    return setTimeout(() => console.log("Time to run. Rest."), 200);
}
import { konstante } from "../konstante";
const konst = konstante;
const express = require(konst.dirModula + 'express');

import { Konfiguracija } from "../konfiguracija";

import { RestKorisnik } from "./restKorisnik";
const restKorisnik = new RestKorisnik();

import { RestFilm } from "./restFilm";
const restFilm = new RestFilm();

import { RestZanr } from "./restZanr";
const restZanr = new RestZanr();

import { RestTMDB } from "./restTMDB";
// const fsPromise = require("fs/promises");
// const portovi = require(konst.dirPortova + "portovi_rest.js");

import { Portovi } from "./portovi";
const port = new Portovi().rest(); //portovi.jfletcher20
console.log(port);
const server = express();

const cors = require(konst.dirModula + "cors");
// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200 }
server.use(cors());

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((err: any) => {
    console.error(err);
    if(process.argv.length == 2)
        console.error("Treba unijeti naziv datoteke konfiguracije.")
    else    
        console.error("Nije moguće otvoriti datoteku ", process.argv[2]);
    process.exit();
});

async function pokreniServer() {

    await time();

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    
    pripremiPutanjeResursTMDB();
    pripremiPutanjeResursZanr();
    pripremiPutanjeResursFilmovi();
    pripremiPutanjeResursZanrTest();
    pripremaPutanjeResursKorisnika();

    server.use((zahtjev: any, odgovor: any) => {
        odgovor.status(404)
        var odg = { greska: "Stranica nije pronađena!" }
        odgovor.send(JSON.stringify(odg));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });

}

function pripremiPutanjeResursTMDB() {

    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);

    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr", restZanr.notImplementedException);
    server.put("/api/tmdb/zanr", restZanr.notImplementedException);
    server.delete("/api/tmdb/zanr", restZanr.notImplementedException);

    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi", restZanr.notImplementedException);
    server.put("/api/tmdb/filmovi", restZanr.notImplementedException);
    server.delete("/api/tmdb/filmovi", restZanr.notImplementedException);

}

function pripremiPutanjeResursZanr() {

    server.get("/api/zanr", restZanr.getZanrovi);
    server.post("/api/zanr", restZanr.postZanrovi);
    server.put("/api/zanr", restZanr.notImplementedException);
    server.delete("/api/zanr", restZanr.deleteZanrovi);

    server.get("/api/zanr/:id", restZanr.getZanr);
    server.post("/api/zanr/:id", restZanr.nedopusteno);
    server.put("/api/zanr/:id", restZanr.putZanr);
    server.delete("/api/zanr/:id", restZanr.deleteZanr);

}

function pripremiPutanjeResursFilmovi() {

    server.get("/api/filmovi/:stranica&:brojFilmova", restFilm.getFilmovi);
    server.post("/api/filmovi/:stranica&:brojFilmova", restFilm.postFilmovi);
    server.put("/api/filmovi/:stranica&:brojFilmova", restZanr.notImplementedException);
    server.delete("/api/filmovi/:stranica&:brojFilmova", restZanr.notImplementedException);

    server.get("/api/filmovi/prijedlozi", restFilm.getFilmoviPrijedlozi);
    server.get("/api/filmovi/:id/prihvati", restFilm.putFilmPrihvat);

    server.get("/api/filmovi/:id", restFilm.getFilm);
    server.post("/api/filmovi/:id", restZanr.nedopusteno);
    server.put("/api/filmovi/:id", restFilm.putFilm);
    server.delete("/api/filmovi/:id", restFilm.deleteFilm);

    server.get("/api/filmovi/:id/zanrovi", restFilm.getZanroviFilma);
    server.get("/api/veze/film/zanr", restFilm.getZanrFilmVeze);
    server.get("/api/veze/film/:id/korisnici", restFilm.getKorisnikFilmVeze);

}

function pripremiPutanjeResursZanrTest() {

    server.get("/api/zanr/test", restZanr.getZanroviTest);
    server.post("/api/zanr/test", restZanr.notImplementedException);
    server.put("/api/zanr/test", restZanr.notImplementedException);
    server.delete("/api/zanr/test", restZanr.notImplementedException);

}

function pripremaPutanjeResursKorisnika() {

    server.get("/api/korisnici", restKorisnik.getKorisnici);
    server.post("/api/korisnici", restKorisnik.postKorisnici);
    server.put("/api/korisnici", restZanr.notImplementedException);
    server.delete("/api/korisnici", restZanr.notImplementedException);

    server.get("/api/korisnici/:korime", restKorisnik.getKorisnik);
    server.post("/api/korisnici/:korime", restZanr.nedopusteno);
    server.put("/api/korisnici/:korime", restKorisnik.putKorisnik);
    server.delete("/api/korisnici/:korime", restZanr.notImplementedException);

    server.get("/api/korisnici/:korime/prijava", restZanr.notImplementedException);
    server.post("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava); // TODO: ? IMPLE ?
    server.put("/api/korisnici/:korime/prijava", restZanr.notImplementedException);
    server.delete("/api/korisnici/:korime/prijava", restZanr.notImplementedException);

    server.get("/api/korisnici/:korime/aktivacija", restZanr.notImplementedException);
    server.post("/api/korisnici/:korime/aktivacija", restZanr.nedopusteno);
    server.put("/api/korisnici/:korime/aktivacija", restKorisnik.putKorisnikAktivacija); // TODO: IMPLEMENT
    server.delete("/api/korisnici/:korime/aktivacija", restZanr.notImplementedException);

}