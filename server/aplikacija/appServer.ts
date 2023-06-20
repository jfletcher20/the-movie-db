function time() {
    return setTimeout(() => console.log("Time to run. App."), 200);
}

//const
// const konst = require("../konstante.js");
// const Konfiguracija = require("../konfiguracija");
import { Konfiguracija } from "../konfiguracija";
import { Portovi } from "../servis/portovi";
import { konstante } from "../konstante";
const konst = konstante;
// const portovi = require(konst.dirPortova + "portovi.js");
//serv
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula + 'express-session');
const kolacici = require(konst.dirModula + 'cookie-parser');
//contr
import { HTMLUpravitelj } from "./htmlUpravitelj";
const htmlUpravitelj = new HTMLUpravitelj();
import { FetchUpravitelj } from "./fetchUpravitelj";
const fetchUpravitelj = new FetchUpravitelj();

//host
// const port = 4202; //portovi.jfletcher20
const portovi: Portovi = new Portovi();
const port = portovi.app();
const url = portovi.url() + ":";
const server = express();

const cors = require(konst.dirModula + "cors");
// var corsOptions = {
//     origin: url + 4200, // PROBABLY GOING TO NEED TO CHANGE IT IN THE FUTURE
//     optionsSuccessStatus: 200 }
server.use(cors());

async function pokreniServer() {

    await time();

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    
    pripremiPutanjeNav();
    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();

    // server.use("/js", express.static(__dirname + "/js"));
    // server.use("/css", express.static(__dirname + "/stilovi"));
    server.use((zahtjev: any, odgovor: any) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        //console.log(konf.dajKonf());
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });

    // console.log(htmlUpravitelj)

}

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(() => {
    provjeriRestServis();
    pokreniServer();
}).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

async function provjeriRestServis() {
    let autorizacija: string = "?korime=" + konf.dajKonf()["rest.korime"] + "&lozinka=" + konf.dajKonf()["rest.lozinka"];
    let serverURL = url + portovi.rest();
    let rest = await fetch(serverURL + "/api/zanr/test" + autorizacija).catch((greska) => {
        greska = new Error();
        greska.name = "404";
        greska.message = "restServer.js nije pokrenut. Pokrenite appServer nakon što je restServer.js pokrenut."
        throw greska;
    });
    let odg = await rest.text();
    odg = JSON.parse(odg);
    let code = parseInt(JSON.stringify(odg).substring(18,19))
    if(code == 4) {
        let greska = new Error();
        greska.name = "404";
        greska.message = "Pristup nije autoriziran. Pokušajte pokrenuti s drugom konfiguracijskom datotekom.";
        throw greska;
    }
    return odg;
}

function pripremiPutanjeNav() {
    console.log("RUNNING SERVER ", __dirname + "/../../aplikacija/angular")
    server.use("/favicon.ico", express.static(__dirname + "/../../multimedija/logo-blue.png"))
    server.use("/", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/dokumentacija", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/prijava", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/registracija", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/zanrovi", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/film/:id", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/filmoviPregled", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/filmoviPretrazivanje", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/filmoviPrijedlozi", express.static(__dirname + "/../../aplikacija/angular"));
    server.use("/profil", express.static(__dirname + "/../../aplikacija/angular"));
    // server.get("/", htmlUpravitelj.pocetna);
    // server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
    // server.get("/zanrovi", htmlUpravitelj.zanrovi);
    // server.get("/profil", htmlUpravitelj.profil);
    // server.get("/registracija", htmlUpravitelj.registracija);
    // server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
    // server.get("/filmoviPrijedlozi", htmlUpravitelj.filmoviPrijedlozi);
    // server.get("/filmoviPretrazivanje", htmlUpravitelj.filmoviPretrazivanje);
    // server.get("/film/:id", htmlUpravitelj.film);
    server.get("/odjava", htmlUpravitelj.odjava);
}

function pripremiPutanjePocetna() {
    server.get('/dajTMDBZanrove', fetchUpravitelj.dajTMDBZanrove);
    server.get('/dajSveFilmove', fetchUpravitelj.dajSveFilmove);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/brojStranica', fetchUpravitelj.brojStranica);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
    server.get('/apiTest', fetchUpravitelj.apiTest);
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get("/filmPodaci/:id", fetchUpravitelj.dajFilm);
    server.get("/korisniciImaFilm/:id", fetchUpravitelj.dajKorisnikFilm);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
    server.post('/zanr', fetchUpravitelj.dodajZanr);
    server.put('/zanr/:id', fetchUpravitelj.azurirajZanr);
    server.delete('/zanr/:id', fetchUpravitelj.ukloniZanr);
    server.delete('/zanr', fetchUpravitelj.ukloniSveZanrove);
    server.get('/film/:id/prihvati', fetchUpravitelj.prihvatiPrijedlog);
}

function pripremiPutanjeAutentifikacija() {
    // server.get("/prijava", htmlUpravitelj.prijava);
    server.post("/prijava", htmlUpravitelj.prijava);
    server.post("/registracija", htmlUpravitelj.registracija);
    server.get("/prijavljen", fetchUpravitelj.prijavljen);
    server.get("/korisnik/:korime", fetchUpravitelj.korisnik);
    server.post("/profil", htmlUpravitelj.profil);
}
