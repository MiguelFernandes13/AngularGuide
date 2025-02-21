import { Component, ElementRef, output, signal, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  enteredTitle = signal('');
  enteredText = signal('');
  //@ViewChild('form') form?: ElementRef<HTMLFormElement>;  
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{title: string; text: string}>();
  onSubmit() {
    console.log('Form submitted');
    this.add.emit({title: this.enteredTitle(), text: this.enteredText()});
    //this.form().nativeElement.reset();
    this.enteredTitle.set('');
    this.enteredText.set('');
  }
}
