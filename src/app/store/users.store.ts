import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { exhaustMap, tap } from 'rxjs'
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
  loading: boolean
  users: User[]
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor(private readonly usersService: UsersService) {
    super({
      loading: false,
      users: [],
    })
  }

  readonly users$ = this.select(state => state.users)

  readonly loading$ = this.select(state => state.loading)

  readonly addUsers = this.updater((state, users: User[]) => ({
    ...state,
    users: [...state.users, ...users],
  }))

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }))

  readonly getUsers = () => {
    this.effect<void>(trigger$ =>
      trigger$
        .pipe(
          tap(() => {
            this.setLoading(true)
          }),
        )
        .pipe(
          exhaustMap(() =>
            this.usersService.fetchUsers().pipe(
              tapResponse({
                next: users => this.addUsers(users),
                error: (error: HttpErrorResponse) => console.error(error),
              }),
            ),
          ),
        )
        .pipe(
          tap(() => {
            this.setLoading(false)
          }),
        ),
    )()
  }
}
