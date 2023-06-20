import * as fs from "fs";
import { Konfiguracija } from "../konfiguracija";

export class Portovi {

    konf: any;

    constructor() {
        var podaci = fs.readFileSync(__dirname + "/../../konfiguracija.csv", "utf-8");
        this.konf = new Konfiguracija().pretvoriJSONkonfig(podaci);
    }

    async getJWT() {
        let odgovor = await fetch(this.url() + ":" + this.app() + "/prijavljen");
        let podaci = await odgovor.text();
        console.log("[server/servis/portovi.ts ln:20] Ucitao JWT:", podaci);
        return podaci;
    }

    url() {
        return "http://localhost";
    }

    rest() {
        return this.konf["rest.port"];
    }

    app() {
        return this.konf["app.port"];
    }

}