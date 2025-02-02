import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: any;
  done: boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      userName: ['', [Validators.required, Validators.pattern('^\\S*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          (input: any) => {
            return input.value === this.registerForm?.controls['password'].value
              ? null
              : { mismatch: true };
          },
        ],
      ],
    });
  }

  register(registerForm: any) {
    registerForm.controls.name.touched = true;
    registerForm.controls.userName.touched = true;
    registerForm.controls.email.touched = true;
    registerForm.controls.password.touched = true;
    registerForm.controls.confirmPassword.touched = true;

    this.done = registerForm.valid ? true : false;
  }
}
