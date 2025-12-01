import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss'],
  standalone: false,

})
export class FavoritesComponent implements OnInit {
formatDate(iso: string) {
  return new Date(iso).toLocaleDateString();
}
  favorites: User[] = [];
  sub?: Subscription;

  constructor(private userService: UserService) {}

 /** PATTERN: Observer (чисте підписування/відписування)*/
  ngOnInit() {
    this.sub = this.userService.favorites$.subscribe(list => {
      this.favorites = list;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  /**END Observer */

  remove(userId: string) {
    this.userService.removeFavorite(userId);
  }
}
