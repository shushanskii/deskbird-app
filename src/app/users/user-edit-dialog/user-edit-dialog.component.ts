import { Component, inject } from '@angular/core'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router'

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
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
})
export class UserEditDialogComponent {
  readonly data = inject<{ id: string }>(MAT_DIALOG_DATA)

  constructor(private router: Router) {}

  onNoClick(): void {
    this.router.navigate(['/', 'users'])
  }
}
