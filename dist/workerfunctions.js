"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFirstAvailable = logFirstAvailable;
exports.getWorkersSurnamesByCategory = getWorkersSurnamesByCategory;
exports.logWorkersNames = logWorkersNames;
exports.getWorkerByID = getWorkerByID;
exports.checkoutWorkers = checkoutWorkers;
const enum_1 = require("./enum");
const workers_1 = require("./workers");
function logFirstAvailable(workers = (0, workers_1.getAllWorkers)()) {
    console.log("Функція logFirstAvailable()");
    console.log(`Кількість робітників: ${workers.length}`);
    const firstAvailable = workers.find(w => w.available);
    if (firstAvailable) {
        console.log("Перший доступний робітник:");
        console.log(`- ${firstAvailable.name} ${firstAvailable.surname} (${firstAvailable.category}) [available]`);
    }
    else {
        console.log("Немає доступних робітників.");
    }
    console.log("Список всіх робітників:");
    for (const w of workers) {
        console.log(`- ${w.name} ${w.surname} (${w.category})${w.available ? " [available]" : " [not available]"}`);
    }
    console.log("\n");
}
function getWorkersSurnamesByCategory(category = enum_1.Category.Designer) {
    if (!Object.values(enum_1.Category).includes(category))
        throw new Error(`Невірна категорія: ${category}`);
    const workers = (0, workers_1.getAllWorkers)();
    return workers.filter(w => w.category === category).map(w => w.surname);
}
function logWorkersNames(names) {
    if (!Array.isArray(names))
        throw new Error("Переданий параметр не є масивом рядків.");
    if (!names.length) {
        console.log("Масив імен порожній.");
    }
    else {
        names.forEach((n, idx) => console.log(`${idx + 1}. ${n}`));
    }
    console.log("\n");
}
function getWorkerByID(id) {
    if (typeof id !== "number" || id <= 0)
        throw new Error(`Невірний ID: ${id}`);
    const worker = (0, workers_1.getAllWorkers)().find(w => w.id === id);
    if (!worker)
        return undefined;
    const { name, surname, salary } = worker;
    return salary !== undefined ? { name, surname, salary } : { name, surname };
}
function checkoutWorkers(customer, ...workerIDs) {
    if (!customer || typeof customer !== "string")
        throw new Error("Ім'я клієнта невірне");
    const allWorkers = (0, workers_1.getAllWorkers)();
    // Перетворюємо всі ID у числа, ігноруємо некоректні або відсутні у базі
    const validIDs = workerIDs
        .map(id => (typeof id === "number" ? id : Number(id)))
        .filter(id => !isNaN(id) && allWorkers.some(w => w.id === id));
    if (validIDs.length === 0) {
        console.warn("Немає правильних ID для перевірки. Повертаємо порожній масив.");
        return [];
    }
    console.log(`Замовник: ${customer}`);
    const availableWorkers = [];
    validIDs.forEach(id => {
        const worker = getWorkerByID(id);
        const original = allWorkers.find(w => w.id === id);
        if (worker && original?.available) {
            availableWorkers.push(`${worker.name} ${worker.surname}`);
        }
    });
    return availableWorkers;
}
//# sourceMappingURL=workerfunctions.js.map