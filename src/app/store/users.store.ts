import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

export interface User {
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
  constructor() {
    super({
      users: [
        {
          firstName: 'User',
          lastName: 'Admin',
          email: 'admin@example.com',
          isAdmin: true,
        },
        {
          firstName: 'User',
          lastName: 'regular',
          email: 'user@example.com',
          isAdmin: false,
        },
      ],
    })
  }

  readonly users$ = this.select(state => state.users)
}
