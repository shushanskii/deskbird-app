import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from 'login/Auth.service'

export const isAuthorizedGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  const isAuth = authService.isAuth()
  if (!isAuth) {
    router.navigate(['login'])
    return false
  }
  return true
}
