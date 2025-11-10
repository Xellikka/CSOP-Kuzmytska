import { Component } from '@angular/core';
import { NumberCalculatorComponent } from './number-calculator/number-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NumberCalculatorComponent],
  template: `
    <div class="app-container">
      <h1>Простий калькулятор</h1>
      <app-number-calculator></app-number-calculator>
    </div>
  `,
 styles: [`
  .app-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
  }

  h1 {
    color: #000000ff;
    margin-bottom: 20px;
  }
`]
})
export class AppComponent {}
