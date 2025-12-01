import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://randomuser.me/api/';

  private favoritesSubject = new BehaviorSubject<User[]>(this.loadFavorites());
  favorites$ = this.favoritesSubject.asObservable();

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {}

  /** PATTERN: Repository (Data mapping + state control)*/

  async fetchUsers(count = 20): Promise<User[]> {
    try {
      const res = await axios.get(this.apiUrl, { params: { results: count } });
      const users = this.mapApiUsers(res.data.results);
      this.usersSubject.next(users);
      return users;
    } catch (err) {
      console.error('fetchUsers error', err);
      throw err;
    }
  }

  /**  Mapper (репозиторій приводить API в модель) */
  private mapApiUsers(apiUsers: any[]): User[] {
    return apiUsers.map((u: any) => ({
      id: u.login.uuid,
      name: u.name,
      dob: u.dob,
      location: u.location,
      email: u.email,
      phone: u.phone,
      cell: u.cell,
      picture: u.picture,
      gender: u.gender,
      ...u
    }));
  }

  /** Favorites (частина Repository – локальне сховище) */
  getFavorites(): User[] {
    return this.favoritesSubject.value;
  }

  addFavorite(user: User) {
    const current = this.favoritesSubject.value;
    if (!current.find(u => u.id === user.id)) {
      const updated = [...current, user];
      this.favoritesSubject.next(updated);
      this.saveFavorites(updated);
    }
  }

  removeFavorite(userId: string) {
    const updated = this.favoritesSubject.value.filter(u => u.id !== userId);
    this.favoritesSubject.next(updated);
    this.saveFavorites(updated);
  }

  isFavorite(userId: string): boolean {
    return this.favoritesSubject.value.some(u => u.id === userId);
  }

  private saveFavorites(list: User[]) {
    localStorage.setItem('favorites', JSON.stringify(list));
  }

  private loadFavorites(): User[] {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  }
}
