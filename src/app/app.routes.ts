import { Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: '**', component: PageNotFoundComponent },
]
