// const crypto = require('crypto');
import { createHash } from "crypto";

export class Kodovi {

	kreirajSHA256_0 = (tekst: string) => {
		const hash = createHash('sha256');
		hash.write(tekst);
		var izlaz = hash.digest('hex');
		hash.end();
		return izlaz;
	}

	kreirajSHA256 = (tekst: string, sol: string) => {
		const hash = createHash('sha256');
		hash.write(tekst + sol);
		var izlaz = hash.digest('hex');
		hash.end();
		return izlaz;
	}

	dajNasumceBroj = (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); 
	}

}