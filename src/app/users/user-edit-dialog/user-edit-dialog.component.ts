import { Component, inject } from '@angular/core'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog'
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { User, UsersStore } from 'store/users.store'
import { MatCheckbox } from '@angular/material/checkbox'

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
  providers: [UsersStore],
})
export class UserEditDialogComponent {
  readonly data = inject<User>(MAT_DIALOG_DATA)

  userEditForm = new FormGroup({
    firstName: new FormControl(this.data.firstName, [Validators.required]),
    lastName: new FormControl(this.data.lastName, [Validators.required]),
    email: new FormControl(this.data.email, [Validators.required]),
    isAdmin: new FormControl(this.data.isAdmin, [Validators.required]),
  })

  constructor(private router: Router) {}

  onNoClick(): void {
    this.router.navigate(['/', 'users'])
  }
}
