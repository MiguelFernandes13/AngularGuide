import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculateInvestmentService } from './calculate-investment.service';
import { Investments } from '../investments/investments.model';

@Component({
  selector: 'app-calculate-investment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculate-investment.component.html',
  styleUrl: './calculate-investment.component.css'
})
export class CalculateInvestmentComponent {
  calculate = output<Investments[]>();
  private calculateInvestmentService = inject(CalculateInvestmentService);

  innitialInvestment = signal(0);
  annualInvestment = signal(0);
  expectedReturn = signal(5);
  years = signal(10);

  calculateInvestment() {
    const result = this.calculateInvestmentService.calculateInvestmentResults(
      this.innitialInvestment(),
      this.annualInvestment(),
      this.expectedReturn(),
      this.years()
    );  
    console.log(result);
    this.calculate.emit(result);
  }
}
