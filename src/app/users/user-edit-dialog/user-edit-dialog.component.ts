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
import { MatCheckbox } from '@angular/material/checkbox'
import { Router } from '@angular/router'
import { User } from 'store/users.state'
import { Store } from '@ngrx/store'
import { updateUsers } from 'store/users.actions'

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
  providers: [],
})
export class UserEditDialogComponent {
  readonly store = inject(Store)
  readonly router = inject(Router)
  readonly data = inject<User>(MAT_DIALOG_DATA)

  userEditForm = new FormGroup({
    firstName: new FormControl(this.data.firstName, [Validators.required]),
    lastName: new FormControl(this.data.lastName, [Validators.required]),
    email: new FormControl(this.data.email, [Validators.required]),
    isAdmin: new FormControl(this.data.isAdmin, [Validators.required]),
  })

  onOkClick(): void {
    if (this.userEditForm.valid) {
      this.router.navigate(['/users'])
      this.store.dispatch(
        updateUsers({
          user: {
            id: this.data.id,
            password: this.data.password,
            firstName: this.userEditForm.controls['firstName'].value!,
            lastName: this.userEditForm.controls['lastName'].value!,
            email: this.userEditForm.controls['email'].value!,
            isAdmin: !!this.userEditForm.controls['isAdmin'].value,
          },
        }),
      )
    }
  }
}
