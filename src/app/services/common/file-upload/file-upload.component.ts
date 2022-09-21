import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  successNotification() {
    const successMessage: string = 'Dosya başarıyla yüklenmiştir.';
    if (this.options.isAdmingPage) {
      this.alertifyService.message(successMessage, {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
    } else {
      this.customToastrService.message(successMessage, 'Başarılı', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    }
  }

  errorNotifcation() {
    const errorMessage: string = 'Bir hata oluştu.';
    if (this.options.isAdmingPage) {
      this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
    } else {
      this.customToastrService.message(errorMessage, 'Başarılı', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              this.successNotification();
            },
            (errorResponse: HttpErrorResponse) => {
              this.errorNotifcation();
            }
          );
      },
    });
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explaination?: string;
  accept?: string;
  isAdmingPage: boolean = false;
}
