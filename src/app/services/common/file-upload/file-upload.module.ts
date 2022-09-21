//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';

//Components
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, NgxFileDropModule, DialogsModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
