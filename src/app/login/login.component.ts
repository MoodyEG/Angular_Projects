import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  done: boolean = false;
  login(loginForm: any) {
    loginForm.controls.email.touched = true;
    loginForm.controls.password.touched = true;

    this.done = loginForm.valid ? true : false;
  }
}
