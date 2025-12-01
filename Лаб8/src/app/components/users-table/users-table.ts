import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

/**  Command Pattern */
interface FavoriteCommand {
  execute(): void;
}

class AddFavoriteCommand implements FavoriteCommand {
  constructor(private userService: UserService, private user: User) {}
  execute() {
    this.userService.addFavorite(this.user);
  }
}

class RemoveFavoriteCommand implements FavoriteCommand {
  constructor(private userService: UserService, private userId: string) {}
  execute() {
    this.userService.removeFavorite(this.userId);
  }
}

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
  selectedUser: User | null = null;
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
    } catch {
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

  /**  Command Pattern для toggleFavorite */
  toggleFavorite(user: User) {
    let command: FavoriteCommand;
    if (this.userService.isFavorite(user.id)) {
      command = new RemoveFavoriteCommand(this.userService, user.id);
    } else {
      command = new AddFavoriteCommand(this.userService, user);
    }
    command.execute();
  }

  isFavorite(user: User) {
    return this.userService.isFavorite(user.id);
  }

  formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString();
  }
}
