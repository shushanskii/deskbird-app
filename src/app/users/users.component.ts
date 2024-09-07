import { Component, inject, Input, OnInit } from '@angular/core'
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
import { MatDialog } from '@angular/material/dialog'
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component'
import { Router } from '@angular/router'
import { AsyncPipe } from '@angular/common'

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
    AsyncPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  isLoading = true

  readonly dialog = inject(MatDialog)

  users$: Observable<User[]> = of([])
  loading$: Observable<boolean> = of(false)

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'edit']

  constructor(
    private readonly usersStore: UsersStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersStore.users$
    this.loading$ = this.usersStore.loading$
    this.usersStore.getUsers()
  }

  onEditClick(id: string) {
    this.router.navigate(['/', 'users', id])
  }

  @Input()
  set id(id: string) {
    if (!id) {
      this.dialog.closeAll()
    } else {
      this.openDialog(id)
    }
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: { id },
    })

    dialogRef.afterClosed().subscribe(() => {
      console.info('The dialog was closed')
    })
  }
}
