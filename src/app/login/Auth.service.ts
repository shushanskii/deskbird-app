import { Injectable } from '@angular/core'
import { User } from 'store/users.state'
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = []

  constructor() {
    const users = localStorage.getItem('users')
    if (users) {
      this.users = JSON.parse(users)
    }
  }

  getCurrentUser(): User {
    const user = Cookies.get('user')
    return JSON.parse(user!)
  }

  auth(_email: string, _password: string) {
    const user = this.users.find(
      ({ email, password }) => email === _email && password === _password,
    )

    if (user) {
      Cookies.set('user', JSON.stringify(user))
      return true
    }

    return false
  }

  isAuth() {
    const user = Cookies.get('user')
    if (user) {
      return !!JSON.parse(user)
    }
    return false
  }
}
