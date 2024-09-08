import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'

const admin = {
  id: '0',
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@email.com',
  password: '$admin1',
  isAdmin: false,
}
localStorage.setItem('users', JSON.stringify([admin]))

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err))
