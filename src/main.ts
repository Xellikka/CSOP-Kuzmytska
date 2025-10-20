
//2.2 (частково) - оголошення для використання у 2.1 
// 2.2.1 Оголошення інтерфейсу PrizeLogger — тип для функції, що приймає один string параметр і нічого не повертає
interface PrizeLogger {
  (message: string): void;
}

//2.1. Визначення інтерфейсу Worker
// 2.1.1 Інтерфейс Worker — містить id, name, surname, available, salary та поле markPrize (тип PrizeLogger)
interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  markPrize: PrizeLogger;
}

// 2.1.2 Функція getAllWorkers(): вказує тип повернення — масив Worker
function getAllWorkers(): Worker[] {
  const workers: Worker[] = [
    {
      id: 1,
      name: 'Danylo',
      surname: 'Romanovych',
      available: false,
      salary: 1000,
      markPrize: (msg: string) => {},
    },
    {
      id: 2,
      name: 'Pavlo',
      surname: 'Skoropadskyi',
      available: true,
      salary: 1500,
     markPrize: (msg: string) => {},
    },
    {
      id: 3,
      name: 'Mykola',
      surname: 'Mikhnovsky',
      available: true,
      salary: 1600,
     markPrize: (msg: string) => {},
    },
    {
      id: 4,
      name: 'Jarema',
      surname: 'Vyshnevetskyi',
      available: false,
      salary: 1300,
     markPrize: (msg: string) => {},
    },
  ];
  return workers;
}

// 2.1.3 Функція getWorkerByID — повертає Worker | undefined
function getWorkerByID(id: number): Worker | undefined {
  const workers = getAllWorkers();
  return workers.find(w => w.id === id);
}

// 2.1.4 Функція PrintWorker — використовує інтерфейс Worker для параметра
function PrintWorker(worker: Worker): void {
  console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}.`);
}

//2.2. Робота з PrizeLogger (інтерфейси для функцій)
let logPrize: PrizeLogger;
function simplePrizeLogger(message: string): void {
  console.log(`PRIZE: ${message}`);
}
logPrize = simplePrizeLogger;

//2.3. Розширення інтерфейсів
interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer(custName: string): void;
}

const favoriteAuthor: Author = {
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
class UniversityLibrarian implements Librarian {
  name: string;
  email: string;
  department: string;

  constructor(name: string, email: string, department: string) {
    this.name = name;
    this.email = email;
    this.department = department;
  }

  assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }
}

const favoriteLibrarian: Librarian = new UniversityLibrarian('Natalia', 'natalia@gmail.com', 'Philosophy');

//2.5. Створення та використання класів
abstract class ReferenceItem {
  static department: string = 'Reference Department';
  private _publisher: string = '';

  // закоментований старий код 
  // title: string;
  // year: number;
  // constructor(t: string, y: number) {
  //   this.title = t;
  //   this.year = y;
  //   console.log('Creating a new ReferenceItem ...');
  // }

  constructor(public title: string, protected year: number) {
    console.log('Creating a new ReferenceItem ...');
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Reference department: ${ReferenceItem.department}`);
  }

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
  constructor(title: string, year: number, public edition: number) {
    super(title, year);
  }

  printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}

function main(): void {
  console.log('2.1: Визначення інтерфейсу ');
  const all = getAllWorkers();
  console.log('All workers:', all.map(w => ({ id: w.id, name: w.name, surname: w.surname, available: w.available, salary: w.salary })));

  console.log('\nGet worker with id=4:');
  const w1 = getWorkerByID(4);
  if (w1) {
    PrintWorker(w1);
  } else {
    
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

