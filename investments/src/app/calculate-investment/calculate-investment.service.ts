import { Injectable } from "@angular/core";
import { Investments } from "../investments/investments.model";


@Injectable({providedIn: 'root'})
export class CalculateInvestmentService {
  calculateInvestmentResults(initialInvestment : number, annualInvestment : number, expectedReturn : number, duration : number) : Investments[] {
    const annualData : Investments[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    return annualData;
  }
}
