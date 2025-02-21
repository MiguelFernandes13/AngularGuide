import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@exemple.com'){
    return of(null);
  }

  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark  ],
      asyncValidators: [emailIsUnique]
    }),
  });

  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedForm.email
      });
    }
    const subs = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
    })

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }

  getEmailIsInvalid(){
    return (this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid);
  }

  getPasswordIsInvalid(){
    return (this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid);
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}