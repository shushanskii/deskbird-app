import { createAction, props } from '@ngrx/store'
import { User } from './users.state'

export const fetchUsers = createAction('[Users] Fetch')

export const addUsers = createAction(
  '[Users] Add Users',
  props<{ users: User[] }>(),
)

export const updateUsers = createAction(
  '[Users] Update Users',
  props<{ user: User }>(),
)
