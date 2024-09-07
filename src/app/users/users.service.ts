import { Injectable } from '@angular/core'
import users from '../../assets/users.json'
import { delay, of } from 'rxjs'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  fetchUsers() {
    return of(users).pipe(delay(random(1000, 3000)))
  }
}
