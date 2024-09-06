import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  // Store user id
  userId: string | undefined = undefined

  @Input()
  set id(id: string) {
    this.userId = id
  }
}
