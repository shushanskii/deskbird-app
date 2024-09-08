import { Routes } from '@angular/router'
import { LoginComponent } from 'login/login.component'
import { UsersComponent } from 'users/users.component'
import { PageNotFoundComponent } from 'page-not-found/page-not-found.component'
import { isAuthorizedGuard } from 'is-authorized.guard'
import { isAdminGuard } from 'is-admin.guard'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [isAuthorizedGuard],
  },
  {
    path: 'users:id',
    component: UsersComponent,
    canActivate: [isAuthorizedGuard, isAdminGuard],
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]
