import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.html',
  styleUrls: ['./users-table.scss'],
  standalone: false
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  loading = false;
  errorMsg = '';
  selectedUser: User | null = null; // для попапа
  showModal = false;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    this.errorMsg = '';
    try {
      this.users = await this.userService.fetchUsers(30);
    } catch (err) {
      this.errorMsg = 'Не вдалося завантажити дані. Перевірте зʼєднання.';
    } finally {
      this.loading = false;
    }
  }

  openDetails(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

async toggleFavorite(user: User) {
  if (this.userService.isFavorite(user.id)) {
    await this.userService.removeFavorite(user.id);
  } else {
    await this.userService.addFavorite(user);
  }
}

  isFavorite(user: User) {
    return this.userService.isFavorite(user.id);
  }

  formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString(); // локалізація браузера
  }
}
