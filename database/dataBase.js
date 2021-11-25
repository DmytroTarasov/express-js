"use strict";

import sql from "mssql";
import { promises as fsp } from "fs";

import dbConfig from "./dbConfig.js";

let conn = new sql.ConnectionPool(dbConfig);

class DataBase {
    insert(entityType, entity, reqTime = "", method = "", log = true) {
        let keys = Object.keys(entity).filter(k => k != "id");
        if (log) {
            this.log(`EntityType=${entityType}, id=${entity.id}, reqTime=${reqTime}, method=${method}\n`);
        }

        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }

                let request = "INSERT INTO " + entityType + " (";
                keys.forEach(k => (request += k + ", "));

                request = request.substr(0, request.length - 2);
                request += ") VALUES (";
                keys.forEach(k => {
                    if (entity[k] == null) {
                        request += " null, ";
                    } else if (typeof entity[k] == Number) {
                        request += entity[k] + ", ";
                    } else if (entity[k].constructor.name == "Date") {
                        request += "'" + entity[k].getFullYear() + "-" + (entity[k].getMonth() + 1) + "-" + entity[k].getDate() + "', ";
                    } else {
                        request += "'" + entity[k] + "', ";
                    }
                });
                request = request.substr(0, request.length - 2);
                request += ")";
                console.log(request);
                conn.query(request, err => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }

    get(entityType, key, reqTime = "", method = "", log = true) {
        if (log) {
            this.log(`EntityType=${entityType}, id=${key}, reqTime=${reqTime}, method=${method}\n`);
        }
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.query("SELECT * FROM " + entityType + " WHERE id = " + key, (err, recordset) => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(recordset.recordsets);
                    }
                });
            });
        });
    }

    update(entityType, property, value, key, reqTime = "", method = "", log = true) {
        if (log) {
            this.log(`EntityType=${entityType}, id=${key}, reqTime=${reqTime}, method=${method}\n`);
        }
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                let request = "UPDATE " + entityType + " SET " + property + "=" + value + " WHERE ID = " + key;
                conn.query(request, err => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }

    delete(entityType, key, reqTime = "", method = "", log = true) {
        if (log) {
            this.log(`EntityType=${entityType}, id=${key}, reqTime=${reqTime}, method=${method}\n`);
        }
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.query("DELETE FROM " + entityType + " WHERE id = " + key, err => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }

    search(entityType, property, value, reqTime = "", method = "", log = true) {
        if (log) {
            this.log(`EntityType=${entityType}, prop=${property}, propertyValue=${value}, reqTime=${reqTime}, method=${method}\n`);
        }
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                let request = "SELECT * FROM " + entityType + " WHERE " + property + "=";
                if (typeof value == Number) {
                    request += value;
                } else if (value.constructor.name == "Date") {
                    request += "'" + value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate() + "'";
                } else {
                    request += "'" + value + "'";
                }
                conn.query(request, (err, recordset) => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(recordset.recordsets);
                    }
                });
            });
        });
    }

    getAll(entityType, reqTime = "", method = "", log = true) {
        if (log) {
            this.log(`EntityType=${entityType}, reqTime=${reqTime}, method=${method}\n`);
        }
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.query("select * from " + entityType, (err, recordset) => {
                    conn.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(recordset.recordsets);
                    }
                });
            });
        });
    }

    log(message) {
        try {
            fsp.appendFile("./txt-files/log.txt", message);
        } catch (err) {
            console.log(err);
        }
    }
}

export default DataBase;
