import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { UsersTableComponent } from './users-table';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let mockUserService: any;

  const dummyUsers: User[] = [
    { id: '1', name: {title:'Mr', first:'Тарас', last:'Шевченко'}, dob:{date:'2000-01-01', age:25},
      location:{city:'Київ', postcode:'01001'}, email:'a@example.com', gender:'male', picture:{thumbnail:'', medium:'', large:''} },
    { id: '2', name: {title:'Ms', first:'Леся', last:'Українка'}, dob:{date:'1995-05-05', age:30},
      location:{city:'Львів', postcode:'79000'}, email:'b@example.com', gender:'female', picture:{thumbnail:'', medium:'', large:''} }
  ];

beforeEach(waitForAsync(() => {
  mockUserService = jasmine.createSpyObj(['fetchUsers','isFavorite','addFavorite','removeFavorite']);
  mockUserService.fetchUsers.and.returnValue(Promise.resolve(dummyUsers));
  mockUserService.isFavorite.and.returnValue(false);
  mockUserService.favorites$ = of([]);

  TestBed.configureTestingModule({
    declarations: [UsersTableComponent],
    imports: [], 
    providers: [{ provide: UserService, useValue: mockUserService }],
    schemas: [NO_ERRORS_SCHEMA] 
  }).compileComponents();
}));


  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 9. компонент створено
  it('компонент створено', () => {
    expect(component).toBeTruthy();
  });

  // 10. викликається loadUsers
  it('завантажує користувачів', fakeAsync(async () => {
    await component.loadUsers();
    expect(component.users.length).toBe(2);
    expect(component.errorMsg).toBe('');
  }));

  // 11. показує помилку при fetchUsers
  it('встановлює errorMsg при помилці', fakeAsync(() => {
    mockUserService.fetchUsers.and.returnValue(Promise.reject('error'));
    component.loadUsers();
    tick();
    expect(component.errorMsg).toContain('Не вдалося завантажити');
    expect(component.loading).toBeFalse();
  }));

  // 12. відкриває модальне вікно
  it('відкриває деталі користувача', () => {
    component.openDetails(dummyUsers[0]);
    expect(component.showModal).toBeTrue();
    expect(component.selectedUser).toEqual(dummyUsers[0]);
  });

  // 13. закриває модальне вікно
  it('закриває модальне вікно', () => {
    component.openDetails(dummyUsers[0]);
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.selectedUser).toBeNull();
  });

  // 14. toggleFavorite додає користувача
  it('додає до вибраного', fakeAsync(async () => {
    mockUserService.isFavorite.and.returnValue(false);
    await component.toggleFavorite(dummyUsers[0]);
    expect(mockUserService.addFavorite).toHaveBeenCalledWith(dummyUsers[0]);
  }));

  // 15. toggleFavorite видаляє користувача
  it('видаляє з вибраного', fakeAsync(async () => {
    mockUserService.isFavorite.and.returnValue(true);
    await component.toggleFavorite(dummyUsers[0]);
    expect(mockUserService.removeFavorite).toHaveBeenCalledWith(dummyUsers[0].id);
  }));

  // 16. formatDate повертає локальну дату
  it('форматує дату', () => {
    const result = component.formatDate('2000-01-01T00:00:00Z');
    expect(result).toBe(new Date('2000-01-01T00:00:00Z').toLocaleDateString());
  });

  // 17. isFavorite викликає сервіс
  it('перевіряє вибраного користувача', () => {
    component.isFavorite(dummyUsers[0]);
    expect(mockUserService.isFavorite).toHaveBeenCalledWith(dummyUsers[0].id);
  });

  // 18. loading true під час fetch
  it('loading встановлюється під час завантаження', fakeAsync(async () => {
    const promise = component.loadUsers();
    expect(component.loading).toBeTrue();
    await promise;
  }));
});