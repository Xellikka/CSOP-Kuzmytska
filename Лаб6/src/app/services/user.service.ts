import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://randomuser.me/api/';

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private favoritesSubject = new BehaviorSubject<User[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  private storageReady = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageReady = true;

    const favs = await this.storage.get('favorites');
    this.favoritesSubject.next(favs || []);
  }

  async fetchUsers(count = 20): Promise<User[]> {
    const res = await axios.get(this.apiUrl, {
      params: { results: count}
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
      gender: u.gender
    }));

    this.usersSubject.next(users);

    return users;
  }

  async addFavorite(user: User) {
    const current = this.favoritesSubject.value;

    if (!current.find(u => u.id === user.id)) {
      const next = [...current, user];
      this.favoritesSubject.next(next);

      if (this.storageReady) {
        await this.storage.set('favorites', next);
      }
    }
  }

  async removeFavorite(userId: string) {
    const next = this.favoritesSubject.value.filter(u => u.id !== userId);
    this.favoritesSubject.next(next);

    if (this.storageReady) {
      await this.storage.set('favorites', next);
    }
  }

  isFavorite(userId: string): boolean {
    return !!this.favoritesSubject.value.find(u => u.id === userId);
  }
}
