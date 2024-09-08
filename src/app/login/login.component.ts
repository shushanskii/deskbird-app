import { Component, signal } from '@angular/core'
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
import Cookies from 'js-cookie'

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
  hide = signal(true)

  passwordErrorMessage = signal('')
  loginErrorMessage = signal('')

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
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

  onLoginBlur() {
    const loginControl = this.loginForm.get('login')
    if (loginControl?.hasError('required')) {
      this.loginErrorMessage.set('Login is required')
    } else {
      this.loginErrorMessage.set('')
    }
  }

  onSubmit() {
    Cookies.set('authorized', `${Date.now()}`)
    console.info(this.loginForm.value)
  }
}
