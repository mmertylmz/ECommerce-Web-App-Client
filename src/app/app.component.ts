import { Component } from '@angular/core';
import { MessageType } from './services/admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(private toastr: CustomToastrService) {
    toastr.message('Mert', 'Can', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopCenter,
    });
  }
}
