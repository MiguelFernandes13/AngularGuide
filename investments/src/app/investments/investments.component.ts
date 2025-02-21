import { Component, input } from '@angular/core';
import { Investments } from './investments.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.css'
})
export class InvestmentsComponent {
  investments = input<Investments[]>();
}
