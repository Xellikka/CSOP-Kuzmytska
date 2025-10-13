export function createCustomerID(name: string, id: number): string {
  if (!name || typeof name !== "string") throw new Error("Ім'я клієнта невірне");
  if (typeof id !== "number" || id <= 0) throw new Error("ID клієнта невірний");
  return `${name}-${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
  if (!name || typeof name !== "string") throw new Error("Ім'я клієнта невірне");
  if (age !== undefined && (typeof age !== "number" || age <= 0)) throw new Error("Вік клієнта невірний");
  if (city !== undefined && typeof city !== "string") throw new Error("Місто клієнта невірне");

  console.log(`Клієнт: ${name}`);
  if (age !== undefined) console.log(`Вік: ${age}`);
  if (city !== undefined) console.log(`Місто: ${city}`);
  console.log("\n");
}

