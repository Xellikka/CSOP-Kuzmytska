"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerID = createCustomerID;
exports.createCustomer = createCustomer;
function createCustomerID(name, id) {
    if (!name || typeof name !== "string")
        throw new Error("Ім'я клієнта невірне");
    if (typeof id !== "number" || id <= 0)
        throw new Error("ID клієнта невірний");
    return `${name}-${id}`;
}
// createCustomer 
function createCustomer(name, age, city) {
    if (!name || typeof name !== "string")
        throw new Error("Ім'я клієнта невірне");
    if (age !== undefined && (typeof age !== "number" || age <= 0))
        throw new Error("Вік клієнта невірний");
    if (city !== undefined && typeof city !== "string")
        throw new Error("Місто клієнта невірне");
    console.log(`Клієнт: ${name}`);
    if (age !== undefined)
        console.log(`Вік: ${age}`);
    if (city !== undefined)
        console.log(`Місто: ${city}`);
    console.log("\n");
}
//# sourceMappingURL=customerfunctions.js.map