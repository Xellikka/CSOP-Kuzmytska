"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const workers_1 = require("./workers");
const workerfunctions_1 = require("./workerfunctions");
const customerfunctions_1 = require("./customerfunctions");
// Демонстрація запуску
console.log("Демонстрація запуску");
const allWorkers = (0, workers_1.getAllWorkers)();
console.log("1.1.3. Запустіть функцію getAllWorkers():");
console.log(allWorkers);
console.log("1.1.5. Запустіть функцію logFirstAvailable():");
(0, workerfunctions_1.logFirstAvailable)(allWorkers);
console.log("1.3.2. Виведіть name та surname робітників з категорії Developer:");
// Фільтруємо за категорією Developer і виводимо ім'я та прізвище
allWorkers
    .filter(w => w.category === enum_1.Category.Developer)
    .forEach(w => console.log(`${w.name} ${w.surname}`));
console.log("1.3.3. Демонстрація роботи функції getWorkerByID():");
const wById = (0, workerfunctions_1.getWorkerByID)(3);
console.log("Працівник id=3:", wById);
console.log("1.4.2. Оголосіть змінну myID строкового типу і викличте функцію зі значеннями *Ваше ім’я*, *порядковий номер у списку*:");
const myID = (0, customerfunctions_1.createCustomerID)("Дар'я", 1);
console.log("Прямий виклик myID:", myID);
let idGenerator;
idGenerator = (name, id) => `${name}-${id}`;
console.log("1.4.3. Стрілочна функція idGenerator:", idGenerator("Дар'я", 2));
idGenerator = customerfunctions_1.createCustomerID;
console.log("1.4.4. Посилання на createCustomerID idGenerator:", idGenerator("Дар'я", 3));
console.log("1.5.2. Внесіть зміни в функцію getWorkersSurnamesByCategory() і викличте без параметра:");
const defaultCategorySurnames = (0, workerfunctions_1.getWorkersSurnamesByCategory)();
(0, workerfunctions_1.logWorkersNames)(defaultCategorySurnames);
console.log("1.5.3. Внесіть зміни в функцію logFirstAvailable() і викличте без параметра:");
(0, workerfunctions_1.logFirstAvailable)();
console.log("1.5.1. Виклик функції createCustomer() з одним, двома і трьома параметрами:");
(0, customerfunctions_1.createCustomer)("Олег");
(0, customerfunctions_1.createCustomer)("Любов", 28);
(0, customerfunctions_1.createCustomer)("Надія", 20, "Київ");
console.log("1.5.5. Оголошення myWorkers і виклик checkoutWorkers():");
const myWorkers = (0, workerfunctions_1.checkoutWorkers)("Дар'я,", 1, 2, 3, 4);
myWorkers.forEach((w) => console.log(`- ${w}`));
console.log("Приклад з сheckoutWorkers(*Ваше ім’я*, *Номер за списком*, *Група*, *Хоббі*):");
const myWorkers2 = (0, workerfunctions_1.checkoutWorkers)("Дар'я", 11, "ПП32", "малювання");
myWorkers2.forEach((w) => console.log(`- ${w}`));
//# sourceMappingURL=main.js.map