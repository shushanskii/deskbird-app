import { Component, inject, Input } from '@angular/core'
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
import { AsyncPipe, JsonPipe } from '@angular/common'
import { AuthService } from '../login/Auth.service'

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
    JsonPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersStore],
})
export class UsersComponent {
  readonly dialog = inject(MatDialog)
  readonly usersStore = inject(UsersStore)
  readonly authService = inject(AuthService)
  private router = inject(Router)

  users$: Observable<User[]> = of([])
  loading$: Observable<boolean> = of(false)
  currentUser: User | undefined = undefined
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'edit']

  constructor() {
    this.users$ = this.usersStore.users$
    this.loading$ = this.usersStore.loading$
    this.currentUser = this.authService.getCurrentUser()
    this.usersStore.getUsers()
  }

  onEditClick(id: string) {
    this.router.navigate(['/users', { id }])
  }

  @Input()
  set id(id: string) {
    if (!id) {
      this.dialog.closeAll()
    } else {
      this.users$.subscribe((users: User[]) => {
        const user = users.find(({ id: _id }) => id === _id)

        if (user) {
          this.openDialog(user)
        }
      })
    }
  }

  openDialog(user: User): void {
    this.dialog.open(UserEditDialogComponent, {
      data: { ...user },
    })
  }
}
