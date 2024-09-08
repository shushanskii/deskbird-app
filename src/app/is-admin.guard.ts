import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from 'login/Auth.service'

export const isAdminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  const user = authService.getCurrentUser()

  if (!user) {
    router.navigate(['login'])
  }

  if (user && !user.isAdmin) {
    router.navigate(['login'])
  }

  return user.isAdmin
}
