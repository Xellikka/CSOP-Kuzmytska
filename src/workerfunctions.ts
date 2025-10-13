import { Worker } from "./interface";
import { Category } from "./enum";
import { getAllWorkers } from "./workers";

export function logFirstAvailable(workers: Worker[] = getAllWorkers()): void {
  console.log("Функція logFirstAvailable()");
  console.log(`Кількість робітників: ${workers.length}`);

  const firstAvailable = workers.find(w => w.available);
  if (firstAvailable) {
    console.log("Перший доступний робітник:");
    console.log(`- ${firstAvailable.name} ${firstAvailable.surname} (${firstAvailable.category}) [available]`);
  } else {
    console.log("Немає доступних робітників.");
  }

  console.log("Список всіх робітників:");
  for (const w of workers) {
    console.log(`- ${w.name} ${w.surname} (${w.category})${w.available ? " [available]" : " [not available]"}`);
  }
  console.log("\n");
}

export function getWorkersSurnamesByCategory(category: Category = Category.Designer): string[] {
  if (!Object.values(Category).includes(category)) throw new Error(`Невірна категорія: ${category}`);
  const workers = getAllWorkers();
  return workers.filter(w => w.category === category).map(w => w.surname);
}

export function logWorkersNames(names: string[]): void {
  if (!Array.isArray(names)) throw new Error("Переданий параметр не є масивом рядків.");
  if (!names.length) {
    console.log("Масив імен порожній.");
  } else {
    names.forEach((n, idx) => console.log(`${idx + 1}. ${n}`));
  }
  console.log("\n");
}

export function getWorkerByID(id: number): { name: string; surname: string; salary?: number } | undefined {
  if (typeof id !== "number" || id <= 0) throw new Error(`Невірний ID: ${id}`);
  const worker = getAllWorkers().find(w => w.id === id);
  if (!worker) return undefined;
  const { name, surname, salary } = worker;
  return salary !== undefined ? { name, surname, salary } : { name, surname };
}

export type WorkerID = number | string;

export function checkoutWorkers(customer: string, ...workerIDs: WorkerID[]): string[] {
  if (!customer || typeof customer !== "string") throw new Error("Ім'я клієнта невірне");

  const allWorkers = getAllWorkers();

  // Перетворюємо всі ID у числа, ігноруємо некоректні або відсутні у базі
  const validIDs: number[] = workerIDs
    .map(id => (typeof id === "number" ? id : Number(id)))
    .filter(id => !isNaN(id) && allWorkers.some(w => w.id === id));

  if (validIDs.length === 0) {
    console.warn("Немає правильних ID для перевірки. Повертаємо порожній масив.");
    return [];
  }

  console.log(`Замовник: ${customer}`);

  const availableWorkers: string[] = [];

  validIDs.forEach(id => {
    const worker = getWorkerByID(id);
    const original = allWorkers.find(w => w.id === id);
    if (worker && original?.available) {
      availableWorkers.push(`${worker.name} ${worker.surname}`);
    }
  });

  return availableWorkers;
}

