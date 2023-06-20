"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const konstante_1 = require("../../konstante");
let konst = konstante_1.konstante;
const nodemailer = require(konst.dirModula + 'nodemailer');
// creating a protocol, essentially - domain and port from which to send
let mailer = nodemailer.createTransport({
    host: 'mail.foi.hr',
    port: 25,
    /* auth: {
         user: "",
         pass: ""
     }*/
});
exports.posaljiMail = async function (salje, prima, predmet, poruka) {
    let message = {
        from: salje,
        to: prima,
        subject: predmet,
        text: poruka
    };
    let odgovor = await mailer.sendMail(message);
    console.log(odgovor);
    return odgovor;
};
