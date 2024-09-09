export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
}

export interface State {
  loading: boolean
  list: User[]
}
