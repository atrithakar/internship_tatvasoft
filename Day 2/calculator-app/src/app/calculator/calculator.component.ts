import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  calcForm: FormGroup;
  history: string[] = [];

  constructor(private fb: FormBuilder) {
    this.calcForm = this.fb.group({
      num1: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      operator: ['', [Validators.required, Validators.pattern(/^[+\-*/]$/)]],
      num2: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]]
    });
  }

  calculate() {
    if (this.calcForm.invalid) return;

    const { num1, operator, num2 } = this.calcForm.value;
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let result: number | string;

    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b !== 0 ? a / b : 'Division by zero'; break;
      default: result = 'Syntax Error';
    }

    const entry = `${a} ${operator} ${b} = ${result}`;
    this.history.unshift(entry);
    this.calcForm.reset();
  }
}
