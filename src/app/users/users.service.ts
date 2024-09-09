import { Injectable } from '@angular/core'
import { delay, of } from 'rxjs'
import { User } from 'store/users.state'
import users from '../../assets/users.json'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  fetchUsers() {
    return of(users as User[]).pipe(delay(random(1000, 3000)))
  }
}
