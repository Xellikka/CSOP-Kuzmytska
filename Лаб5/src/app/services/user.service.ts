import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://randomuser.me/api/';
  private favoritesSubject = new BehaviorSubject<User[]>(this.loadFavorites());
  favorites$ = this.favoritesSubject.asObservable();

private usersSubject = new BehaviorSubject<User[]>([]);
public users$ = this.usersSubject.asObservable(); 

async fetchUsers(count = 20): Promise<User[]> {
  try {
    const res = await axios.get(this.apiUrl, {
      params: { results: count, nat: 'us,gb,ca,au,ua' }
    });
    const users: User[] = res.data.results.map((u: any) => ({
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
    
    this.usersSubject.next(users); 
    return users;
  } catch (err) {
    console.error('fetchUsers error', err);
    throw err;
  }
}
  getFavorites(): User[] {
    return this.favoritesSubject.value;
  }

  addFavorite(user: User) {
    const current = this.favoritesSubject.value;
    if (!current.find(u => u.id === user.id)) {
      const next = [...current, user];
      this.favoritesSubject.next(next);
      this.saveFavorites(next);
    }
  }

  removeFavorite(userId: string) {
    const next = this.favoritesSubject.value.filter(u => u.id !== userId);
    this.favoritesSubject.next(next);
    this.saveFavorites(next);
  }

  isFavorite(userId: string): boolean {
    return !!this.favoritesSubject.value.find(u => u.id === userId);
  }

  // Local storage
  private saveFavorites(list: User[]) {
    localStorage.setItem('favorites', JSON.stringify(list));
  }

  private loadFavorites(): User[] {
    const raw = localStorage.getItem('favorites');
    try {
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }
}
