console.log('Loading database...')

import { Database } from 'sqlite3';

export class DBCRUD {

    public db = new Database('../baza.sqlite');

    constructor() {
        console.log("Allocating pragma key.")
        this.db.get("PRAGMA foreign_keys", (greska: any, rez: any) => {
            console.log(rez, greska);
        });
        this.db.exec("PRAGMA foreign_keys = ON;");
    }

    exe(cmd: string) {
        this.db.exec(cmd, (greska: any) => console.log(greska))
    }

    query = (sql: any, params = []) => {
        return new Promise((uspjeh, neuspjeh) => {
            this.db.all(sql, params, function (greska, odgovor) {
                console.log(sql, params);
                if (greska) neuspjeh(greska);
                else uspjeh(odgovor);
            });
        });
    };

    // async select(sql: string) {
    //     // console.log("ALL COMMAND");
    //     let res = new Promise((rez => this.db.all(sql, (greska, rez) => {
    //         if(greska != null)
    //             console.log(greska)
    //         // console.log(rez) // ovo prikazuje prave podatke
    //         return rez; // ali budući da je ovo callback niš se ne vraća
    //     })))
    //     console.log("awaited res", await res);
    //     return await res;
    //     // return "ERROR";
    // }

    // insertOrReplaceValues(table: string,
    //     parameters: Array<string>, values: Array<string>) {
    //     if(parameters.length != values.length) {
    //         console.log("parameters.length != values.length (", parameters.length, "!=", values.length, ")");
    //         return;
    //     }
    //     var vals: string = '', pars: string = '';
    //     for(var i: number = 0; i < parameters.length; i++) {
    //         pars += '"' + parameters[i] + '"' + (i == parameters.length - 1 ? "" : ",");
    //         vals += '"' + values[i] + '"' + (i == parameters.length - 1 ? "" : ",");
    //     }
    //     var cmd: string = 'INSERT OR REPLACE INTO ' + table + '(' + pars + ') VALUES (' + vals + ')';
    //     this.exe(cmd);
    // } 

    // updateValues(table: string, parameters: Array<string>, values: Array<string>,
    //     conditionParameters: Array<string>, conditionValues: Array<String>) {
    //     if(parameters.length != values.length) {
    //         console.log("parameters.length != values.length (",
    //             parameters.length, "!=", values.length, ")");
    //         return;
    //     } else if(conditionParameters.length != conditionValues.length) {
    //         console.log("conditionParameters.length != conditionValues.length (",
    //             conditionParameters.length, "!=", conditionValues.length, ")");
    //         return;
    //     }

    //     // var vals: string = '', pars: string = '', condvals: string = '', condpars: string = '';
    //     var parsvals: string = '', condparsvals: string = '';
    //     for(var i: number = 0; i < parameters.length; i++)
    //         parsvals += parameters[i] + '="' + values[i] + '"' + (i == parameters.length - 1 ? "" : ",");
    //     for(var i: number = 0; i < conditionParameters.length; i++)
    //         condparsvals += conditionParameters[i] + '="' + conditionValues[i] + '"' + (i == conditionParameters.length - 1 ? "" : ",");

    //     // let cmd = db.prepare('UPDATE ' + table + ' SET ' + pars + ' WHERE ' + condpars);
    //     // cmd.run(greska => console.log(greska));
    //     var cmd: string = 'UPDATE ' + table + ' SET ' + parsvals + ' WHERE ' + condparsvals;
    //     this.exe(cmd);
    // }

    // deleteRows(table: string,
    //     conditionParameters: Array<string>, conditionValues: Array<String>) {
    //     if(conditionParameters.length != conditionValues.length) {
    //         console.log("conditionParameters.length != conditionValues.length (",
    //             conditionParameters.length, "!=", conditionValues.length, ")");
    //         return;
    //     }

    //     var condparsvals: string = '';
    //     for(var i: number = 0; i < conditionParameters.length; i++)
    //         condparsvals += conditionParameters[i] + '="' + conditionValues[i] + '"' + (i == conditionParameters.length - 1 ? "" : ",");

    //     var cmd: string = 'DELETE FROM ' + table + ' WHERE ' + condparsvals;
    //     this.exe(cmd);
    // }

}