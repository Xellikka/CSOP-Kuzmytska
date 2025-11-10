import { Component, Input } from '@angular/core';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'child-comp',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  standalone: false
})
export class ChildComponent {
  @Input() products: Product[] = [];

  get total(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}
