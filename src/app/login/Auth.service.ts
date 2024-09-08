import { Injectable } from '@angular/core'
import Cookies from 'js-cookie'
import { User } from 'store/users.store'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = []

  constructor() {
    const users = localStorage.getItem('users')
    if (users) {
      this.users = JSON.parse(users)
    }
  }

  auth(_email: string, _password: string) {
    const user = this.users.find(
      ({ email, password }) => email === _email && password === _password,
    )

    return !!user
  }

  isAuth() {
    return !!Cookies.get('authorized')
  }
}
