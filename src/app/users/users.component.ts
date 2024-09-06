import { Component, Input, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AsyncPipe, NgFor } from '@angular/common'
import { User, UsersStore } from 'store/users.store'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  // Store userId
  userId: string | undefined = undefined

  users$: Observable<User[]> = of([])

  constructor(private readonly usersStore: UsersStore) {}

  ngOnInit(): void {
    this.users$ = this.usersStore.users$
    this.usersStore.getUsers()
  }

  @Input()
  set id(id: string) {
    this.userId = id
  }
}
