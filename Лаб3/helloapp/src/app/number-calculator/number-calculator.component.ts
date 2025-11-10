import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Калькулятор суми, добутку, різниці</h2>
    <div class="calculator">
      <input
        type="text"
        [(ngModel)]="num1Input"
        (input)="validateInput('num1')"
        placeholder="Введіть перше число">
      <div *ngIf="warning1" class="warning">{{ warning1 }}</div>

      <input
        type="text"
        [(ngModel)]="num2Input"
        (input)="validateInput('num2')"
        placeholder="Введіть друге число">
      <div *ngIf="warning2" class="warning">{{ warning2 }}</div>

      <div class="results">
        <p>Сума: {{ sum() }}</p>
        <p>Добуток: {{ product() }}</p>
        <p>Різниця: {{ difference() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .calculator {
      display: flex;
      flex-direction: column;
      align-items: center;       
      justify-content: center;   
      max-width: 300px;
      gap: 10px;
      margin: 0 auto 20px auto; 
      padding: 10px;
      border: 1px solid black;  
      border-radius: 5px;
    }

    input {
      padding: 5px;
      font-size: 16px;
      width: 100%;               
      max-width: 200px;         
      text-align: center;        
    }

    .results {
      margin-top: 10px;
      text-align: center;        
    }

    .results p {
      margin: 5px 0;
      font-weight: bold;
    }

    .warning {
      color: red;
      font-size: 14px;
    }
  `]
})
export class NumberCalculatorComponent {
  num1Input = '';
  num2Input = '';
  num1 = 0;
  num2 = 0;
  warning1 = '';
  warning2 = '';

  validateInput(field: 'num1' | 'num2') {
    let value = field === 'num1' ? this.num1Input : this.num2Input;

    if (/^-?\d*[.,]?\d*$/.test(value)) {
      const normalized = value.replace(',', '.'); // замінюємо кому на крапку
      this[field] = Number(normalized);
      this[`warning${field === 'num1' ? 1 : 2}`] = '';
    } else {
      value = value.replace(/[^0-9,.\-]/g, '');
      if (value.indexOf('-') > 0) value = value.replace('-', ''); // мінус лише на початку
      if ((value.match(/-/g) || []).length > 1) value = value.replace(/-+/g, '-');
      if ((value.match(/[.,]/g) || []).length > 1) value = value.replace(/[.,]+$/, ''); // лише одна крапка/кома

      if (field === 'num1') {
        this.num1Input = value;
        this.warning1 = 'Дозволено лише цифри, один "-" на початку і одну крапку або кому!';
      } else {
        this.num2Input = value;
        this.warning2 = 'Дозволено лише цифри, один "-" на початку і одну крапку або кому!';
      }
    }
  }

  sum() {
    return this.num1 + this.num2;
  }

  product() {
    return this.num1 * this.num2;
  }

  difference() {
    return this.num1 - this.num2;
  }
}

