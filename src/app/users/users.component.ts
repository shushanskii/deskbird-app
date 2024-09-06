import { Component, Input, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AsyncPipe, NgFor } from '@angular/common'
import { User, UsersStore } from 'store/users.store'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  // Store userId
  userId: string | undefined = undefined

  users$: Observable<User[]> = of([])

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email']

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
