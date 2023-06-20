"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSUpravitelj = void 0;
const fs_1 = require("fs");
class CSSUpravitelj {
    ucitajCSSZaStranicu = async () => {
        console.log("[aplikacija/CSSUpravitelj.ts ln:5]: Lodaing css documents when scss is already", "there; should probabl only include angular's scss (?).");
        return await this.ucitajCSS("main-style")
            + await this.ucitajCSS("film-style")
            + await this.ucitajCSS("funkcionalnosti-style");
    };
    ucitajCSS(CSSdokument) {
        return (0, fs_1.readFileSync)(__dirname + "/../../aplikacija/stilovi/" + CSSdokument + ".css", "utf-8");
    }
}
exports.CSSUpravitelj = CSSUpravitelj;
