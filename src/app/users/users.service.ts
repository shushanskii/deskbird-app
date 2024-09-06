import { Injectable } from '@angular/core'
import users from '../../assets/users.json'
import { delay, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  fetchUsers() {
    return of(users).pipe(delay(this.random(1000, 3000)))
  }
}
