import { Worker } from "./interface";
import { Category } from "./enum";
export declare function logFirstAvailable(workers?: Worker[]): void;
export declare function getWorkersSurnamesByCategory(category?: Category): string[];
export declare function logWorkersNames(names: string[]): void;
export declare function getWorkerByID(id: number): {
    name: string;
    surname: string;
    salary?: number;
} | undefined;
export type WorkerID = number | string;
export declare function checkoutWorkers(customer: string, ...workerIDs: WorkerID[]): string[];
//# sourceMappingURL=workerfunctions.d.ts.map