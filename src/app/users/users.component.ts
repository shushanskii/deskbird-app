import { Component, Input } from '@angular/core'
import { User, UsersStore } from '../store/users.store'
import { Observable, of } from 'rxjs'
import { AsyncPipe, NgFor } from '@angular/common'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent {
  // Store userId
  userId: string | undefined = undefined

  users$: Observable<User[]> = of([])

  constructor(private readonly usersStore: UsersStore) {}

  ngOnInit(): void {
    this.users$ = this.usersStore.users$
  }

  @Input()
  set id(id: string) {
    this.userId = id
  }
}
