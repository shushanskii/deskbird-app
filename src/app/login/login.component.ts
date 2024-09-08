import { Component, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from './Auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)
  hide = signal(true)

  passwordErrorMessage = signal('')
  loginErrorMessage = signal('')
  hasError = signal(false)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  onEyeClick(event: MouseEvent) {
    this.hide.set(!this.hide())
    event.stopPropagation()
  }

  onPasswordBlur() {
    const passwordControl = this.loginForm.get('password')
    if (passwordControl?.hasError('required')) {
      this.passwordErrorMessage.set('Password is required')
    } else {
      this.passwordErrorMessage.set('')
    }
  }

  onEmailBlur() {
    const loginControl = this.loginForm.get('email')
    if (loginControl?.hasError('required')) {
      this.loginErrorMessage.set('Email is required')
    } else {
      this.loginErrorMessage.set('')
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }

    const authorized = this.authService.auth(
      this.loginForm.value.email!,
      this.loginForm.value.password!,
    )

    if (authorized) {
      this.router.navigate(['/users'])
      return
    }

    this.loginForm.controls.email.setValue('')
    this.loginForm.controls.email.setErrors({ required: true })
    this.loginForm.controls.password.setValue('')
    this.loginForm.controls.password.setErrors({ required: true })
    this.hasError.set(true)
  }
}
