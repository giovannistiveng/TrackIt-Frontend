import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { correo } = this.loginForm.value;
      
      // Simulación temporal: te redirige según la palabra en el correo
      if (correo.includes('admin')) {
        this.router.navigate(['/admin']);
      } else if (correo.includes('conductor')) {
        this.router.navigate(['/conductor']);
      } else {
        this.router.navigate(['/cliente']);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}