import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { usersReducer } from 'store/users.reducer'
import { provideEffects } from '@ngrx/effects'
import * as usersEffects from 'store/users.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      users: usersReducer,
    }),
    provideEffects([usersEffects]),
  ],
}
