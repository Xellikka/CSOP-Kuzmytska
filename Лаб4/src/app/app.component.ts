import { Component } from '@angular/core';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  productName: string = '';
  productPrice: string = '';
  products: Product[] = [];

  addProduct() {
    const price = parseFloat(this.productPrice);
    if (!this.productName || isNaN(price) || price < 0) {
      alert('Введіть коректні дані!');
      return;
    }

    this.products.push({ name: this.productName, price });
    this.productName = '';
    this.productPrice = '';
  }

  validatePrice() {
    this.productPrice = this.productPrice.replace(/[^0-9.]/g, '');

    if ((this.productPrice.match(/\./g) || []).length > 1) {
      this.productPrice = this.productPrice.slice(0, -1);
    }
  }
}
