import { State as UserState } from './users.state'

export const selectUsers = (state: { users: UserState }) => state.users.list

export const selectLoading = (state: { users: UserState }) =>
  state.users.loading
