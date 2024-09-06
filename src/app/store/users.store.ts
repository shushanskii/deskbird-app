import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { exhaustMap } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { tapResponse } from '@ngrx/operators'
import { UsersService } from 'users/users.service'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
}

export interface UsersState {
  users: User[]
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor(private readonly usersService: UsersService) {
    super({
      users: [],
    })
  }

  readonly users$ = this.select(state => state.users)

  readonly addUsers = this.updater((state, users: User[]) => ({
    users: [...state.users, ...users],
  }))

  readonly getUsers = this.effect<void>(
    // The name of the source stream doesn't matter: `trigger$`, `source$` or `$` are good
    // names. We encourage to choose one of these and use them consistently in your codebase.
    trigger$ =>
      trigger$.pipe(
        exhaustMap(() =>
          this.usersService.fetchUsers().pipe(
            tapResponse({
              next: users => this.addUsers(users),
              error: (error: HttpErrorResponse) => console.error(error),
            }),
          ),
        ),
      ),
  )
}
