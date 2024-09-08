import { CanActivateFn, Router } from '@angular/router'
import Cookies from 'js-cookie'
import { inject } from '@angular/core'

export const isAuthorizedGuard: CanActivateFn = () => {
  const isAuthorized = Cookies.get('authorized')

  if (!isAuthorized) {
    inject(Router).navigate(['login'])
    return false
  }

  return true
}
