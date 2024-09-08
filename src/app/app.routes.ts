import { Routes } from '@angular/router'

import { LoginComponent } from 'login/login.component'
import { UsersComponent } from 'users/users.component'
import { isAuthorizedGuard } from 'is-authorized.guard'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [isAuthorizedGuard],
  },
  {
    path: 'users/:id',
    component: UsersComponent,
    canActivate: [isAuthorizedGuard],
  },
  { path: '**', component: UsersComponent },
]
