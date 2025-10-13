import { Category } from "./enum";
import { getAllWorkers } from "./workers";
import { logFirstAvailable, getWorkersSurnamesByCategory, logWorkersNames, getWorkerByID, checkoutWorkers } from "./workerfunctions";
import { createCustomerID, createCustomer } from "./customerfunctions";

// Демонстрація запуску
console.log("Демонстрація запуску");

const allWorkers = getAllWorkers();
console.log("1.1.3. Запустіть функцію getAllWorkers():");
console.log(allWorkers);

console.log("1.1.5. Запустіть функцію logFirstAvailable():");
logFirstAvailable(allWorkers);

console.log("1.3.2. Виведіть name та surname робітників з категорії Developer:");
// Фільтруємо за категорією Developer і виводимо ім'я та прізвище
allWorkers
  .filter(w => w.category === Category.Developer)
  .forEach(w => console.log(`${w.name} ${w.surname}`));

console.log("1.3.3. Демонстрація роботи функції getWorkerByID():");
const wById = getWorkerByID(3);
console.log("Працівник id=3:", wById);

console.log("1.4.2. Оголосіть змінну myID строкового типу і викличте функцію зі значеннями *Ваше ім’я*, *порядковий номер у списку*:");
const myID: string = createCustomerID("Дар'я", 1);
console.log("Прямий виклик myID:", myID);

let idGenerator: (name: string, id: number) => string;
idGenerator = (name: string, id: number): string => `${name}-${id}`;
console.log("1.4.3. Стрілочна функція idGenerator:", idGenerator("Дар'я", 2));

idGenerator = createCustomerID;
console.log("1.4.4. Посилання на createCustomerID idGenerator:", idGenerator("Дар'я", 3));

console.log("1.5.2. Внесіть зміни в функцію getWorkersSurnamesByCategory() і викличте без параметра:");
const defaultCategorySurnames = getWorkersSurnamesByCategory();
logWorkersNames(defaultCategorySurnames);

console.log("1.5.3. Внесіть зміни в функцію logFirstAvailable() і викличте без параметра:");
logFirstAvailable();

console.log("1.5.1. Виклик функції createCustomer() з одним, двома і трьома параметрами:");
createCustomer("Олег");
createCustomer("Любов", 28);
createCustomer("Надія", 20, "Київ");

console.log("1.5.5. Оголошення myWorkers і виклик checkoutWorkers():");
const myWorkers = checkoutWorkers("Дар'я,", 1, 2, 3, 4);
myWorkers.forEach((w: string) => console.log(`- ${w}`));

console.log("Приклад з сheckoutWorkers(*Ваше ім’я*, *Номер за списком*, *Група*, *Хоббі*):");
const myWorkers2 = checkoutWorkers("Дар'я", 11, "ПП32", "малювання");
myWorkers2.forEach((w: string) => console.log(`- ${w}`));