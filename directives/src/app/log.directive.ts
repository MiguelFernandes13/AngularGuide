import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'log($event)'
  }
})
export class LogDirective {
  private elementRef = inject(ElementRef);

  constructor() { }

  log(event: MouseEvent) {
    console.log('Event target:', event.target);
  }

}
