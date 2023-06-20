// const konst = require("./konstante.js");
// const mysql = require(konst.dirModula + "mysql2");
// const sqlite = require("sqlite3");
// const ds = require("fs");
import type { Database } from "sqlite3";
// const db = new sqlite.Database('baza.sqlite');
import { DBCRUD } from "./bazaCRUD";
const bazaPodatakaCRUD = new DBCRUD();

export class Baza {

    baza: DBCRUD = bazaPodatakaCRUD;
    vezaDB: Database = this.baza.db;

    constructor() {
        // this.baza = bazaCRUD;
        // this.ucitajPodatkeZaBazu();
        // this.vezaDB = this.baza.db;
        // this.vezaDB = mysql.createConnection({
        //     host: this.podaciBaza.bazaServer,
        //     user: this.podaciBaza.bazaKorime,
        //     password: this.podaciBaza.bazaLozinka,
        //     database: this.podaciBaza.bazaNaziv
        // });
    }

    spojiSeNaBazu() {
        // this.vezaDB.connect((err) => {
        //     if (err) {
        //         console.log("Greška: ", err);
        //         this.vezaDB.end();
        //     }
        // });
    }

    ucitajPodatkeZaBazu() {
        // let podaciTekst = ds.readFileSync(konst.podaciZaBazu, "UTF-8");
        // this.podaciBaza = JSON.parse(podaciTekst);
    }

    ucitajParametre(sql: string, podaciZaSQL: []) {
        // let sql = "SELECT * FROM korisnik;";
        let cmd = "";
        let j = 0;
        for(let i = 0; i < sql.length; i++) {
            // console.log(i, sql[i]);
            if(sql[i] == "?") {
                // console.log("Found ? at index", i)
                cmd += "'" + podaciZaSQL[j++] + "'";
            } else {
                cmd += sql[i];
                // console.log("Wrote char ", cmd[i]);
            }
        }
        console.log("[baza.js ln:51] Forwarding command: ", cmd);
        return cmd;
    }

    async izvrsiUpit(sql: string, podaciZaSQL: any) {
        // console.log("Izvrsavanje...", sql.length, podaciZaSQL);
        // sql = this.ucitajParametre(sql, podaciZaSQL);
        let result = await this.baza.query(sql, podaciZaSQL);
        // if(sql.split(" ")[0]?.toLowerCase() == "delete")
            // console.log("---SQL---", sql, "\n:::RES:::", result);
        return result;
    }

    zatvoriVezu() {
        // this.vezaDB.close();
    }

}