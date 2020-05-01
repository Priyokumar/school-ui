import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from './components/snackbar-info/snackbar-info.component';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  declarations: [
    FileUploadComponent,
    ImagePreviewComponent,
    ConfirmationDialogComponent,
    SnackbarInfoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    FileUploadComponent,
    ImagePreviewComponent,
    ConfirmationDialogComponent,
    SnackbarInfoComponent
  ],
  entryComponents: [
    ImagePreviewComponent,
    ConfirmationDialogComponent,
    SnackbarInfoComponent
  ],
  providers: [AuthService]
})
export class SharedModule { }
