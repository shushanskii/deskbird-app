import { createReducer, on } from '@ngrx/store'

import { State } from './users.state'
import { addUsers, fetchUsers, updateUsers } from './users.actions'

export const initialState: State = {
  loading: false,
  list: [],
}

export const usersReducer = createReducer(
  initialState,
  on(addUsers, (state, { users }) => ({
    ...state,
    list: users,
    loading: false,
  })),
  on(fetchUsers, state => ({ ...state, loading: true })),
  on(updateUsers, (state, { user }) => ({
    ...state,
    list: state.list.map(_user => {
      if (_user.id === user.id) {
        return user
      }

      return _user
    }),
  })),
)
