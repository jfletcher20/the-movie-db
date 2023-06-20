
// import { JWTKlasa } from "../../aplikacija/moduli/jwt";
import { Konfiguracija } from "../../konfiguracija";

export class Validacija {

    private konf = new Konfiguracija();
    constructor() {
        this.konf.ucitajKonfiguraciju();
    }

    validacijaZahtjeva (JWT: any, lozinka: string) {

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

    regExpValidacija(korime: string, lozinka: string) {

        if(!this.konf.injectionValidacija(korime) && !this.konf.injectionValidacija(lozinka)) {
            if(this.konf.korimeValidacija(korime))
                if(this.konf.lozinkaValidacija(lozinka))
                    return true;
        }
        
        return false;

    }
    
}