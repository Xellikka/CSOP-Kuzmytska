import { Category } from "./enum";
import { Worker } from "./interface";
// 1.1. getAllWorkers()
function validateWorker(worker: Worker): void {
  if (typeof worker.id !== "number" || worker.id <= 0) throw new Error(`Невірний id: ${worker.id}`);
  if (!worker.name || typeof worker.name !== "string") throw new Error(`Невірне ім'я: ${worker.name}`);
  if (!worker.surname || typeof worker.surname !== "string") throw new Error(`Невірне прізвище: ${worker.surname}`);
  if (!Object.values(Category).includes(worker.category)) throw new Error(`Невірна категорія: ${worker.category}`);
  if (typeof worker.available !== "boolean") throw new Error(`Невірне значення доступності: ${worker.available}`);
  if (typeof worker.salary !== "number" || worker.salary < 0) throw new Error(`Невірна зарплата: ${worker.salary}`);
}
export function getAllWorkers(): Worker[] {
    const workers: Worker[] =  [ 
        { id: 1, name: "Danylo", surname: "Romanovych", category: Category.Developer, available: false, salary: 1000 },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", category: Category.Designer, available: true, salary: 1500 }, 
        { id: 3, name: "Mykola", surname: "Mikhnovsky", category: Category.QA, available: false, salary: 1600 }, 
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", category: Category.Developer, available: true, salary: 1300 }, 
    ];
    const ids = new Set<number>();
  for (const w of workers) {
    validateWorker(w); // Валідація кожного робітника
    if (ids.has(w.id)) throw new Error(`Знайдено дубль id робітника: ${w.id}`);
    ids.add(w.id);
  }
  return workers;
}