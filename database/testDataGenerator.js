"use strict";

import Tour from "../entities/tour.js";
import Client from "../entities/client.js";
import Employee from "../entities/employee.js";
import TourismType from "../entities/tourismType.js";

class TestDataGenerator {
    constructor(db) {
        this.db = db;
    }
    generateClients() {
        const c1 = new Client("Tarasov", "Dmytro", "Sergiovych", new Date(2002, 5, 6)),
            c2 = new Client("Vovchenko", "Artem", null, new Date(2001, 8, 19));
        for (let client of [c1, c2]) {
            this.db.insert("clients", client, "", "", false);
        }
    }
    generateEmployees() {
        const e1 = new Employee("Lutsai", "Kateryna", null, new Date(2002, 9, 15)),
            e2 = new Employee("Huk", "Davyd", null, new Date(2001, 2, 21));
        for (let employee of [e1, e2]) {
            this.db.insert("employees", employee, "", "", false);
        }
    }
    generateTourismTypes() {
        const tt1 = new TourismType("adventure"),
            tt2 = new TourismType("cultural");
        for (let tourismType of [tt1, tt2]) {
            this.db.insert("tourismTypes", tourismType, "", "", false);
        }
    }
    generateTours() {
        const t1 = new Tour(new Date("2021-04-10"), new Date("2021-04-17"), "Kiev", "Alanya", 4.8, 1, 35000),
            t2 = new Tour(new Date("2021-08-18"), new Date("2021-08-25"), "Kiev", "Antalya", 4.6, 1, 30000),
            t3 = new Tour(new Date("2021-11-01"), new Date("2021-11-08"), "Kiev", "Marmaris", 4.8, 1, 30000);
        for (let tour of [t1, t2, t3]) {
            this.db.insert("tours", tour, "", "", false);
        }
    }
    generateAll() {
        this.generateClients();
        this.generateEmployees();
        this.generateTourismTypes();
        this.generateTours();
    }
}

export default TestDataGenerator;
