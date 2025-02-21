import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CalculateInvestmentComponent } from "./calculate-investment/calculate-investment.component";
import { Investments } from './investments/investments.model';
import { InvestmentsComponent } from "./investments/investments.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, CalculateInvestmentComponent, InvestmentsComponent],
})
export class AppComponent {
  investmentsData = signal<Investments[] | undefined>(undefined);

  showCalculateResults(investmentsData : Investments[]) {
    this.investmentsData.set(investmentsData);
  }
}
