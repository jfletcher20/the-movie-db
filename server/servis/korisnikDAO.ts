// const Baza = require("../build/baza.js");
import { Baza } from './baza'

export class KorisnikDAO {

	baza: Baza;

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async () => {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async (korime: string) => {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci: any = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async (korisnik: any) => {

		console.log(korisnik)

		if(((await this.baza.izvrsiUpit("SELECT * FROM korisnik WHERE korime='"
				+ korisnik.korime + "'", [])) as []).length > 0) {
			console.log("USER LENGTH", ((await this.baza.izvrsiUpit("SELECT * FROM korisnik WHERE korime='"
			+ korisnik.korime + "'", [])) as []).length)
			// return new Error("Korisnik već postoji.");
			return true;
		} else {

			let sql = "SELECT * FROM korisnik;"
			var podaci: any = await this.baza.izvrsiUpit(sql, []);
			let id = podaci.length + 1;
			// console.log(id);

			sql = `INSERT INTO korisnik ` +
						`(id, ime, prezime, adresa, korime, lozinka, email, blokiran, tip_korisnika_id) ` +
						`VALUES (?,?,?,?,?,?,?,?,?)`;
			podaci = [id, korisnik.ime, korisnik.prezime, "",
						korisnik.korime, korisnik.lozinka, korisnik.email, 0, 0];
			await this.baza.izvrsiUpit(sql, podaci);

			return true;

		}


	}

	obrisi = async (korime: string) => {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async (korime: string, korisnik: any) => {

		this.baza.spojiSeNaBazu();

		console.log(korime, korisnik);
		
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var k: any = await this.baza.izvrsiUpit(sql, [korime]);
		if(k.length != 1)
			return false;

		sql = "UPDATE korisnik SET ime=?, prezime=?, adresa=?, lozinka=? WHERE id=?";
        let podaci = [korisnik.ime, korisnik.prezime, korisnik.adresa, korisnik.lozinka, k[0].id];
		await this.baza.izvrsiUpit(sql, podaci);

		this.baza.zatvoriVezu();

		return true;

	}

}