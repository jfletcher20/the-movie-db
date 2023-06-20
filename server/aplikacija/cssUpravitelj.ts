import { readFileSync } from "fs";

export class CSSUpravitelj {
    ucitajCSSZaStranicu = async () => {
        console.log("[aplikacija/CSSUpravitelj.ts ln:5]: Lodaing css documents when scss is already",
            "there; should probabl only include angular's scss (?).");
        return await this.ucitajCSS("main-style")
            + await this.ucitajCSS("film-style")
            + await this.ucitajCSS("funkcionalnosti-style");
    }
    ucitajCSS(CSSdokument: string) {
        return readFileSync(__dirname + "/../../aplikacija/stilovi/" + CSSdokument + ".css", "utf-8");
    }
}