/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, exhaustMap, catchError } from 'rxjs/operators'
import { UsersService } from 'users/users.service'
import { EMPTY, of } from 'rxjs'
import { addUsers, fetchUsers } from './users.actions'

export const loadUsers = createEffect(
  (actions$ = inject(Actions), userService = inject(UsersService)) =>
    actions$.pipe(
      ofType(fetchUsers),
      exhaustMap(() => {
        let cachedUsers = localStorage.getItem('users')
        if (cachedUsers) {
          cachedUsers = JSON.parse(cachedUsers)
          console.info('cache', cachedUsers)
          if (cachedUsers && cachedUsers?.length > 1) {
            console.info('from cache')
            return of().pipe(map(() => addUsers({ users: cachedUsers as any })))
          }
        }

        console.info('direct')
        return userService.fetchUsers().pipe(
          map(users => {
            const _users = localStorage.getItem('users')
            if (_users) {
              localStorage.setItem(
                'users',
                JSON.stringify([...JSON.parse(_users), ...users]),
              )
            }
            return addUsers({ users })
          }),
          catchError(() => EMPTY),
        )
      }),
    ),
  { functional: true },
)
