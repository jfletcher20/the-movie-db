// const konst = require("../../konstante.js");
import { konstante } from "../../konstante";
const konst = konstante;

const jwt = require(konst.dirModula + "jsonwebtoken")

export class JWTKlasa {

	kreirajToken = (korisnik: any) => {
		let token = jwt.sign(
			{ korime: korisnik.korime,
				tip_korisnika_id: korisnik.tip_korisnika_id },
			konst.tajniKljucJWT,
			{ expiresIn: "1500s" }
		);
		console.log("[aplikacija/moduli/jwt.js ln:10]: KREIRAN JWT ZA", { korime: korisnik.korime,
			tip_korisnika_id: korisnik.tip_korisnika_id });
		// console.log(token);
		// console.log("created token for user ", korisnik, " as value-set", this.dajTijelo(token));
		// this.ispisiDijelove(token);
		return token;
	}

	provjeriToken = (zahtjev: any) => {
		try {
			this.dajTijelo(zahtjev.session.jwt);
			// console.log("Provjera tokena: " + this.dajTijelo(zahtjev.session.jwt));
		} catch(e) {
			return false;
		}
		if (zahtjev.session.jwt != null) {
			// console.log(zahtjev.session.jwt);
			let token = zahtjev.session.jwt;
			try {
				/*let podaci = */jwt.verify(token, konst.tajniKljucJWT);
				// console.log("JWT podaci su:", podaci);
				console.log("Token verified")
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
		return false;
	}

	ispisiDijelove = (token: any) => {
		let dijelovi = token.split(".");
		let zaglavlje = this.dekodirajBase64(dijelovi[0]);
		console.log(zaglavlje);
		let tijelo = this.dekodirajBase64(dijelovi[1]);
		console.log(tijelo);
		let potpis = this.dekodirajBase64(dijelovi[2]);
		console.log(potpis);
	}

	dajTijelo = (token: any) => {
		let dijelovi = token.split(".");
		return JSON.parse(this.dekodirajBase64(dijelovi[1]));
	}

	dekodirajBase64(data: any) {
		let buff = new Buffer(data, 'base64');
		return buff.toString('ascii');
	}

}
