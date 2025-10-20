"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 2.1.2 Функція getAllWorkers(): вказує тип повернення — масив Worker
function getAllWorkers() {
    const workers = [
        {
            id: 1,
            name: 'Danylo',
            surname: 'Romanovych',
            available: false,
            salary: 1000,
            markPrize: (msg) => { },
        },
        {
            id: 2,
            name: 'Pavlo',
            surname: 'Skoropadskyi',
            available: true,
            salary: 1500,
            markPrize: (msg) => { },
        },
        {
            id: 3,
            name: 'Mykola',
            surname: 'Mikhnovsky',
            available: true,
            salary: 1600,
            markPrize: (msg) => { },
        },
        {
            id: 4,
            name: 'Jarema',
            surname: 'Vyshnevetskyi',
            available: false,
            salary: 1300,
            markPrize: (msg) => { },
        },
    ];
    return workers;
}
// 2.1.3 Функція getWorkerByID — повертає Worker | undefined
function getWorkerByID(id) {
    const workers = getAllWorkers();
    return workers.find(w => w.id === id);
}
// 2.1.4 Функція PrintWorker — використовує інтерфейс Worker для параметра
function PrintWorker(worker) {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}.`);
}
//2.2. Робота з PrizeLogger (інтерфейси для функцій)
let logPrize;
function simplePrizeLogger(message) {
    console.log(`PRIZE: ${message}`);
}
logPrize = simplePrizeLogger;
const favoriteAuthor = {
    name: 'Ursula Le Guin',
    email: 'wizard.of.earthsea@gmail.com',
    numBooksPublished: 13,
};
// закоментувати змінну favoriteLibrarianLiteral 
// const favoriteLibrarianLiteral: Librarian = {
// name: 'Elio',
// email: 'elio.archivist@libraryrealm.org',
// department: 'Ancient Manuscripts',
// assistCustomer: (custName: string) => console.log(`Elio is assisting ${custName}`),
// };
//2.4. Інтерфейси для типів класів
class UniversityLibrarian {
    name;
    email;
    department;
    constructor(name, email, department) {
        this.name = name;
        this.email = email;
        this.department = department;
    }
    assistCustomer(custName) {
        console.log(`${this.name} is assisting ${custName}`);
    }
}
const favoriteLibrarian = new UniversityLibrarian('Natalia', 'natalia@gmail.com', 'Philosophy');
//2.5. Створення та використання класів
class ReferenceItem {
    title;
    year;
    static department = 'Reference Department';
    _publisher = '';
    // закоментований старий код 
    // title: string;
    // year: number;
    // constructor(t: string, y: number) {
    //   this.title = t;
    //   this.year = y;
    //   console.log('Creating a new ReferenceItem ...');
    // }
    constructor(title, year) {
        this.title = title;
        this.year = year;
        console.log('Creating a new ReferenceItem ...');
    }
    printItem() {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Reference department: ${ReferenceItem.department}`);
    }
    get publisher() {
        return this._publisher.toUpperCase();
    }
    set publisher(newPublisher) {
        this._publisher = newPublisher;
    }
}
class Encyclopedia extends ReferenceItem {
    edition;
    constructor(title, year, edition) {
        super(title, year);
        this.edition = edition;
    }
    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }
    printCitation() {
        console.log(`${this.title} - ${this.year}`);
    }
}
function main() {
    console.log('2.1: Визначення інтерфейсу ');
    const all = getAllWorkers();
    console.log('All workers:', all.map(w => ({ id: w.id, name: w.name, surname: w.surname, available: w.available, salary: w.salary })));
    console.log('\nGet worker with id=4:');
    const w1 = getWorkerByID(4);
    if (w1) {
        PrintWorker(w1);
    }
    else {
        console.log('Worker not found');
    }
    console.log('\n 2.2: Визначення інтерфейсів для типів функцій, PrizeLogger demo ');
    logPrize('Congratulation!');
    console.log('\n 2.3. Розширення інтерфейсів : Person / Author / Librarian');
    console.log('Favorite author:', favoriteAuthor);
    //favoriteLibrarianLiteral.assistCustomer('Oksana');
    console.log('\n 2.4. Інтерфейси для типів класів: UniversityLibrarian class implementing Librarian');
    favoriteLibrarian.assistCustomer('Ivan');
    console.log('\n 2.5. Створення та використання класів & 2.6. Розширення класів : ReferenceItem and Encyclopedia');
    // const ref = new ReferenceItem('Book of TS', 2024); //  закоментовано, бо ReferenceItem абстрактний
    const refBook = new Encyclopedia('Encyclopedia of TS', 2024, 3);
    refBook.publisher = 'Oxford Press';
    console.log('Publisher (UPPER):', refBook.publisher);
    refBook.printItem();
    console.log('\n2.7: Створення абстрактних класів ');
    refBook.printCitation();
}
// Запуск основний main
main();
//# sourceMappingURL=main.js.map