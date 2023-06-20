"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCRUD = void 0;
console.log('Loading database...');
const sqlite3_1 = require("sqlite3");
class DBCRUD {
    db = new sqlite3_1.Database('../baza.sqlite');
    constructor() {
        console.log("Allocating pragma key.");
        this.db.get("PRAGMA foreign_keys", (greska, rez) => {
            console.log(rez, greska);
        });
        this.db.exec("PRAGMA foreign_keys = ON;");
    }
    exe(cmd) {
        this.db.exec(cmd, (greska) => console.log(greska));
    }
    query = (sql, params = []) => {
        return new Promise((uspjeh, neuspjeh) => {
            this.db.all(sql, params, function (greska, odgovor) {
                console.log(sql, params);
                if (greska)
                    neuspjeh(greska);
                else
                    uspjeh(odgovor);
            });
        });
    };
}
exports.DBCRUD = DBCRUD;
