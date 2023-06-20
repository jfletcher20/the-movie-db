"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kodovi = void 0;
// const crypto = require('crypto');
const crypto_1 = require("crypto");
class Kodovi {
    kreirajSHA256_0 = (tekst) => {
        const hash = (0, crypto_1.createHash)('sha256');
        hash.write(tekst);
        var izlaz = hash.digest('hex');
        hash.end();
        return izlaz;
    };
    kreirajSHA256 = (tekst, sol) => {
        const hash = (0, crypto_1.createHash)('sha256');
        hash.write(tekst + sol);
        var izlaz = hash.digest('hex');
        hash.end();
        return izlaz;
    };
    dajNasumceBroj = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
}
exports.Kodovi = Kodovi;
