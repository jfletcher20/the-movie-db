import { KorisnikDAO } from "./korisnikDAO";
import { Konfiguracija } from "../konfiguracija";
import { Validacija } from "./api/validacija";

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

function validacijaZahtjeva(korime: string, lozinka: string) {
    return new Validacija().validacijaZahtjeva(korime, lozinka);
}

export class RestKorisnik {

    getKorisnici = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")
        let kdao = new KorisnikDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            kdao.dajSve().then((korisnici: any) => {
                // console.log(korisnici);
                odgovor.send(JSON.stringify(korisnici));
            }).catch((greska: any) => odgovor.json( { greska: greska }));
        } else {
            odgovor.json( { greska: greska });
        }

    }

    postKorisnici = function (zahtjev: any, odgovor: any) {
        console.log("POST KORISNICI WITH ", zahtjev.body);
        odgovor.type("application/json")
        let podaci = zahtjev.body;
        let kdao = new KorisnikDAO();

        let gres = 200;
        if(gres == 200) {
            kdao.dodaj(podaci).then((poruka: any) => {
                odgovor.send(JSON.stringify(poruka));
            }).catch((greska: any) => odgovor.json( { greska: greska }));
        } else {
            odgovor.json( { greska: gres });
        }
    }

    deleteKorisnici = function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" }
        odgovor.send(JSON.stringify(poruka));
    }

    putKorisnici = function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        odgovor.status(501);
        let poruka = { greska: "metoda nije implementirana" }
        odgovor.send(JSON.stringify(poruka));
    }

    getKorisnik = function (zahtjev: any, odgovor: any) {

        odgovor.type("application/json")

        let kdao = new KorisnikDAO();
        let korime = zahtjev.params.korime;

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            kdao.daj(korime).then((korisnik: any) => {
                // console.log(korisnik);
                odgovor.send(JSON.stringify(korisnik));
            }).catch((greska: any) => odgovor.json( { greska: greska }));
        } else {
            odgovor.json( { greska: greska });
        }
        
    }

    getKorisnikPrijava = function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        let kdao = new KorisnikDAO();
        let korime = zahtjev.params.korime;
        // console.log("poziv funkcije getkorisnikprijava", zahtjev.params);
        let greska = 200;
        if(greska == 200) {
            kdao.daj(korime).then((korisnik: any) => {
                // console.log(korisnik)
                // console.log("ispis zahtjeva", zahtjev.body)
                // console.log("jednakost: ", new Date().getTime(), korisnik.lozinka == zahtjev.body.lozinka, "\n",
                //     korisnik.lozinka, "\n", zahtjev.body.lozinka);
                if(korisnik != null && korisnik.lozinka == zahtjev.body.lozinka) {
                    console.log("U tijeku je prijava korisnika: ", JSON.stringify(korisnik).substring(0, 30))
                    odgovor.send(JSON.stringify(korisnik));
                } else { 
                    odgovor.status(401);
                    odgovor.send(JSON.stringify( { greska: "Krivi podaci!"} ))
                }
            }).catch((greska: any) => odgovor.json( { greska: greska }));
        } else {
            odgovor.json( { greska: greska });
        }
    }

    putKorisnikAktivacija = function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        odgovor.status(405);
        let poruka = { greska: "metoda nije dopuštena" }
        odgovor.send(JSON.stringify(poruka));
    }

    // deleteKorisnik = function (zahtjev: any, odgovor: any) {
    //     odgovor.type("application/json")
    //     odgovor.status(501);
    //     let poruka = { greska: "metoda nije implementirana" }
    //     odgovor.send(JSON.stringify(poruka));
    // }

    putKorisnik = function (zahtjev: any, odgovor: any) {
        odgovor.type("application/json")
        let korime = zahtjev.params.korime;
        let podaci = zahtjev.body;
        let kdao = new KorisnikDAO();

        let greska = validacijaZahtjeva(zahtjev.query.korime, zahtjev.query.jwt);
        if(greska == 200) {
            kdao.azuriraj(korime, podaci).then((poruka: any) => {
                odgovor.send(JSON.stringify(poruka));
                // console.log("Success")
            }).catch((greska: any) => odgovor.json( { greska: greska }));
        } else {
            odgovor.json( { greska: greska });
        }

    }
    
}