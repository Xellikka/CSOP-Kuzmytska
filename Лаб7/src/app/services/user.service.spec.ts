import { UserService } from './user.service';
import axios from 'axios';

describe('UserService', () => {
  let service: UserService;
  let storageSpy: any;

  const dummyUser = { id:'1', name:{first:'a',last:'b',title:''}, dob:{date:'2000-01-01',age:23}, location:{city:'c', postcode:'123'}, email:'a@test.com', gender:'male', picture:{} };

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('Storage',['create','get','set']);
    storageSpy.create.and.returnValue(Promise.resolve());
    storageSpy.get.and.returnValue(Promise.resolve([]));
    storageSpy.set.and.returnValue(Promise.resolve());

    service = new UserService(storageSpy);
    await service['initStorage']();
  });

  // 3. створення сервісу
  it('сервіс створено', () => {
    expect(service).toBeTruthy();
  });

  // 4. fetchUsers повертає користувачів
  it('fetchUsers повертає користувачів', async () => {
  const mockApiResponse = {
  data: {
    results: [
      {
        login: { uuid: '1' },
        name: { title:'Mr', first:'Павло', last:'Скоропадський' },
        dob: { date: '2005-04-03', age:20 },
        location: { city:'Київ', postcode:'01001', street:{number:1,name:'Вулиця'} },
        email:'a@example.com',
        phone:'123',
        cell:'456',
        picture:{thumbnail:'',medium:'',large:''},
        gender:'male'
      }
    ]
  }
};

spyOn(axios, 'get').and.returnValue(Promise.resolve(mockApiResponse));

const users = await service.fetchUsers(1);
expect(users.length).toBe(1);
expect(users[0].id).toBe('1');
expect(users[0].name.first).toBe('Павло');
});


  // 5. addFavorite додає користувача
  it('addFavorite додає користувача', async () => {
    await service.addFavorite(dummyUser as any);
    expect((service as any).favoritesSubject.value.length).toBe(1);
  });

  // 6. removeFavorite видаляє користувача
  it('removeFavorite видаляє користувача', async () => {
    await service.addFavorite(dummyUser as any);
    await service.removeFavorite(dummyUser.id);
    expect((service as any).favoritesSubject.value.length).toBe(0);
  });

  // 7. isFavorite працює
  it('isFavorite працює', async () => {
    await service.addFavorite(dummyUser as any);
    expect(service.isFavorite(dummyUser.id)).toBeTrue();
  });

  // 8. initStorage завантажує favorites
  it('initStorage завантажує favorites', async () => {
    storageSpy.get.and.returnValue(Promise.resolve([dummyUser]));
    const svc = new UserService(storageSpy);
    await svc['initStorage']();
    expect((svc as any).favoritesSubject.value.length).toBe(1);
  });
});