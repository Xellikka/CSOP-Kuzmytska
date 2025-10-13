"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWorkers = getAllWorkers;
const enum_1 = require("./enum");
// 1.1. getAllWorkers()
function validateWorker(worker) {
    if (typeof worker.id !== "number" || worker.id <= 0)
        throw new Error(`Невірний id: ${worker.id}`);
    if (!worker.name || typeof worker.name !== "string")
        throw new Error(`Невірне ім'я: ${worker.name}`);
    if (!worker.surname || typeof worker.surname !== "string")
        throw new Error(`Невірне прізвище: ${worker.surname}`);
    if (!Object.values(enum_1.Category).includes(worker.category))
        throw new Error(`Невірна категорія: ${worker.category}`);
    if (typeof worker.available !== "boolean")
        throw new Error(`Невірне значення доступності: ${worker.available}`);
    if (typeof worker.salary !== "number" || worker.salary < 0)
        throw new Error(`Невірна зарплата: ${worker.salary}`);
}
function getAllWorkers() {
    const workers = [
        { id: 1, name: "Danylo", surname: "Romanovych", category: enum_1.Category.Developer, available: false, salary: 1000 },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", category: enum_1.Category.Designer, available: true, salary: 1500 },
        { id: 3, name: "Mykola", surname: "Mikhnovsky", category: enum_1.Category.QA, available: false, salary: 1600 },
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", category: enum_1.Category.Developer, available: true, salary: 1300 },
    ];
    const ids = new Set();
    for (const w of workers) {
        validateWorker(w); // Валідація кожного робітника
        if (ids.has(w.id))
            throw new Error(`Знайдено дубль id робітника: ${w.id}`);
        ids.add(w.id);
    }
    return workers;
}
//# sourceMappingURL=workers.js.map