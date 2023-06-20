"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portovi = void 0;
const fs = __importStar(require("fs"));
const konfiguracija_1 = require("../konfiguracija");
class Portovi {
    konf;
    constructor() {
        var podaci = fs.readFileSync(__dirname + "/../../konfiguracija.csv", "utf-8");
        this.konf = new konfiguracija_1.Konfiguracija().pretvoriJSONkonfig(podaci);
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
exports.Portovi = Portovi;
