import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() type: string
  @Input() imageSrc: string
  @Input() width: number
  @Input() height: number
  @Input() bgButton: string
  @Input() color: string
  @Output() onSelectFile = new EventEmitter()

  selectedFiles: FileList
  fileUploads: Observable<any>
  uploadedFile: String = "/assets/images/avatar.png"

  fileFctrl = new FormControl("", null)

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = null
    this.selectedFiles = event.target.files
    this.onSelectFile.emit(this.selectedFiles.item(0))
    this.fileFctrl.setValue(this.selectedFiles.item(0).name)
  }

  imagePreview() {
    this.dialog.open(ImagePreviewComponent, { width: '50%', data: this.imageSrc })
  }

}
