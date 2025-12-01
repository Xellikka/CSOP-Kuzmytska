import { FavoritesComponent } from './favorites';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let mockUserService: any;

  const dummyFavs = [
    { id: '1', name:{title:'Mr',first:'Ярема',last:'Вишневецький'}, dob:{date:'2000-01-01', age:25},
      location:{city:'Київ', postcode:'01001'}, email:'a@test.com', gender:'male', picture:{thumbnail:'', medium:'', large:''} }
  ];

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(['favorites$','removeFavorite']);
    mockUserService.favorites$ = of(dummyFavs);

    component = new FavoritesComponent(mockUserService);
    component.ngOnInit();
  });

  // 25. створення компонента
  it('компонент створено', () => {
    expect(component).toBeTruthy();
  });

  // 26. підписка на favorites$
  it('отримує список вибраного', () => {
    expect(component.favorites.length).toBe(1);
  });

  // 27. remove викликає сервіс
  it('видаляє з вибраного', async () => {
    await component.remove('1');
    expect(mockUserService.removeFavorite).toHaveBeenCalledWith('1');
  });

  // 28. formatDate працює
  it('форматує дату', () => {
    const result = component.formatDate('2005-04-03');
    expect(result).toBe(new Date('2005-04-03').toLocaleDateString());
  });
  });