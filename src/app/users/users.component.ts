import { Component, Input, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
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
import { MatIcon } from '@angular/material/icon'
import { MatMiniFabButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatCard, MatCardContent } from '@angular/material/card'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
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
    MatIcon,
    MatMiniFabButton,
    MatProgressSpinner,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  isLoading = true

  userId: string | undefined = undefined

  users$: Observable<User[]> = of([])

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'edit']

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
